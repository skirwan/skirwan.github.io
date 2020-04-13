---
title: "Curing Parallels Desktop's Key Lag"
date: 2007-07-27 16:20:46 -0400
redirect_from:
  - /archives/2007/07/curing_parallel.shtml
legacy_url: http://seankerwin.org/archives/2007/07/curing_parallel.shtml
---
I use a Mac at work and run Parallels so I can use Visual Studio (our code doesn't quite play nice with Mono/XSP yet, so I'm stuck with one foot in Microsoft's garden for the time being).  Visual Studio is actually a relatively nice IDE, at least in terms of the hooks it provides for customization.  I've remapped most key commands to work the way I'm used to using them on a Mac, and until today I had Parallels set to swap my command and control keys, meaning that for the most part Windows felt almost like another Mac app -- a hideously ugly Mac app with its own file system and two menu bars which was pointlessly confined to one screen, but a Mac app nonetheless.  Sort of.

The biggest problem with this solution was that the swapped control and command keys seemed to lag; if I released the command key and started typing too quickly, Windows would register the first few characters as being typed with the control key down, often to hilarious effect.  For some reason, when Parallels swaps keys it introduces keyboard latency -- <i>for those keys only</i>.  That last part is the real problem; if the whole keyboard lagged I'd probably be fine (I'm pretty well accustomed to out-typing programs, I've been doing it for quite some time).  It's a pretty glaring bug, and it renders the Parallel's key-swapping feature well-nigh useless.

But, as luck would have it, Windows has built-in keyboard remapping hooks.  I say 'hooks' instead of 'features' because I refuse to consider anything that makes me thing about endianness a 'feature'... But I digress.  Open up RegEdit and browse to <span class="code">HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout</span> (<i>not</i> Keyboard Layout<b>s</b>, right below it) and add a new binary value.

Then make it look like this:

<img src="http://seankerwin.org/scancode.gif" alt="00 00 00 00 00 00 00 00 20 00 00 00 1D 00 5B E0 00 00 00 00" /><br /><span class="code">(00 00 00 00 00 00 00 00 20 00 00 00 1D 00 5B E0 00 00 00 00)</span>

That will turn your left windows key into a left control key.  Restart Windows, turn off Parallel's key remapping, and you're good to go.
