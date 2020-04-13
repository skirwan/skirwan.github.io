---
title: "Visual Studio and Virtual PC"
date: 2006-02-16 15:54:00 -0500
redirect_from:
  - /archives/2006/02/visual_studio_a.shtml
legacy_url: http://seankerwin.org/archives/2006/02/visual_studio_a.shtml
---
I'm currently taking a course in .NET programming. It's an interesting experience in a number of ways, and I really ought to stop being lazy and write about them.

Until then, if any other Mac user out there in Google-land is using Visual Studio .NET 2005 in Windows 2000 under Virtual PC 6.1, the trick to stop the random crashes is to disable the 'vshost' debugging introduced in VS.NET 2005. Just bring up the project properties, go to the 'Debug' pane, and uncheck 'Enable the Visual Studio hosting process'.

VSHost sounds quite a lot like the 'fix and continue' feature Apple added to Xcode a few versions back. It seems to work just about as well.
