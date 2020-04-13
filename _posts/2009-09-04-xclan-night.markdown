---
title: "Xclan Night"
date: 2009-09-04 00:37:59 -0400
redirect_from:
  - /archives/2009/09/xclan_night.shtml
legacy_url: http://seankerwin.org/archives/2009/09/xclan_night.shtml
---
Still a work in progress, but pretty cool looking already in my rarely-humble opinion. The trick is to dim the red and green components while leaving the blue intact.  

[![Xclan screenshot 1](/assets/xclan-night-9-4-09.png)](/assets/xclan-night-9-4-09.png)  
[![Xclan screenshot 2](/assets/xclan-night-9-4-09b.png)](/assets/xclan-night-9-4-09b.png)  

I'm trying to decide the best way to show text bubbles. Everything's pretty scrupulously iPhone-friendly this time around (that's actually what got me started on Xclan again, figuring out how to work with UDP CFSockets in a run loop), but as I understand it uploading new text textures every few frames will bog an iPhone down pretty quickly. I'm thinking of switching my NSOpenGLView to a CAOpenGLLayer and putting a bunch of CATextLayers on top for the bubbles.  

There's actually an NSTextField in a layer in the game window; on Leopard it floats above the NSOpenGLView, but in Snow Leopard (where the screen shots were taken) it's invisible. I haven't pursued it because I was planning on replacing the OGL view with a layer anyway, but it's a strange difference.
