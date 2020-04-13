---
title: "Learn More, Know Less"
date: 2007-07-19 11:12:58 -0400
redirect_from:
  - /archives/2007/07/learn_more_know.shtml
legacy_url: http://seankerwin.org/archives/2007/07/learn_more_know.shtml
---
I read <a href="http://www.amazon.com/o/asin/0201485672">Refactoring</a>.  Thought I understood it.  Liked it, even.  Wordy in place, but well worth reading.

Now I'm working with <a href="http://www.w3.org/TR/xslt"><abbr title="eXtensible Stylesheet Language Transformations">XSLT</abbr></a>.  I want the transformations to be fast, of course, which means I need to learn more about <a href="http://en.wikipedia.org/wiki/Functional_programming">functional programming</a> (because, though you'd never really know at first blush, <a href="http://www.ibm.com/developerworks/library/x-xslt/"><abbr title="eXtensible Stylesheet Language Transformations">XSLT</abbr> is a full-on language</a>).

So in hindsight, <a href="http://www.refactoring.com/catalog/extractMethod.html">Extract method</a>, <a href="http://www.refactoring.com/catalog/inlineMethod.html>inline method</a>, <a href="http://www.refactoring.com/catalog/replaceTempWithQuery.html>replace temp with query</a>... this is all about <a href="http://en.wikipedia.org/wiki/Referential_transparency">referential transparency</a>, isn't it?  The concepts are really inextricably linked, very obviously for those refactorings and less obviously but no less intrinsically to many other refactorings.

But referential transparency is all about about <a href="http://en.wikipedia.org/wiki/Pure_function">pure-functional</a> programming, removing <a href="http://en.wikipedia.org/wiki/Side_effect_%28computer_science%29">side effects</a>.  And side effects are like globals (or <a href="http://en.wikipedia.org/wiki/Singleton_pattern">singletons</a>, and Lord do I <a href="http://steve.yegge.googlepages.com/singleton-considered-stupid"><i>hate</i> singletons</a>) but isn't an object method kind of a like a function with the object properties as globals?  How's it different?  Is it?

If maintainable code is refactorable, and refactorable code is functional, and objects are inherently tied up with side-effects, and side-effects are non-trivially incompatible with functional programming, how the hell are we not all globally and intrinsically screwed?
