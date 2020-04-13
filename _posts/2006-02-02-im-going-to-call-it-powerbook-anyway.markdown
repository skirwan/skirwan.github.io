---
title: "I'm Going To Call It PowerBook Anyway"
date: 2006-02-02 02:44:00 -0500
redirect_from:
  - /archives/2006/02/im_going_to_cal.shtml
legacy_url: http://seankerwin.org/archives/2006/02/im_going_to_cal.shtml
---
<p>I just placed my order for a <a href="http://www.apple.com/macbookpro/">MacBook Pro</a>.</p>

<p>I don't expect to see it before early March, so I doubt I'll get the chance to claim the <a href="http://windowsxp.onmac.net/The%20Contest.html">nearly $10K</a> bounty on Windows XP compatibility, which is sad.</p>

<p>Listening to some of the clamor about this, I'm forced to the conclusion that a lot of people are just very, very dumb.  For instance, <a href="http://neosmart.net/blog/dual-booting-windows-xp-on-a-macbook/">this post</a> by some guy nobody's ever heard of is being hailed like it's the second coming or something... but it's really kinda silly.</p>

<p>Like, for instance, step nine -- "Use the Bootable Vista DVD to boot on the MacBook".  The far more clever folks at <a href="http://arstechnica.com/index.ars">Ars Technica</a> <a href="http://arstechnica.com/reviews/hardware/imac-coreduo.ars/7">already tried that</a>.  You can't boot from a DVD that the computer won't boot from.</p>

<p>That's just the most glaring. Step 16 is the sort of thing I'd expect to find in a business plan written by <a href="http://en.wikipedia.org/wiki/Underpants_Gnomes">underpants gnomes</a> -- It's like writing "and then a miracle occurs" when you're detailing a chemical reaction.  Step eight is just as dumb as step nine, unless you assume he means to do that on a separate PC... but if you're doing all this on a separate PC you might as well just boot from another drive and do this all booted in Windows or some flavor of Linux.</p>

<p>The first step to figuring all this out would be getting an open source bootloader (probably grub) working.  Worrying about faking MBRs and chaining unperfected bootloaders from beta operating systems is putting the cart before the horse.  The (Intel) man pages for hdiutil, bless, and nvram would be helpful, and I'm rather dismayed they haven't shown up on the web yet.</p>

<p>Ah well.  I'd rather have something like QEMU anyway -- dual-booting is such a pain.</p>
