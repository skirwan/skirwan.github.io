---
title: "Fun, Fun, Fun"
date: 2003-09-18 17:26:00 -0400
redirect_from:
  - /archives/2003/09/fun_fun_fun.shtml
legacy_url: http://seankerwin.org/archives/2003/09/fun_fun_fun.shtml
---
It may be a side-effect of the general mental sickness that seems to define so much of my personality, but I'm actually enjoying this whole server configuration/administration thing. I beleive I've got [Apache](http://www.apache.org/) doing name-based virtual hosting now, which means that I could in theory generate a plethora of subdomains to hamstergeddon.dyndns.org. Such as, for instance, [domeign.hamstergeddon.dyndns.org](http://domeign.hamstergeddon.dyndns.org/), which will someday be the home of my longest-running project ever.

Domeign is my working title for an online game I've been working on, on-and-off, for nearly five years now. The (current) basic gist of the project is that it's a highly distributed multi-user online environment, geared towards simulating a complex world based on several basic first prinicples. Specifically, instead of having explicit code for creating an in-game object, the object would be created by other in-game objects and would basically represent a chunk of raw code that the game's virtual machine would execute according to the 'laws' of the game world.

I'm simplifying things a bit in this explanation, but I think anyone with much programming knowledge will probably see what I'm getting at. Obviously the big challenge here is in defining a virtual machine within which any arbitrary chunk of data can be treated as a program and executed without fatal errors.

I think I'm getting there, slowly.
