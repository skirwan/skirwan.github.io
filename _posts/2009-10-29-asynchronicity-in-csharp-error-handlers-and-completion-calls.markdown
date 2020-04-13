---
title: "Asynchronicity in C#: Error Handlers and Completion Calls"
date: 2009-10-29 13:27:42 -0400
redirect_from:
  - /archives/2009/10/asynchronicity_in_c_error_hand.shtml
legacy_url: http://seankerwin.org/archives/2009/10/asynchronicity_in_c_error_hand.shtml
---
Normal function calls are easy to write; you call `DoSomething( )`, it executes and returns, and you continue on your merry way.

Asynchronous function calls seem, at first blush, only a little more difficult — instead of calling `DoSomething()` and executing your follow-up code after it returns, you pass in a callback: `BeginDoSomething( Action callback )`.

So, problem solved, let's go home. Unless you need a return value, that is. But even then it seems simple; to turn a synchronous method like `int CalculateSomething( )` into an asynchronous method, you just pass it a delegate that takes a parameter: `void BeginCalculateSomething( Action<int> callback )`.

So is that it? Nope. Because all of that is wrong.

Even though the original `DoSomething( )` method had no return type, it still had a return _path_ — it could throw an exception. Let's imagine that `BeginDoSomething` looks something like this:

```
public void BeginDoSomething(Action callback)
{
    PrepareForLongRunningOperation( );

    ThreadPool.QueueUserWorkItem(
        delegate
            {
                LongRunningOperation();

                callback();
            });
}
```

A handy way to think about this sort of thing is to figure out where a thrown exception would emerge.

If something goes wrong within the call to `PrepareForLongRunningOperation`, that happens in the same context as the calling code — any exceptions will throw up to the calling code and come out of its call to `BeginDoSomething`. The same applies to the call to `ThreadPool.QueueUserWorkItem` — no problem there.

But what if `LongRunningOperation` throws?

`LongRunningOperation` would throw up into whatever internal part of the ThreadPool implementation actually launched it. That exception can't come out of `ThreadPool.QueueUserWorkItem`, because by the time the asynchronous anonymous delegate is running `ThreadPool.QueueUserWorkItem` has already returned. And since the exception can't come out of `ThreadPool.QueueUserWorkItem`, it also can't come out of `BeginDoSomething` — which means there's no way for the calling code to get the exception.

There are two main approaches to this problem — error handlers and completion calls.

**Error Handlers**  

Instead of passing your begin method one callback, pass two: a callback to be invoked if everything goes to plan, and an exception-accepting callback to which errors will be passed.

```
public void BeginDoSomething(Action callback, Action<Exception> errorHandler)
{
    PrepareForLongRunningOperation( );

    ThreadPool.QueueUserWorkItem(
        delegate
            {
                try
                {
                    LongRunningOperation();
                    callback();
                }
                catch(Exception ex)
                {
                    errorHandler(ex);
                }
            });
}

// Sample usage:

BeginDoSomething(
    delegate
    {
		// Do something now that we're done
    },
    delegate(Exception ex)
    {
		// Do something with the error
    });
```

There are strengths and weaknesses to this approach. The biggest strength of this model is that it _forces_ the calling code to think about error handling — the prompt for it is right there in the method signature. Error handling tends to fall through the cracks in any sort of code, but it's especially easy to overlook in an asynchronous context (It's also a lot more dangerous in an asynchronous context, because often dropping a callback invocation will cause a process to spin forever, sucking down resources and accomplishing nothing).

Separating the success case from the failure case may be either a strength or a weakness, depending on the particular task. Sometimes it makes your code much cleaner, but it often happens that your success and error handler need to share context and implementation, which can make for some very ugly code.

**Completion Calls**  

Instead of just invoking a parameter-less `Action` callback or a single-parameter `Action<TReturn>` callback, your code calls a single-parameter callback and passes it an `Action` or `Func<TReturn>` that the callback in turn invokes.

```
public void BeginDoSomething(Action<Action> callback)
{
    PrepareForLongRunningOperation( );

    ThreadPool.QueueUserWorkItem(
        delegate
            {
                try
                {
                    LongRunningOperation();
                    callback(delegate { });
                }
                catch(Exception ex)
                {
                    callback(delegate { throw ex; });
                }
            });
}

// Sample Usage:

BeginDoSomething(
    delegate(Action complete)
    {
        try
        {
            complete();
        }
        catch (Exception ex)
        {
            // Do something with the error
            return;
        }
        // Do something now that we're done
	})
```

At first blush, this seems like a much clumsier solution; you're essentially trusting the calling code to call your completion method. That's true, at least in this case.

Where completion calls really shine are for asynchronous calls returning values; instead of calling their callback and handing in an `Action`, you call their callback and give it a `Func<TReturn>`, which they then _must_ invoke to get their result. That gives you an opportunity to throw exceptions that they _can't_ cleverly bypass:

```
public void BeginCalculateSomething(Action<Func<int>> callback)
{
    PrepareForLongRunningCalculation();

    ThreadPool.QueueUserWorkItem(
        delegate
        {
            try
            {
                int result = LongRunningCalculation();
                callback(() => result);
            }
            catch (Exception ex)
            {
                callback(delegate { throw ex; });
            }
        });
}

// Sample Usage:

BeginCalculateSomething(
    delegate(Func<int> complete)
    {
        int result;
        try
        {
            result = complete();
        }
        catch (Exception ex)
        {
            // Do something with the error
            return;
        }
        // Do something with the content of result;
	})
```

Personally I prefer completion calls, mainly because the the pattern works so well for return values. In practice, any time you need this sort of a pattern it's because you care about return values; if you need to ensure that X happens after Y, it's generally because X depends on the result of Y. If X _doesn't_ depend on Y, that's often a sign that you're being too linear in your analysis and that the tasks should be happening in parallel.

Microsoft seems to have collectively reached the same conclusion; `IHttpAsyncHandler`, the asynchronous methods off of `SqlCommand`, and the asynchronous forms of `WebRequest` all use the completion call approach.
