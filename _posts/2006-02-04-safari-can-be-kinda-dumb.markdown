---
title: "Safari Can Be Kinda Dumb"
date: 2006-02-04 18:08:00 -0500
redirect_from:
  - /archives/2006/02/safari_can_be_k.shtml
legacy_url: http://seankerwin.org/archives/2006/02/safari_can_be_k.shtml
---
So I updated the server to 10.4 today (plus every last security update, so don't even bother). Things went about as well as could be expected; I had to reconfigure Apache and Postfix, I had to [keep MySQL and PHP talking](http://www.macosxhints.com/article.php?story=20060111113313511), a few things didn't 'stick' until I toggled them off and on a few times (including, bewilderingly, sshd).

The most surprising part of the whole experience wasn't anything on the server at all, it was Safari on my soon-to-be-replaced PowerBook.

Immediately after getting things partially back up, I pulled out my laptop and checked various things out, including Movable Type. Because the various document roots weren't configured yet, Safari was understandably unable to load the images, CSS files, and JavaScript files used in the MT user interface. That's pretty easy to forgive, seeing as the fault was with the server.

The strangeness came after the server was properly reconfigured: when I logged in to MT on my laptop, everything still looked like garbage. When I brought up the activity window (cmd-opt-a), 90% of it wasn't loaded! And yet when I opened a new browser window and typed in the URL to that resource, it loaded just fine. If I hit the reload button enough, eventually a single page of the MT UI would start to look okay -- except the next page would be back to looking like crap, unable to find the same blasted CSS file I had just managed to convince the previous page to load.

I'm still not really sure where the problem is. It could be that Safari is checking the revision dates from headers and deciding that the the 404 error pages it saw last time are still current, it could be that Safari's cache is just stupid, it could be that Safari's cache on this particular computer is corrupted...

Very odd. I finally broke down and emptied the cache, and now all is right with the world -- except for the fact that everything loads slowly and will continue to do so for a few weeks at least.

Sigh.
