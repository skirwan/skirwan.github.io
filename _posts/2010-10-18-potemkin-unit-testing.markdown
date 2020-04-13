---
title: "Potemkin Unit Testing"
date: 2010-10-18 12:53:42 -0400
redirect_from:
  - /archives/2010/10/potemkin_unit_testing.shtml
legacy_url: http://seankerwin.org/archives/2010/10/potemkin_unit_testing.shtml
---
After the Russian Empire annexed the Crimean peninsula in 1783, Tsarina Catherine II (motto: “[I'm greeeeat!](http://en.wikipedia.org/wiki/Tony_the_Tiger)”) took a tour of the area, guided by her trusted advisor and alleged-favored-non-equine-paramour Gregory Potempkin (or if you're not into the whole Anglicization thing, _Grigory Potyomkin_... or if you're _really_ not into Anglicization, Григо́рий Алекса́ндрович Потёмкин).

As the story goes, Catherine's inspection took the form of a leisurely cruise down the Dniper River. Potemkin, being aware that the Crimea was kind of a crummy area and fearful that the Tsarina would mislike the realization that her new territory kinda sucked, ordered the hasty construction of numerous fake village façades along the river bank. The illusion held; Catherine went home thinking the Crimea was a bustling hub of non-squalid not-mud, and our modern world gained a vivid new idiom: 'Potempkin Villages'.

Of course all the actual evidence is that the story is bunk — Potemkin may have instructed the peasants to clean up a bit and maybe paint some fences, but the idea that the whole area was an elaborate set was an extreme exaggeration spread by his political rivals. But it's one of those stories that's just too good to not tell, isn't it? It's 'truthy'.

Changing direction entirely: [unit testing](http://en.wikipedia.org/wiki/Unit_testing) is [the new hotness](http://www.imdb.com/title/tt0120912/quotes) in software development. The basic idea is that you decompose your software into small, manageable units and create dedicated automated tests that verify the functionality of those units. And it is, in general, a really good idea.

The problem that crops up with unit tests is that some things are just really hard to test, particularly when your code interacts with something outside your control — such as a human user, a piece of hardware, or a third-party web service. In those cases you need to get tricky; you create new layers of abstraction that separate the interaction from the main work of your module, and then you create 'mock' version of those abstraction layers and substitute in a 'simulated user' for a real user, or a 'simulated serial port' for your hardware, or a 'simulated web service' for the third-party service.

In some cases that approach may make sense. For some pieces of hardware the range of possible states is limited; a button is up or down, and it's never both. If a user is given an extremely limited set of buttons to click, you can reasonably simulate every possible interaction model. But for anything more complex, you're kind of creating a Potemkin unit test. So you've extracted out an `ITwitterApiProxy` that your `TwitterService` talks to, and you can plug in your `MockTwitterApiProxy` and write a whole host of tests for your `TwitterService`. Every failure mode you can think of can be simulated by the `MockTwitterApiProxy` and you've coded the `TwitterService` to deal with all of them reasonably — and hurray, the unit tests mean you're safe!

Now you go to production, with the `RealTwitterApiProxy`, and stuff goes wrong. Twitter's failing in ways you never anticipated! So you add more switches and dials to your `MockTwitterApiProxy`, and add more code to your `TwitterService` to deal with them, and write tests to exercise them... and hurray, the unit tests mean you're safe! ...at least until Twitter fails in another new way you haven't seen.

Compare that to how you would have handled things without unit tests: You code up `TwitterService`, handle the error cases you anticipate, go to production and discover some more error cases, update `TwitterService` to handle them... lather, rinse, repeat. It's essentially the same workflow.

So what does the extra effort buy you? What's the benefit of building your API abstraction and unit tests?

Well the obvious answer is that it buys you protection against regression. You have an explicit test in place for handling error type A, so if in the course of implementing support for type G errors you accidentally break type A, the unit test will fail and you'll find out. There's that, certainly. Without unit tests it's basically down to trust: I trust myself (or my fellow developers) not to break _this_ part of the code while working on _that_ part of the code.

But on the other hand, your test for handling error type A isn't _really_ testing your handling of error type A, it's testing your handling of your mock simulation of error type A. How can you be sure that in the course of adding code to simulate error G to your mock you didn't accidentally break the code that simulates error type A? Isn't that the same sort of "trust yourself" approach that the non-unit-testing approach is left to? Should you add unit tests for your mocks to ensure that they're properly simulating errors?

Ultimately a lot of this is down to personal judgement, like most of the interesting questions in software development. And I'm certainly not going to argue that unit tests aren't a good idea a lot of the time. But I do believe that there are certain situations where unit tests create a lot of extra code to maintain without really adding much in the way of protection, and that committing to building such Potemkin unit tests is [a foolish consistency](http://www.bartleby.com/100/420.47.html) of precisely the sort that will prove [a poor substitute for Norman Osborn](http://en.wikipedia.org/wiki/Hobgoblin_(comics)).
