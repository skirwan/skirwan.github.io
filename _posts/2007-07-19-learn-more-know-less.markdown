---
title: "Learn More, Know Less"
date: 2007-07-19 11:12:58 -0400
redirect_from:
  - /archives/2007/07/learn_more_know.shtml
legacy_url: http://seankerwin.org/archives/2007/07/learn_more_know.shtml
---
I read [Refactoring](http://www.amazon.com/o/asin/0201485672). Thought I understood it. Liked it, even. Wordy in place, but well worth reading.  

Now I'm working with [XSLT](http://www.w3.org/TR/xslt). I want the transformations to be fast, of course, which means I need to learn more about [functional programming](http://en.wikipedia.org/wiki/Functional_programming) (because, though you'd never really know at first blush, [XSLT is a full-on language](http://www.ibm.com/developerworks/library/x-xslt/)).  

So in hindsight, [Extract method](http://www.refactoring.com/catalog/extractMethod.html), [replace temp with query](http://www.refactoring.com/catalog/inlineMethod.html>inline method</a>, <a href=)... this is all about [referential transparency](http://en.wikipedia.org/wiki/Referential_transparency), isn't it? The concepts are really inextricably linked, very obviously for those refactorings and less obviously but no less intrinsically to many other refactorings.  

But referential transparency is all about about [pure-functional](http://en.wikipedia.org/wiki/Pure_function) programming, removing [side effects](http://en.wikipedia.org/wiki/Side_effect_%28computer_science%29). And side effects are like globals (or [singletons](http://en.wikipedia.org/wiki/Singleton_pattern), and Lord do I [_hate_ singletons](http://steve.yegge.googlepages.com/singleton-considered-stupid)) but isn't an object method kind of a like a function with the object properties as globals? How's it different? Is it?  

If maintainable code is refactorable, and refactorable code is functional, and objects are inherently tied up with side-effects, and side-effects are non-trivially incompatible with functional programming, how the hell are we not all globally and intrinsically screwed?
