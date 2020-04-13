---
title: "Asynchronicity in C#: Error Handlers and Completion Calls"
date: 2009-10-29 13:27:42 -0400
redirect_from:
  - /archives/2009/10/asynchronicity_in_c_error_hand.shtml
legacy_url: http://seankerwin.org/archives/2009/10/asynchronicity_in_c_error_hand.shtml
---
<p>Normal function calls are easy to write; you call <code>DoSomething( )</code>, it executes and returns, and you continue on your merry way.</p>

<p>Asynchronous function calls seem, at first blush, only a little more difficult &mdash; instead of calling <code>DoSomething()</code> and executing your follow-up code after it returns, you pass in a callback: <code>BeginDoSomething( Action callback )</code>.</p>

<p>So, problem solved, let's go home.  Unless you need a return value, that is.  But even then it seems simple; to turn a synchronous method like <code>int CalculateSomething( )</code> into an asynchronous method, you just pass it a delegate that takes a parameter: <code>void BeginCalculateSomething( Action&lt;int&gt; callback )</code>.</p>

<p>So is that it?  Nope.  Because all of that is wrong.</p>

<p>Even though the original <code>DoSomething( )</code> method had no return type, it still had a return <i>path</i> &mdash; it could throw an exception.  Let's imagine that <code>BeginDoSomething</code> looks something like this:</p>

<pre><code>
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
</code></pre>

<p>A handy way to think about this sort of thing is to figure out where a thrown exception would emerge.</p>

<p>If something goes wrong within the call to <code>PrepareForLongRunningOperation</code>, that happens in the same context as the calling code &mdash; any exceptions will throw up to the calling code and come out of its call to <code>BeginDoSomething</code>.  The same applies to the call to <code>ThreadPool.QueueUserWorkItem</code> &mdash; no problem there.</p>

<p>But what if <code>LongRunningOperation</code> throws?</p>

<p><code>LongRunningOperation</code> would throw up into whatever internal part of the ThreadPool implementation actually launched it.  That exception can't come out of <code>ThreadPool.QueueUserWorkItem</code>, because by the time the asynchronous anonymous delegate is running <code>ThreadPool.QueueUserWorkItem</code> has already returned.  And since the exception can't come out of <code>ThreadPool.QueueUserWorkItem</code>, it also can't come out of <code>BeginDoSomething</code> &mdash; which means there's no way for the calling code to get the exception.</p>

<p>There are two main approaches to this problem &mdash; error handlers and completion calls.</p>

<b>Error Handlers</b><br />

<p>Instead of passing your begin method one callback, pass two: a callback to be invoked if everything goes to plan, and an exception-accepting callback to which errors will be passed.</p>

<pre><code>
public void BeginDoSomething(Action callback, Action&lt;Exception&gt; errorHandler)
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
</code></pre>

<p>There are strengths and weaknesses to this approach.  The biggest strength of this model is that it <i>forces</i> the calling code to think about error handling &mdash; the prompt for it is right there in the method signature.  Error handling tends to fall through the cracks in any sort of code, but it's especially easy to overlook in an asynchronous context (It's also a lot more dangerous in an asynchronous context, because often dropping a callback invocation will cause a process to spin forever, sucking down resources and accomplishing nothing).</p>

<p>Separating the success case from the failure case may be either a strength or a weakness, depending on the particular task.  Sometimes it makes your code much cleaner, but it often happens that your success and error handler need to share context and implementation, which can make for some very ugly code.</p>

<b>Completion Calls</b><br />

<p>Instead of just invoking a parameter-less <code>Action</code> callback or a single-parameter <code>Action&lt;TReturn&gt;</code> callback, your code calls a single-parameter callback and passes it an <code>Action</code> or <code>Func&lt;TReturn&gt;</code> that the callback in turn invokes.</p>

<pre><code>
public void BeginDoSomething(Action&lt;Action&gt; callback)
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
</code></pre>

<p>At first blush, this seems like a much clumsier solution; you're essentially trusting the calling code to call your completion method.  That's true, at least in this case.</p>

<p>Where completion calls really shine are for asynchronous calls returning values; instead of calling their callback and handing in an <code>Action</code>, you call their callback and give it a <code>Func&lt;TReturn&gt;</code>, which they then <i>must</i> invoke to get their result.  That gives you an opportunity to throw exceptions that they <i>can't</i> cleverly bypass:</p>

<pre><code>
public void BeginCalculateSomething(Action&lt;Func&lt;int&gt;&gt; callback)
{
    PrepareForLongRunningCalculation();

    ThreadPool.QueueUserWorkItem(
        delegate
        {
            try
            {
                int result = LongRunningCalculation();
                callback(() =&gt; result);
            }
            catch (Exception ex)
            {
                callback(delegate { throw ex; });
            }
        });
}

// Sample Usage:

BeginCalculateSomething(
    delegate(Func&lt;int&gt; complete)
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
</code></pre>

<p>Personally I prefer completion calls, mainly because the the pattern works so well for return values.  In practice, any time you need this sort of a pattern it's because you care about return values; if you need to ensure that X happens after Y, it's generally because X depends on the result of Y.  If X <i>doesn't</i> depend on Y, that's often a sign that you're being too linear in your analysis and that the tasks should be happening in parallel.</p>

<p>Microsoft seems to have collectively reached the same conclusion; <code>IHttpAsyncHandler</code>, the asynchronous methods off of <code>SqlCommand</code>, and the asynchronous forms of <code>WebRequest</code> all use the completion call approach.</p>
