---
title: "Constant Documentation"
date: 2009-05-07 16:54:01 -0400
redirect_from:
  - /archives/2009/05/constant_documentation.shtml
legacy_url: http://seankerwin.org/archives/2009/05/constant_documentation.shtml
---
The only C++ feature I seriously miss in other languages is `const`. Not in the simple 'this variable is a constant' usage, where it's nothing but a type-checked #define — no, I miss the `const` keyword in the interaction of `const` methods and `const` objects.

• • •

First some background — I don't expect folks who haven't spent time with C++ to know much about this, and a surprising number of veteran C++ coders seem to be unaware of it as well. In C++, `const` can be many things. One role is as a type modifier that means "I'm not going to change this". A common usage is to accept a `const` references:

```
int calculateAverage( const std::vector<int> & values );
```

That `const` means "I'm just going to look at it, I'm not going to mutate it" (or, if you like thinking functionally, "I'm a real function, hand me my immutable input" — more on that angle later). What does that mean, in terms of actual code? It means the body of that function can't call (for instance) `values.push_back( 12 )` and mutate the data it was handed. And when I say "can't" I don't mean "shouldn't", I mean the compiler will actually flag that as an error and stop you. If you keep trying it'll even call you names.

Now obviously the body of the function still needs a way to call methods on that vector — it'll need some to get at the contents, whether it's running a for loop from zero to `values.size( )` and calling `operator[]` in between, or looping from `begin()` to `end()`, or whatever. So what makes those methods okay, and `push_back`, `pop_back`, `insert`, `swap` and various other mutators verboten?

