---
title: "Constant Documentation"
date: 2009-05-07 16:54:01 -0400
redirect_from:
  - /archives/2009/05/constant_documentation.shtml
legacy_url: http://seankerwin.org/archives/2009/05/constant_documentation.shtml
---
<p>The only C++ feature I seriously miss in other languages is <code>const</code>.  Not in the simple 'this variable is a constant' usage, where it's nothing but a type-checked #define &mdash; no, I miss the <code>const</code> keyword in the interaction of <code>const</code> methods and <code>const</code> objects.</p>

<div style="text-align:center;">&bull; &bull; &bull;</div>

<p>First some background &mdash; I don't expect folks who haven't spent time with C++ to know much about this, and a surprising number of veteran C++ coders seem to be unaware of it as well.  In C++, <code>const</code> can be many things.  One role is as a type modifier that means "I'm not going to change this".  A common usage is to accept a <code>const</code> references:</p>

<pre><code>
int calculateAverage( const std::vector&lt;int&gt; &amp; values );</code></pre>

<p>That <code>const</code> means "I'm just going to look at it, I'm not going to mutate it" (or, if you like thinking functionally, "I'm a real function, hand me my immutable input" &mdash; more on that angle later).  What does that mean, in terms of actual code?  It means the body of that function can't call (for instance) <code>values.push_back( 12 )</code> and mutate the data it was handed.  And when I say "can't" I don't mean "shouldn't", I mean the compiler will actually flag that as an error and stop you.  If you keep trying it'll even call you names.</p>

<p>Now obviously the body of the function still needs a way to call methods on that vector &mdash; it'll need some to get at the contents, whether it's running a for loop from zero to <code>values.size( )</code> and calling <code>operator[]</code> in between, or looping from <code>begin()</code> to <code>end()</code>, or whatever.  So what makes those methods okay, and <code>push_back</code>, <code>pop_back</code>, <code>insert</code>, <code>swap</code> and various other mutators verboten?</p>

