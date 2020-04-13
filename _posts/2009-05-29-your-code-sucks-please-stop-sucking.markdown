---
title: "Your Code Sucks, Please Stop Sucking"
date: 2009-05-29 23:08:42 -0400
redirect_from:
  - /archives/2009/05/your_code_sucks_please_stop_su.shtml
legacy_url: http://seankerwin.org/archives/2009/05/your_code_sucks_please_stop_su.shtml
---
Dear Reader,  

Your code sucks.  

It's okay though, so does everyone else's code, including mine. But a big part of improving is recognizing what you're doing wrong, and a big part of that is having random bald guys berate you. So in the spirit of improving the world, here are five thoughts on writing code that sucks less. Heavily C#-centric because that's what I've been reading lately, but I think most of it's meaningful in any environment modulo some terminological adjustments.  

**1\. Dumb Comments Are Dumb**  

A comment that doesn't say anything useful is worse than worthless; it's actively harmful.  

If you have a property named Marklar with a comment telling me that it 'gets or sets the Marklar', you haven't told me anything of value, and reading your useless comment has cost me precious seconds of my life that I'll never get back. You've also probably raised my blood pressure a bit, but I suppose that's more on me than on you.  

Now if a Marklar is an odd or confusing type of thing, and you can't reasonably expect everyone to know what it is or why it's there, by all means explain it. Similarly, if this property has unusual behavior in some respect — perhaps it's lazily loaded — mention that in a comment. But don't just put a bloody comment on every property because some never-been-employed professor once told you that that's the right thing to do. It isn't. If someone can't tell you that the `EyeColor` property lets you get or set the color of the receiver's eyes, they have no business writing code in the first place.  

You should only put comments where they're needed, and generally if a comment is legitimately needed it's a sign that you're writing bad code. Don't name the property `Age` and then add a comment explaining that it's in seconds; name it `AgeInSeconds` and skip the comment entirely. That saves _you_ typing, saves _me_ reading, and has the further benefit of being completely impossible for future programmers to miss unless they're severely mentally impaired (in which case, see above, they have no business writing code in the first place).  

Similarly, if you feel compelled to add a comment explaining that the next five lines of code are stochastically approximating the chronosynclastic infundibulumation of the yada, yada... that's your sign that those five lines should be extracted into a method with an appropriate name like 'AproximateTechnobabble'. That makes it easier for me to read the original method because I can temporarily ignore the hard stuff, while also making it easier for me to understand the hard stuff later on if I need to (since it's now isolated with clear, labeled inputs).  

Finally, dumb comments are dumb not just in the code, but everywhere. If your checkin note is "I changed the twelfth character of line 37 from an 'e' to a 'z'", you have so completely and cleanly missed the point of checkin notes that I can't even scrape together a proper disparaging simile. Checkin notes are there so I can get a high-level understanding of what you've checked in, _without having to open the bloody file_. "Ran a match along a patch of bark" is a lousy checkin note when what you actually did was "burned down the forest". Tell me about the forest, I couldn't care less about the _trees_.  

**2\. Every Time You Type '#region' I Die A Little Inside**  

Regions suck. If I were king I'd ban 'em outright, so sincere and total is my dislike. They're a trick you play on yourself to let you pretend that your bad code is good, and they tell the world that you're a good enough coder to know a three-thousand-line file stinks, but that you're either not good enough to fix it or you're just plain too lazy. In either situation the solution is to step up, not to add a region and sweep part of the bad code under the rug.  

A special note on regions _within methods_: wrapping a region around your twelve constructors to hide the excess complexity is a venal sin. Putting a region _inside_ your method to hide 3,000 of its 4,000 lines is a _mortal_ sin.  

Some people might ask why extracting methods (like `AproximateTechnobabble` above) is good but collapsing regions within a method is evil. The simple answer is encapsulation; a region isn't a new scope, so it has access to all the fields and variables of the method it's within. That greatly increases the difficulty of understanding the code, because now I need to actively read through and figure out how the code inside the region interacts with the code outside the region. An extracted method doesn't have the problem, because I can look at exactly what parameters are passed in and exactly what comes out, without having to trace through and worry about side effects. Regions superficially seem to simplify the complexity of your code; extracted methods _actually do_.  

**3\. Static Methods Are Your Friends, And You Should Want More Of Them**  

Static methods are pure functions, in the mathematical sense; they're black boxes that take some input and return some output. Remember where I said methods are better than regions because they simplify complexity? The same logic recommends static methods over non-static methods. Static methods help you make sure you're not weaving a tangled web of side effects and dependencies with each method call.  

Imagine coming upon a call to `myComplexMarklar.CalculateInfundibulumation()`. Now, if you don't know what infundibulumation is (incidentally, the state of being or the act of becoming funnel-like or akin to a funnel), and have no idea how you would calculate it (no idea), that method doesn't tell you a whole lot. Now imagine stepping through that rather lengthy method and figuring out how it works. You are potentially entering a world of pain.  

