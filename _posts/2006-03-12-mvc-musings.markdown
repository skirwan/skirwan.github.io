---
title: "MVC Musings"
date: 2006-03-12 22:21:00 -0500
redirect_from:
  - /archives/2006/03/mvc_musings.shtml
legacy_url: http://seankerwin.org/archives/2006/03/mvc_musings.shtml
---
<p>Code Musings</p>

<p>The <a href="http://seankerwin.org/Clieunk/">Clieunk Devlog</a> has some updates.  I’m trying to keep all specifically Clieunk-related stuff there, so any folks who are just interested in Clieunk don’t have to read my main blog here and put up with my occasional political ranting.  But for more general programming topics not uniquely relating to Clieunk, I figure this is a decent wall on which to write.</p>

<p><b>MVC, Cocoa, and C++</b></p>

<p>The Model/View/Controller design pattern is a common one for a very good reason: it works quite well.  Not incidentally, the entirety of Apple’s AppKit framework (Cocoa) is built with MVC in mind.  The net result is that if you’re planning to write good Mac <acronym title="Operating System">OS</acronym> X software you should at least understand the basics of MVC.</p>

<p>The problem here is that while Objective-C (the preferred language for Cocoa development) is excellent for view and controller classes, it has some rather serious shortcomings with respect to models.</p>

<p><b>Not My Type</b></p>

<p>If you had to sum up C++ in three words, I’d suggest that they be “strong type checking”.  C++ has about the strictest typing of any of the popular mainstream languages, as well as a rich gallery of language features — most notably templates, the <span class="code">const</span> specifier, and a rich and well-defined set of object operators — that support this paradigm.  The end result is that C++ is absolutely incredible for defining data types, but sometimes a bit of a pain for designing other things.</p>

<p><b>How I Learned to Stop Worrying And Love Objective-C++</b></p>

<p>Objective-C++ is the best of both worlds, with a few caveats.  Firstly, it kills bindings, which are a really nice language feature but can’t be made to bridge between C++ models and Cocoa views.  Secondly, you lose (to some extent) the extensibility that makes Cocoa so truly neat to work with — you can load a bundle into an Objective-C++ application and tinker with the Cocoa code (headers  often provided via <a href="http://www.codethecode.com/Projects/class-dump/">class-dump</a>) but you can’t easily affect the C++ model classes.  I ultimately decided that neither one of these drawbacks bothered me overmuch for Clieunk, obviously.</p>

<p>Bindings would be nice in the early stages of the project, but since nearly every view in the program will be a custom job eventually, the net gains aren’t as huge as they might seem.  All the same, it would be very cool if someone could figure out a way to bind an <span class="code">NSTableView</span> to a <span class="code">std::vector&lt;std:string&gt;</span>, for instance.</p>

<p>The second drawback, upon further consideration, actually turned out to be a benefit.  The reason I haven’t gone and posted Pixunk (my CL_Images browser) publicly is because I’m reasonably sure Ann would start to actively make my life miserable if I did so, and I have no desire to fight a war at this juncture.  If Clieunk were written entirely in Objective-C, it would be fairly straightforward to turn it into an image browser simply by creating an input manager that attaches to it.  This will probably still be possible in an Objective-C++ Clieunk, but the work required to do such a thing is on the same order of magnitude as just figuring out the image file format and writing a browser from scratch, so I wouldn’t feel too bad.</p>

<p><b>I’ve Got a Unit Test For You</b></p>

<p>I feel I’d be remiss in cheerleading for strong typing without responding to the recent popular meme about unit testing being superior to strong typing, as exemplified in a widely read <a href="http://www.artima.com/intv/strongweakP.html">interview with the creator of Python</a>.  And I <i>would</i> be remiss, so I’ll write about that sometime soon.</p>

<p>My position, in a nutshell, is that preferring unit testing to strong typing is like preferring seat belts to an airbag: firstly, I really would rather have both; and secondly, stupid people can choose not to use the first, but the latter is basically forced upon them.  More next time, maybe.</p>
