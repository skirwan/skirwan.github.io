---
title: "Thoughts on the iPhone SDK"
date: 2008-03-07 02:47:12 -0500
redirect_from:
  - /archives/2008/03/thoughts_on_the.shtml
legacy_url: http://seankerwin.org/archives/2008/03/thoughts_on_the.shtml
---
*   It's going to feel much more like 'real' Cocoa once they've got Interface Builder in the mix.  Building a UI programmatically feels incredibly primitive - even more so than building a web page, in fact, because there at least you have the ability to add the main elements and then tweak them in CSS.  As of right now, I'm spending far more time on the UI than I'd really like.
*   The lack of CoreData doesn't really bother me, but then I'm pretty handy with SQL.  I can see this being annoying for some people.
*   The $99 fee to get a signing certificate is reasonable, but personally it's annoying because it means that if I want to produce - for example - iClan Touch, I have to either charge for it or eat the expense myself.
*   In removing CoreData they've also removed NSPredicate, and with it filteredArrayUsingPredicate:, one of my favorite NSArray categories.  Which, you know, sucks.

So at the moment I'm trying to build iClan Touch as a simple teeth-whetting exercise.  After that I may have to see how much of Clieunk/Xclan is salvageable on the new platform - watching the demos from the SDK announcement event today gave me a few ideas for how to make Clan Lord work in a touch-based UI.
