---
title: "Web Stylunk: Palette-Recoloring Sprites with HTML5"
date: 2011-12-21 16:05:00 -0500
redirect_from:
  - /archives/2011/12/web_stylunk_palette-recoloring.shtml
legacy_url: http://seankerwin.org/archives/2011/12/web_stylunk_palette-recoloring.shtml
---
<p><b>Quick background info,</b> <i>or</i> <b>'what the hell is a Stylunk?'</b></p>

<p>I play <a href="http://clanlord.com">Clan Lord</a>, a multiplayer online RPG.  Clan Lord provides a lot of ways for players to customize their characters' appearance, including a system for changing shirt and pants colors with an algorithmic dye and bleach system.  Experimenting with dyes and bleaches in-game can be prohibitive &mdash; each application consumes in-game currency and (often rare) materials.  As a result, there's a long tradition of external dye-simulation tools; the earliest was Stylus (named in the 'function-us' pattern of many Clan Lord NPCs), followed by Stylos, the OS X re-imagining of Stylus.  Stylos didn't work well on Mac OS X 10.4 Tiger, so in 2005 I built the first version of Stylunk as a replacement.</p>

<p>Since then the number one Stylunk-related request has been for a Windows version, and the number two request is 'hey, add this new shirt color!'.  Both of which were difficult enough to fill that they happened never (Windows version) and only intermittently.  So I've decided to simplify cross-platform concerns and centralize updating by turning Stylunk into a web app.  The beta is <a href="http://seankerwin.org/stylunk-beta/">right here</a>.</p>

<p style="text-align:center;"><a href="http://seankerwin.org/stylunk-beta/"><img src="http://seankerwin.org/images/stylunk-screenshot.png" width="520" height="483" alt="Stylunk Screenshot" /></a></p>

<p><b>Palettized recoloring in JavaScript</b> <i>or</i> <b>'the actual non-background stuff about which I plan to write'</b></p>

<p>I started playing Clan Lord in 1998 and it had already been in development for a while at that point, so it shouldn't be a surprise that the tech isn't exactly modern.  Images in Clan Lord are an run-length-encoded list of indices into a per-image color map, which itself contains indices into the 'Mac standard' 256 color map.  That's all pretty integral to Clan Lord, because character customization is implemented as a set of 20 color overrides for the per-image colormap: indices zero and one contain the highlight and shadow colors for the character's hair, for instance.</p>

<p>Images for a particular icon are arranged into a single 16x3 sprite sheet, comprising the 32 standing/walking/running sprites in eight cardinal directions as well as a 'dead' sprite and fifteen 'poses' that players can activate to emote.  Here's what the 'Ghorak Zo' sprite sheet looks like:</p>
<p style="text-align:center;"><a href="http://seankerwin.org/images/zo-sprite-sheet.png"><img src="http://seankerwin.org/images/zo-sprite-sheet-shrunk.png" width="500" height="93" alt="Ghorak Zo Sprite Sheet" /></a></p>

<p>My first stab at implementing web Stylunk was about what you'd expect: I converted each of the sprite sheets into PNG files and wrote code that draws the selected sprite into a canvas, iterates across the pixels, and replaces the 'default' colors with the mapped values calculated from the current UI selection.  Then I created a smaller canvas, copied the frame I needed from the large canvas to the small canvas, and used <code>toDataURL()</code> to extract something that I could stick into the <code>background-image</code> of my buttons.</p>

<p>It all worked fairly well, at least at first.  On my main machine (a Core i7 Mac Mini) everything was peachy.  On my MacBook Air, it was sluggish.  On my iPad... well, the less said the better.</p>

<p>My immediate response was to try some very aggressive caching, leading to the creation of a <a href="http://seankerwin.org/archives/2011/12/a_simple_javascript_least-rece.shtml">reusable JavaScript least-recently-used cache</a>.  That helped, but not as much as I'd hoped.</p>

<p>My next thought was: I'm doing more work than I need to: there's no point colorizing the entire sprite sheet and then only displaying a single frame of it.  So I swapped things around; first extract a small canvas from the larger, <i>then</i> recolor only the smaller canvas.  That helped too, but it was still pretty logey on the iPad.<p>

<p>Unfortunately there's no way to profile JavaScript in MobileSafari.  But desktop Safari <i>does</i> have a profiler, and it showed something interesting: the slowest part of the process was reading the pixels out of the initial canvas.  So I took a cue from Clan Lord and took a step back in time: instead of storing the images as PNG sprite sheets, I wrote a tool that converts each frame of the sheet into a JavaScript data structure containing a run-length encoded bunch of pixel indices.  That way I can skip the 'reading from canvas' step, and jump straight to writing them.  I also took the step of storing each frame as a separate JavaScript file which the main app loads on-demand via <code>XMLHttpRequest</code>, which simplifies the caching a lot by letting the browser do the work.</p>

<p>If you're curious, you can take a look at the code for a sprite <a href="http://seankerwin.org/stylunk-beta/sprite-js-2/453/0_0.js">here</a>.  That's my JS-encoded version of the male Ghorak Zo facing east &mdash; the top-left sprite in the image above.  Yup! &mdash; despite being larger than a PNG representation or the same image, and despite needing to be parsed by the JavaScript engine, it <i>still</i> ends up being faster than reading data back from a canvas.</p>

<p>The end result is that Stylunk runs at a usable speed on my iPad (first-gen) and on my iPhone 4, which is good enough for me.  There are still some minor inefficiencies as a result of the tortured path to the current architecture &mdash; if I were doing this from scratch there would also be JavaScript representations of the character color maps, which would simplify the color mapping process and also allow me to easily draw characters using the color map data from the <a href="http://deltatao.com/clanlord/status/cldata.xml">XML data feed</a> powering <a href="http://deltatao.com/clanlord/status/">the Clan Lord Informer</a> and <a href="http://seankerwin.org/iclan/">iClan</a>.</p>

<p>I'm actually half-tempted to do that, because it would provide a starting point for building a <a href="http://socket.io/">Socket.IO</a>- and <a href="http://nodejs.org/">Node.js</a>-powered HTML5 Clan Lord client.  But that's a headache for another day.</p>