The answer (as you've doubtless cleverly deduced already) is the `const` keyword. In C++ `const` isn't just a type modifier for variables and parameters, it's also a permitted modifier on methods too. The `size( )` method on an array is declared like this:

```
size_type size() const
```

That `const` means "you can call me on a constant object, object reference, or object pointer! I promise I'm safe!". And that isn't an idle promise, it's a promise enforced by the compiler. If you declare a `const` method in a class and then try to alter member variables, the compiler's going to call it an error (unless that member is declared as volatile, but that's getting into advanced C++ and beyond what I'm interested in talking about here).

The final crucial piece of the big, tasty, onst-in-C-plus-plus-pie is the fact that you can overload by `const`\-ness. The aforementioned `std::vector` actually declares not one but _two_ `operator []`s (or should that be '`operator`s `[]`'?), one of which returns a reference to the space in the underlying array, and one of which returns the simple value.

• • •

So that's what I mean by `const` when I say "I like `const` in C++".

The usual justification for this feature set is efficiency; the compiler can differentiate between `const operator[]`, which returns a simple value, and non-`const operator[]`, which must return either a reference to an internal data structure or a proxy object, neither of which is necessarily easy or fast.

But me, I like `const` for a different reason. And that's documentation.

• • •

Backwards digression, the second: Defining the types and parameters of a function or method isn't a fundamental necessity; you could define a language where functions access the parameters they were passed by indexing into an array and assuming things are where they belong. It's very easy to do this in JavaScript, for example — the language doesn't verify parameters, and a function is free to get them out of the local `arguments` array:

```
function sayHello() {
	alert("Hello, " + arguments[0] + "!");
}
sayHello('World');
```

There are two reasons to specify type parameters; to tell the compiler the semantics of the function, and to tell the human reading the code the semantics of the function. I'm phrasing those in parallel for a reason, because they're two aspects of the same principle; function argument lists exist to document the code. This just happens to be one of the (distressingly rare) cases where the documentation is so intrinsic to the language that we don't realize it's documentation.

• • •

There's something special in that. Microsoft recognizes how important self-documenting code is; that's how [IntelliSense](http://en.wikipedia.org/wiki/IntelliSense) works, and I think you (or I, at least) could argue very plausibly that (a) the entire .NET architecture can be viewed as a means to improve and extend IntelliSense and (b) this may well represent Microsoft's biggest strategic advantage over its competitors. The core idea that makes IntelliSense work is that the best documentation of the code is the implementation itself; the more information you can mine out of that, the better.

• • •

The back-end of one of my employer's new (award-winning!) products is a suite of [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) web service APIs. One of the core parts of any such system is the routing engine; given the URI of an incoming request, how do we map that to the bunch of code that represents the appropriate response? Our system uses XML-formatted resource maps that contain the information necessary to do that; a resource map contains not only URI paths, but the parameters to extract from those URI paths and the types of those parameters, as well as the required and optional query parameters and _their_ types... it's pretty rich and pretty nifty.

But the _really_ nifty part is that I had a moment of insight one day and realized I could hardcode a mock resource into the router that ran the resource map through an [XSL transformer](http://en.wikipedia.org/wiki/XSLT) and returned a pretty (or at least, legible) HTML page that documents the system. Every URI, every parameter, all right there.

_And_ — and this is the important bit — _nobody ever has to worry about updating this documentation_. It's automatically derived from the actual implementation of the system; to add something new to the system, you need to add it to the resource map, and _bam_, there it is in the help page.

• • •

This sort of implementation-derived documentation is the primary advantage that strong, static typing has over more dynamic approaches. IntelliSense for a more dynamic language means your either execute the code as it's being typed and use real-time introspection ([as proposed by Steve Yegge in a talk at Stanford](http://steve-yegge.blogspot.com/2008/05/dynamic-languages-strike-back.html) — and probably other places, but that the first time I saw it in print) or you start trying to layer a more static type system on top of them. Either way has its problems. Running the code so you can IntelliSense it has sandboxing problems, particularly if you're doing anything that's concurrent or distributed, and laying a static type system on top of a dynamic type system is kind of an advanced, compiler-powered form of missing the point, if you ask me. I have a lot of vaguely-connected thoughts on that last point that I should probably bundle together at some point. The _Readers' Digest_ version is that adding classes to JavaScript is like adding wheels to a unicycle, in that your 'addition' has the unavoidable side effect of squashing what made the original unique. But that's a rant for another day.

Languages like C#, C++, and Java don't have those problems when it comes to rich syntax acting as embedded documentation. It's still not easy, but it's a well-studied problem, and there's existing code you can point to and say "here, here's where that feature goes!".

And it is happening, albeit slowly.

Generics in Java are widely (and correctly) criticized for not being integrated into the VM the way .NET 2.0 generics are, but on the other hand they do serve as a form of compiler-checked documentation; _this_ `ArrayList` is of `Marklar`s, and _that_ `ArrayList` is of `Widget`s. The compiler will force me to keep those types distinct, and I can look a method signature and know what it expects. Yes, it's really just an annotation for the programmer and the compiler and doesn't actually change the generated code, but in a sense that's exactly the _point_ — `const` in C++ doesn't change the generated code either most of the time, it's just letting programmers express both constraints and intent in a richer and more robust fashion.

Critics of static typing frequently argue that it provides a false sense of security, and they're right to an extent. But that doesn't mean that static typing is bad, it simply means that static typing is insufficient. Choosing between compiler-powered semantic tests and human-written unit tests is akin to choosing between seat belts and airbags — the _correct_ choice, anticlimactic though it may seem, is _both_.

• • •

So what's my point? Good languages let me do more than just write code, they let me codify what I expect my code to do and how I expect other code to call it. It lets me express in a simple and clear form every assumption I'm making, and then it explicitly checks my assumptions with all the thoroughness it can muster. That's important today for writing good code, and it's only going to get more important.

Imagine syntax-level support for concurrency.

There are methods in the next version of [iClan](/iclan) that are designed to only be called on the main thread; any time I want to activate them from elsewhere I call `[performSelectorOnMainThread:withObject:waitUntilDone:](http://developer.apple.com/DOCUMENTATION/Cocoa/Reference/Foundation/Classes/NSObject_Class/Reference/Reference.html#//apple_ref/occ/instm/NSObject/performSelectorOnMainThread:withObject:waitUntilDone:)` (boy that's a mouthful). If Objective-C had syntax for concurrency, I could mark my methods as '`mainthreadonly`', and the compiler could stop me from calling them from elsewhere. Or better yet, the compiler could note from the headers that the UI-related methods I'm calling in those methods are `mainthreadonly`, and from that _deduce_ which of my methods must be `mainthreadonly`, and either warn me for not labeling them or just cascade the analysis all the way up the call graph.

Similar story: I recently built a lockless queue in C#; it's built around [Eric Lippert's immutable queue](http://blogs.msdn.com/ericlippert/archive/2007/12/10/immutability-in-c-part-four-an-immutable-queue.aspx) code, and it uses `[Interlocked.CompareExchange](http://msdn.microsoft.com/en-us/library/system.threading.interlocked.compareexchange.aspx)` to swap a new immutable value for the old immutable value (Or rather, it repeatedly _tries_ to make that swap, regenerating a _new_ new immutable queue from the new old immutable queue if it fails... It's fun code, I should write about it someday — it turns out not to be terribly _useful_, but fun nonetheless.). The exercise would've been a lot easier on a lot of levels if C# gave the `const` keyword all the magic powers it has in C++.

You'll notice both of those examples have a concurrency angle, and that's not a coincidence. All of the self-anointed experts agree that the age of concurrency is upon us, and for a change the experts who _aren't_ self-anointed and are too smart and humble to actually _call_ themselves experts and the nobodies like myself seem to be in pretty general agreement with them. And the thing about concurrency and distributed system is, well, they're hard. Maybe not hard like _NP-hard_ hard, but still pretty bloody difficult. And the more the compiler and the runtime and the VM and the OS can do to check our work for us, the better.