Now imagine a static method, `Marklar.CalculateInfundibulumation(float topRadius, float bottomRadius, float height)`, and further imagine that the non-static method works by calling the static method and passing along the three appropriate values. It has instantly become a whole lot easier for me to understand what infundibulumation is, because now I know that no matter how gnarly the math is it's just a function of those three values. Now not only can I better understand that particular method, but a lot of the meaning of the Marklar class in general has become more clear.  

In an object-oriented language, every instance method is getting more parameters than you've listed in the declaration line; it's also getting access to all of the instance's member fields. Imagine seeing that written out — would you deliberately write a method that takes a hundred parameters but only uses two of them? That might be a good sign that it's time for some judiciously-applied static methods.  

Static methods have other benefits. For one, they're a lot more reusable; if the static `CalculateInfundibulumation( tR, bR, h )` method is general, you might find you need it in another class. Depending on your situation, you could either make it public and call it right out of Marklar, move it to a new common base class, or move it to a utility class. Each of those solutions would be far more complicated if it were non-static. I've been in situations where I needed a complex non-static method from a pre-existing class that I couldn't reasonably modify, and ended up constructing an instance with a bunch of bogus data, setting the handful of fields that the calculation actually depends on, and calling the instance method on that. That's hideous — ugliness wrapped in brittleness wrapped in unmaintainable complexity. Don't make me do that again.  

Static methods also lend themselves incredibly well to a form of optimization known as [memoization](http://en.wikipedia.org/wiki/Memoization). The root of memoization is basically the realization that the next time you run the same calculation, you'll reach the same result (yeah, I know, 'duh', right?). The tie-in to static methods is that static methods let you know precisely _what_ the inputs are to the calculation you're running, while instance methods don't. Memoizing a static method is 'easy' (in the sense of being a solved problem), while memoizing instance methods can be a buggy pain in the butt.  

3b. Subverting Static Methods Is Bad And People Who Do It Should Be Forced To Write Pascal  

Sometimes you'll see a static class, full of static fields and static variables and static methods. That's not what I'm talking about when I say static is good. That's not good, it's the other thing. Bad. It's a crappy-ass degenerate-global-variable-singleton. Don't do that. [Smart people hate singletons](http://steve.yegge.googlepages.com/singleton-considered-stupid).  
**4\. Properties Are Properties, Methods Are Methods**  

A property is intended to represent an attribute of an object, while a method models an action that the object may take or that may be taken upon the object. These are different concepts, and you need to think about which is appropriate for a particular case. If you have a property with a verb in the name, you're almost certainly thinking about things the wrong way.  

Some people will tell you that properties should just be get/set wrappers around your fields. Others will say it's okay to do some field validation. Others go hog wild. It's hard to draw bright lines because the simple fact is that it's sometimes a judgement call. A good heuristic is to think like someone using your class. The default assumption is that properties are simple get/set wrappers around a private field, and everything you do to violate that assumption nudges the scale towards building a method.  

Let's say your class has a `ServerConnection` property that returns some sort of communications channel to a remote server. As a caller, my mindset is that this connection already exists, and the property is giving me access to it. But if only a subset of the calling code ever needs this connection, it might make sense to lazily connect when the property is first accessed rather than connecting in the constructor and keeping around a connection that may never actually be needed. But that's changing the semantics of the property a little bit, because the mindset of the calling code is still 'this already exists, the property is just handing it to me', and the calling code may not expect this property to take a long time to execute. Maybe now there should be a progress bar, or the call should happen in another thread.  

Like I said, judgement call. In situations like that one, asking ten developers will get you fifteen different opinions. There isn't a 'right' answer, it's just a matter of getting it right enough. All anyone can ask is that you think.  

But in other cases, it's totally cut and dried. I've seen code with a LastSaveDate property that saves to the database and returns DateTime.Now. If you're not physically ill at the thought of that, you need to figure why and _get sick fast_.  

**5\. Public Methods Are Contracts, Which Should Not Be Entered Lightly**  

When you make a method public, you're inviting the world to use it and you're promising that it will continue to do exactly what it does now. Forever.  

Let's say you're creating a `CarFactory` class that creates new `Car` objects. `CarFactory.CreateCar( )` was starting to get a little long, so you started extracting out helper methods: `CreateTransmission( )`, `CreateBody( )`, `CreateWheel( )`, etc. That's good, keep doing it.  

Now let's say you decided that since `CreateCar( )` was public that you might as well make `CreateTransmission( )` _et al_ public too. That's no-so-much with the good. Unless you know right now that someone else needs to create a transmission without creating a full car, leave that method private.  

To the calling code, a `CarFactory` and a `Car` are black boxes. The calling code doesn't need to know that a car contains a transmission, and next year when you change `CarFactory` and Car to build fully-electric vehicles, which don't _need_ a transmission, you won't have to worry about supporting that public method that a bunch of your coworkers have just spent twelve months linking against.  

There's a more general lesson here: Share the hot dog, not the making thereof.  

Which, come to think of it, is a good moral on which to end any story.