<p>The answer (as you've doubtless cleverly deduced already) is the <code>const</code> keyword.  In C++ <code>const</code> isn't just a type modifier for variables and parameters, it's also a permitted modifier on methods too.  The <code>size( )</code> method on an array is declared like this:</p>

<pre><code>
size_type size() const</code></pre>

<p>That <code>const</code> means "you can call me on a constant object, object reference, or object pointer!  I promise I'm safe!".  And that isn't an idle promise, it's a promise enforced by the compiler.  If you declare a <code>const</code> method in a class and then try to alter member variables, the compiler's going to call it an error (unless that member is declared as volatile, but that's getting into advanced C++ and beyond what I'm interested in talking about here).</p>

<p>The final crucial piece of the big, tasty, onst-in-C-plus-plus-pie is the fact that you can overload by <code>const</code>-ness.  The aforementioned <code>std::vector</code> actually declares not one but <i>two</i> <code>operator []</code>s (or should that be '<code>operator</code>s <code>[]</code>'?), one of which returns a reference to the space in the underlying array, and one of which returns the simple value.</p>

<div style="text-align:center;">&bull; &bull; &bull;</div>

<p>So that's what I mean by <code>const</code> when I say "I like <code>const</code> in C++".</p>

<p>The usual justification for this feature set is efficiency; the compiler can differentiate between <code>const operator[]</code>, which returns a simple value, and non-<code>const operator[]</code>, which must return either a reference to an internal data structure or a proxy object, neither of which is necessarily easy or fast.</p>

<p>But me, I like <code>const</code> for a different reason.  And that's documentation.</p>

<div style="text-align:center;">&bull; &bull; &bull;</div>

<p>Backwards digression, the second: Defining the types and parameters of a function or method isn't a fundamental necessity; you could define a language where functions access the parameters they were passed by indexing into an array and assuming things are where they belong.  It's very easy to do this in JavaScript, for example &mdash; the language doesn't verify parameters, and a function is free to get them out of the local <code>arguments</code> array:</p>

<pre><code>
function sayHello() {
	alert("Hello, " + arguments[0] + "!");
}
sayHello('World');
</code></pre>

<p>There are two reasons to specify type parameters; to tell the compiler the semantics of the function, and to tell the human reading the code the semantics of the function.  I'm phrasing those in parallel for a reason, because they're two aspects of the same principle; function argument lists exist to document the code.  This just happens to be one of the (distressingly rare) cases where the documentation is so intrinsic to the language that we don't realize it's documentation.</p>

<div style="text-align:center;">&bull; &bull; &bull;</div>

<p>There's something special in that.  Microsoft recognizes how important self-documenting code is; that's how <a href="http://en.wikipedia.org/wiki/IntelliSense">IntelliSense</a> works, and I think you (or I, at least) could argue very plausibly that (a) the entire .NET architecture can be viewed as a means to improve and extend IntelliSense and (b) this may well represent Microsoft's biggest strategic advantage over its competitors.  The core idea that makes IntelliSense work is that the best documentation of the code is the implementation itself; the more information you can mine out of that, the better.</p>

<div style="text-align:center;">&bull; &bull; &bull;</div>

<p>The back-end of one of my employer's new (award-winning!) products is a suite of <a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">RESTful</a> web service APIs.  One of the core parts of any such system is the routing engine; given the URI of an incoming request, how do we map that to the bunch of code that represents the appropriate response?  Our system uses XML-formatted resource maps that contain the information necessary to do that; a resource map contains not only URI paths, but the parameters to extract from those URI paths and the types of those parameters, as well as the required and optional query parameters and <i>their</i> types... it's pretty rich and pretty nifty.</p>

<p>But the <i>really</i> nifty part is that I had a moment of insight one day and realized I could hardcode a mock resource into the router that ran the resource map through an <a href="http://en.wikipedia.org/wiki/XSLT">XSL transformer</a> and returned a pretty (or at least, legible) HTML page that documents the system.  Every URI, every parameter, all right there.</p>

<p><i>And</i> &mdash; and this is the important bit &mdash; <i>nobody ever has to worry about updating this documentation</i>.  It's automatically derived from the actual implementation of the system; to add something new to the system, you need to add it to the resource map, and <i>bam</i>, there it is in the help page.</p>

<div style="text-align:center;">&bull; &bull; &bull;</div>

<p>This sort of implementation-derived documentation is the primary advantage that strong, static typing has over more dynamic approaches.  IntelliSense for a more dynamic language means your either execute the code as it's being typed and use real-time introspection (<a href="http://steve-yegge.blogspot.com/2008/05/dynamic-languages-strike-back.html">as proposed by Steve Yegge in a talk at Stanford</a> &mdash; and probably other places, but that the first time I saw it in print) or you start trying to layer a more static type system on top of them.  Either way has its problems.  Running the code so you can IntelliSense it has sandboxing problems, particularly if you're doing anything that's concurrent or distributed, and laying a static type system on top of a dynamic type system is kind of an advanced, compiler-powered form of missing the point, if you ask me.  I have a lot of vaguely-connected thoughts on that last point that I should probably bundle together at some point.  The <i>Readers' Digest</i> version is that adding classes to JavaScript is like adding wheels to a unicycle, in that your 'addition' has the unavoidable side effect of squashing what made the original unique.  But that's a rant for another day.</p>

<p>Languages like C#, C++, and Java don't have those problems when it comes to rich syntax acting as embedded documentation.  It's still not easy, but it's a well-studied problem, and there's existing code you can point to and say "here, here's where that feature goes!".</p>

<p>And it is happening, albeit slowly.</p>

<p>Generics in Java are widely (and correctly) criticized for not being integrated into the VM the way .NET 2.0 generics are, but on the other hand they do serve as a form of compiler-checked documentation; <i>this</i> <code>ArrayList</code> is of <code>Marklar</code>s, and <i>that</i> <code>ArrayList</code> is of <code>Widget</code>s.  The compiler will force me to keep those types distinct, and I can look a method signature and know what it expects.  Yes, it's really just an annotation for the programmer and the compiler and doesn't actually change the generated code, but in a sense that's exactly the <i>point</i> &mdash; <code>const</code> in C++ doesn't change the generated code either most of the time, it's just letting programmers express both constraints and intent in a richer and more robust fashion.</p>

<p>Critics of static typing frequently argue that it provides a false sense of security, and they're right to an extent.  But that doesn't mean that static typing is bad, it simply means that static typing is insufficient.  Choosing between compiler-powered semantic tests and human-written unit tests is akin to choosing between seat belts and airbags &mdash; the <i>correct</i> choice, anticlimactic though it may seem, is <i>both</i>.</p>

<div style="text-align:center;">&bull; &bull; &bull;</div>

<p>So what's my point?  Good languages let me do more than just write code, they let me codify what I expect my code to do and how I expect other code to call it.  It lets me express in a simple and clear form every assumption I'm making, and then it explicitly checks my assumptions with all the thoroughness it can muster.  That's important today for writing good code, and it's only going to get more important.</p>

<p>Imagine syntax-level support for concurrency.</p>

<p>There are methods in the next version of <a href="http://seankerwin.org/iclan">iClan</a> that are designed to only be called on the main thread; any time I want to activate them from elsewhere I call <code><a href="http://developer.apple.com/DOCUMENTATION/Cocoa/Reference/Foundation/Classes/NSObject_Class/Reference/Reference.html#//apple_ref/occ/instm/NSObject/performSelectorOnMainThread:withObject:waitUntilDone:">performSelectorOnMainThread:withObject:waitUntilDone:</a></code> (boy that's a mouthful).  If Objective-C had syntax for concurrency, I could mark my methods as '<code>mainthreadonly</code>', and the compiler could stop me from calling them from elsewhere.  Or better yet, the compiler could note from the headers that the UI-related methods I'm calling in those methods are <code>mainthreadonly</code>, and from that <i>deduce</i> which of my methods must be <code>mainthreadonly</code>, and either warn me for not labeling them or just cascade the analysis all the way up the call graph.</p>

<p>Similar story:  I recently built a lockless queue in C#; it's built around <a href="http://blogs.msdn.com/ericlippert/archive/2007/12/10/immutability-in-c-part-four-an-immutable-queue.aspx">Eric Lippert's immutable queue</a> code, and it uses <code><a href="http://msdn.microsoft.com/en-us/library/system.threading.interlocked.compareexchange.aspx">Interlocked.CompareExchange</a></code> to swap a new immutable value for the old immutable value (Or rather, it repeatedly <i>tries</i> to make that swap, regenerating a <i>new</i> new immutable queue from the new old immutable queue if it fails... It's fun code, I should write about it someday &mdash; it turns out not to be terribly <i>useful</i>, but fun nonetheless.).  The exercise would've been a lot easier on a lot of levels if C# gave the <code>const</code> keyword all the magic powers it has in C++.</p>

<p>You'll notice both of those examples have a concurrency angle, and that's not a coincidence.  All of the self-anointed experts agree that the age of concurrency is upon us, and for a change the experts who <i>aren't</i> self-anointed and are too smart and humble to actually <i>call</i> themselves experts and the nobodies like myself seem to be in pretty general agreement with them.  And the thing about concurrency and distributed system is, well, they're hard.  Maybe not hard like <i>NP-hard</i> hard, but still pretty bloody difficult.  And the more the compiler and the runtime and the VM and the OS can do to check our work for us, the better.</p>
