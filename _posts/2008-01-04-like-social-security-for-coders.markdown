---
title: "Like Social Security For Coders"
date: 2008-01-04 17:00:48 -0500
redirect_from:
  - /archives/2008/01/like_social_sec.shtml
legacy_url: http://seankerwin.org/archives/2008/01/like_social_sec.shtml
---
I had an interesting discussion with a coworker today about zero-based indexing.  It all started with a method signature for accessing a range of a collection; I had specced the interface to be in the form:
<code><pre>
int GetMarklarCount( );
IEnumerable&lt;Marklar&gt; GetMarklars( int skip, int count );
</pre></code>
I intended this to mean 'skip this number of items, and then give me the next this many' -- the first page would be ( 0, 10 ) and the second would be ( 10, 10 ), for instance (assuming ten items per page).  I had referred to this idiom as 'pagination support', because the key goal of the design was to allow clients of the service to support pagination in the UI.

Other folks had duplicated the idiom but misinterpreted it, assuming that the <code>skip</code> parameter represented the number of <i>pages</i> to skip, and the count parameter specified the size of a page, so fetching those same two pages would be ( 0, 10 ) and ( 1, 10 ).

We had a discussion and my meaning won out, but it quickly segued into a discussion of the relative merits of <code>GetMarklars( int skip, int count )</code> and the similar <code>GetMarklars( int first, int count )</code>.  I favored the signature using 'skip' as I feel it's less ambiguous: saying 'first' brings up the obvious question of whether the first element is element zero or element one, and I'd prefer not to have that degree of uncertainty in an interface.

All of which merely serves to get to my main point: the fact that programming today uses zero-based indexing is a <i>really</i> weird anachronism.

In assembly language zero-based indexing makes perfect sense, because the index is actually an offset from the base address.  C, being intended as a slightly-higher-level portable assembly language, maintained this convention as a way of keeping old-school assembly hackers happy (and to support the perpetual question of whether indexing an array is faster or slower than pointer arithmetic, of course).  That (to my mind) was still reasonable, because you simply can't be an effective C programmer without understanding memory management at a low enough level that this makes perfect sense.

The strange part is that in today's far-higher-level languages there's no need to index from zero, and in fact indexing from zero is a point of confusion for new programmers.  A new programmer learning Python may never understand the hardware at a low enough level to recognize that an array index is an offset from an address (and in my experience lots of people who <i>do</i> have the hardware background to understand this never manage to make the connection).

So why do we still index from zero?  Why, because we're used to it!  A new language with collections indexed from one would be instantly regarded as a toy by most established coders -- look at how 'pro' coders regard VisualBasic (not that there aren't plenty of other, more valid, things to criticize about VB).  So new languages index from zero to keep the established coders happy, or they fail to index from zero and the established coders never look at them and they die off.  New programmers are eventually conditioned to think that indexing from zero is just the natural way to do things, and sooner or later the cycle repeats.

But you have to wonder: how many people out there would be entirely capable of getting good work done in Python or Ruby or whatever were it not for this single little nit?  I know there are decent programmers out there who always allocate one array space more than they need and simply ignore index zero, and it's not totally clear to me that these people are any worse at their job if you ignore their indexing eccentricity.

I'm forced to wonder: are today's programmers unwittingly allowing their anachronistic indexing preference to render the field less accessible to newcomers?  Are we selling out the next generation?

How do you solve this problem?  Obviously just launching a language with one-based indexing will fix exactly nothing, because nobody's going to use such a language.  The only real solution I can see is to launch a language with no indexing.  The <code>foreach</code> constructs that are showing up in more and more languages are a good first step, but they have a few problems, mainly that they're an all-or-nothing affair.  It's hard to imagine a <code>foresome</code> construct that works as intuitively.

Iterators are another solution, but they're still not perfect.  First, an iterator is a very abstract object, as objects go.  'The current state of the process of iterating over the contents of a collection' isn't something most people can think of as a 'thing', and for better or for worse people prefer to model objects as nouns (at least in <a href="http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html">most kingdoms</a>).  Iterators are a complex and abstract concept and many programmers find them baffling.  And even after you've got the concept down, iterators can still make for some really hairy code:
<pre><code>for_each( c.begin( ), find_if( c.begin( ), c.end( ) SomePredicate( ) ), SomeFunctor( ) )</code></pre>
Doesn't exactly roll off the tongue, does it?

So what's the answer?  Probably to do what we (where by 'we' I mean 'people who are smarter than me') are already doing -- leave our arrays zero-indexed to keep compatibility with the installed base of programmer-brains, and keep searching for cleaner syntax to describe declarative array iteration.  In the mean time, train new programmers to think in terms of <code>map</code> and <code>reduce</code> instead of in terms of looping, which probably means functional programming at an early age, and try to move that way ourselves.
