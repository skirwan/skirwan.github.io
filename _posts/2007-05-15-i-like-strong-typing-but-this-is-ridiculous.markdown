---
title: "I like Strong Typing, But This Is Ridiculous"
date: 2007-05-15 13:42:54 -0400
redirect_from:
  - /archives/2007/05/i_like_strong_t.shtml
legacy_url: http://seankerwin.org/archives/2007/05/i_like_strong_t.shtml
---
In C++, I could write a template like the following:

<code><pre>
std::map&lt;string, string&gt; PropertyList;

template&lt;class T&gt;
T GetProperty(const string & propertyName) {
    return T.Parse(PropertyList[propertyName]);
}
</pre></code>

And it would work so long as it was used properly;  if you tried to fetch a property of a type that lacked a Parse method, you'd fail to compile.  The error message would be a hideous mess, but as long as you the programmer made sure that all your Ts could .Parse, you were golden.

Compare and contrast with C# (2.0):

<code><pre>
Dictionary&lt;String, String&gt; PropertyList;

T GetProperty&lt;T&gt;(String propertyName)
{
    return T.Parse(PropertyList[propertyName]);
}
</pre></code>

That won't work, because the .NET compiler wants to be sure that every potential T that this generic method could ever meet has a .Parse method.  <i>Really</i> sure.  This appears to be because the .NET 2.0 runtime contains intrinsic support for generics, which is actually a really neat feature; in C++ each instantiation of a template becomes its own chunk of code, and the space requirements grow far faster than most programmers expect.  In this sense at least C# generics are far superior, as they propagate the savings in time and effort from the programmer all the way through to the execution environment, while C++ saves the programmer some time but makes the end user pay full freight.

So what's Microsoft's solution to the problem?  Pretty much what you'd expect from a company that likes solving every problem with a database: they added a 'where' clause.

<code><pre>
T GetProperty&lt;T&gt;(String propertyName) where T : IParseable
{
    return T.Parse(PropertyList[propertyName]);
}
</pre></code>

Oh, neat!  That earns me two things: first, the IDE will stop me if I try to invoke this for a type that doesn't implement the IParseable interface and will do so with a polite error message; second, I can now call any method defined by the IParseable interface within my generic method.

Problem solved, right?  Nope!  Because there <i>isn't</i> an IParseable.  Ain't no such beasty.  And if I need to support arbitrary built-in types for my property-fetching system (and it turns out that in the situation that inspired this missive, I <i>do</i>) I'm pretty-much S-O-L.  Even if I could jump forward in time to get a release copy of the new Orcas build of Visual Studio and upgrade to C# 3.0 with those shiny new extension-methods (which, by the way, Objective-C has had for ages under the name 'Categories' -- but that's another rant) I'd still be screwed.  Extension methods would allow me to put a .Parse method on any and every class I want, but they don't provide me a mechanism to inject interfaces into existing classes.  The best I could do is inject .Parse into the object base class and then override it appropriately for each case I care about.  Of course that depends on the fact that built-in methods with the same signature as extension methods override the extension, and from what I've read that particular behavior's still a little bit up in the air.

It also leaves me in a situation that's worse than C++ started from, at least from a maintenance standpoint; I can now attempt to query any object of any type using my GetProperty method, and it'll compile just fine.  But if it's a type for which my generic object.Parse injection won't work, I'll find out at <i>run time</i> instead of <i>compile time</i>.  Really the best thing I could do would be to make my default object.Parse method throw a NotImplementedException with a helpful error message, and I think anyone who's worked on a large project will agree that that kind of solution is a special new kind of <i>suck</i>.

So what's the solution?  Well, it's to cheat:

<code><pre>
T GetProperty&lt;T&gt;(String propertyName) where T : IParseable
{
    (T)typeof(T).GetMethod("Parse", new Type[] { typeof(string) }).Invoke(null, new object[] { PropertyList[propertyName] });
}
</pre></code>

I feel dirty writing that, but at least it compiles and works -- as long as you remember not to pass in something without a Parse method, because that's a one-way-trip to UnhandledExceptionville.
