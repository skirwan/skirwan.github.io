---
title: "Web Stylunk: Palette-Recoloring Sprites with HTML5"
date: 2011-12-21 16:05:00 -0500
redirect_from:
  - /archives/2011/12/web_stylunk_palette-recoloring.shtml
legacy_url: http://seankerwin.org/archives/2011/12/web_stylunk_palette-recoloring.shtml
---
**Quick background info,** _or_ **'what the hell is a Stylunk?'**

I play [Clan Lord](http://clanlord.com), a multiplayer online RPG. Clan Lord provides a lot of ways for players to customize their characters' appearance, including a system for changing shirt and pants colors with an algorithmic dye and bleach system. Experimenting with dyes and bleaches in-game can be prohibitive — each application consumes in-game currency and (often rare) materials. As a result, there's a long tradition of external dye-simulation tools; the earliest was Stylus (named in the 'function-us' pattern of many Clan Lord NPCs), followed by Stylos, the OS X re-imagining of Stylus. Stylos didn't work well on Mac OS X 10.4 Tiger, so in 2005 I built the first version of Stylunk as a replacement.

Since then the number one Stylunk-related request has been for a Windows version, and the number two request is 'hey, add this new shirt color!'. Both of which were difficult enough to fill that they happened never (Windows version) and only intermittently. So I've decided to simplify cross-platform concerns and centralize updating by turning Stylunk into a web app. The beta is [right here](/stylunk-beta/).

[![Stylunk Screenshot](/assets/stylunk-screenshot.png)](/stylunk-beta/)

**Palettized recoloring in JavaScript** _or_ **'the actual non-background stuff about which I plan to write'**

I started playing Clan Lord in 1998 and it had already been in development for a while at that point, so it shouldn't be a surprise that the tech isn't exactly modern. Images in Clan Lord are an run-length-encoded list of indices into a per-image color map, which itself contains indices into the 'Mac standard' 256 color map. That's all pretty integral to Clan Lord, because character customization is implemented as a set of 20 color overrides for the per-image colormap: indices zero and one contain the highlight and shadow colors for the character's hair, for instance.

Images for a particular icon are arranged into a single 16x3 sprite sheet, comprising the 32 standing/walking/running sprites in eight cardinal directions as well as a 'dead' sprite and fifteen 'poses' that players can activate to emote. Here's what the 'Ghorak Zo' sprite sheet looks like:

[![Ghorak Zo Sprite Sheet](/assets/zo-sprite-sheet-shrunk.png)](/assets/zo-sprite-sheet.png)

My first stab at implementing web Stylunk was about what you'd expect: I converted each of the sprite sheets into PNG files and wrote code that draws the selected sprite into a canvas, iterates across the pixels, and replaces the 'default' colors with the mapped values calculated from the current UI selection. Then I created a smaller canvas, copied the frame I needed from the large canvas to the small canvas, and used `toDataURL()` to extract something that I could stick into the `background-image` of my buttons.

It all worked fairly well, at least at first. On my main machine (a Core i7 Mac Mini) everything was peachy. On my MacBook Air, it was sluggish. On my iPad... well, the less said the better.

My immediate response was to try some very aggressive caching, leading to the creation of a [reusable JavaScript least-recently-used cache](/archives/2011/12/a_simple_javascript_least-rece.shtml). That helped, but not as much as I'd hoped.

My next thought was: I'm doing more work than I need to: there's no point colorizing the entire sprite sheet and then only displaying a single frame of it. So I swapped things around; first extract a small canvas from the larger, _then_ recolor only the smaller canvas. That helped too, but it was still pretty logey on the iPad.

Unfortunately there's no way to profile JavaScript in MobileSafari. But desktop Safari _does_ have a profiler, and it showed something interesting: the slowest part of the process was reading the pixels out of the initial canvas. So I took a cue from Clan Lord and took a step back in time: instead of storing the images as PNG sprite sheets, I wrote a tool that converts each frame of the sheet into a JavaScript data structure containing a run-length encoded bunch of pixel indices. That way I can skip the 'reading from canvas' step, and jump straight to writing them. I also took the step of storing each frame as a separate JavaScript file which the main app loads on-demand via `XMLHttpRequest`, which simplifies the caching a lot by letting the browser do the work.

If you're curious, you can take a look at the code for a sprite [here](/stylunk-beta/sprite-js-2/453/0_0.js). That's my JS-encoded version of the male Ghorak Zo facing east — the top-left sprite in the image above. Yup! — despite being larger than a PNG representation or the same image, and despite needing to be parsed by the JavaScript engine, it _still_ ends up being faster than reading data back from a canvas.

The end result is that Stylunk runs at a usable speed on my iPad (first-gen) and on my iPhone 4, which is good enough for me. There are still some minor inefficiencies as a result of the tortured path to the current architecture — if I were doing this from scratch there would also be JavaScript representations of the character color maps, which would simplify the color mapping process and also allow me to easily draw characters using the color map data from the [XML data feed](http://deltatao.com/clanlord/status/cldata.xml) powering [the Clan Lord Informer](http://deltatao.com/clanlord/status/) and [iClan](/iclan/).

I'm actually half-tempted to do that, because it would provide a starting point for building a [Socket.IO](http://socket.io/)\- and [Node.js](http://nodejs.org/)\-powered HTML5 Clan Lord client. But that's a headache for another day.
