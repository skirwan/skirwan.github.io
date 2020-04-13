---
title: "Returning a Subtype From a Method Defined By a Base Class in C#"
date: 2007-11-26 11:58:48 -0500
redirect_from:
  - /archives/2007/11/returning_a_sub.shtml
legacy_url: http://seankerwin.org/archives/2007/11/returning_a_sub.shtml
---
It happens rarely but regularly that I want to define a function in an abstract base class that return an instance of the child class. Typically this comes up because I want the ability to chain method invocations; it's much easier to type Marklar.CreateNew( ... ).Save( ).SendTo( ... ) than it is to break that out over three or more lines and introduce a local variable (at least to me). It also shows up when you're doing any heavily generic programming, when you want a clone( ) method, and a host of other unusual-but-not-unheard of cases.  

The obvious (and unsatisfying) way to do this is as follows:  

class BaseMarklar {  
	public BaseMarklar Self( ) { return this; }  
}  

class BlueMarklar : BaseMarklar {  
	public void Frob( ) { ... }  
}  

The problem there is that if I have a reference to a BlueMarklar and invoke Self, the result of the call isn't a BlueMarklar, but a BaseMarklar. If I want to do something BlueMarklar-specific to the result (like Frob( ) it) I'll need to cast down the inheritance hierarchy, which as we all know is akin to crossing the streams except with fewer toasted marshmallows and more unforeseen crashing bugs.  

There are a lot of things you can try to get around this, but none of them work quite right. Virtual functions don't work, because an override with a different method signature isn't an override. Leaving it out of the base class and instituting an external rule that subclasses must implement Self( ) doesn't work, because then you can't call it polymorphically and besides nobody's going to implement it anyway.  

Eventually you'll try getting clever; If you're in C#, for instance, you'll wonder: what if Self were a generic method?  

class BaseMarklar {  
	public T Self<T>( ) { return (T) this; }  
}  

class BlueMarklar : BaseMarklar {  
	public void Frob( ) { ... }  
}  

class RedMarklar : BaseMarklar {  
	public void Frizzle( ) { ... }  
}  

You'll realize pretty quickly that this won't compile because the cast from this to T is invalid, but in keeping with the long-standing Microsoft tradition of [solving every problem with a where clause](/archives/2007/05/i_like_strong_t.shtml), this is not an insoluble problem:  

class BaseMarklar {  
	public T Self<T>( ) where T:BaseMarklar { return (T) this; }  
}  

That kinda-sorta works; You'll need to manually specify the generic type for Self( ) every time you invoke it (because there are no parameters from which to infer), but if you can live with the admittedly minor annoyance of typing MyBlueMarklar.Self<BlueMarklar>( ).Frob( ) then you might say it's good enough.  

Until someone else has to work with or support your code, of course. Because you've given them a loaded gun, which they're free to point and fire just by typing MyBlueMarklar.Self<RedMarklar>( ).Frizzle( ). Whoops! Because the calling code provides the return type of Self( ), it's free to do dumb things like cast to a sibling type.  

So how do you prevent this? Well, here's _a_ solution:  

class BaseMarklar<T> where T:BaseMarklar<T> {  
	public T Self() { return (T)this; }  
}  

class BlueMarklar : BaseMarklar<BlueMarklar> {  
	public void Frob() { ... }  
}  

class RedMarklar : BaseMarklar<RedMarklar> {  
	public void Frizzle() { ... }  
}  

Weird, ain't it? The more I think about this, the more I'm amazed that it works (and it _does_ work... or at least it passes all my unit tests). We're building classes that inherit from a generic class that's parameterized on the class we're creating.  

I haven't had time to test it out, but I'm 99% sure this would be impossible with C++ templates -- because templates are essentially expanded like glorified macros during compilation and base classes have to be successfully compiled before compiling subclasses, you'd end up with a circular dependency problem. I can imagine this causing stack overflows on a whole class of code-analysis tools.
