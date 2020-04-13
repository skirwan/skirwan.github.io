---
title: "If Only I Could Write Cocoa in Visual Studio..."
date: 2008-03-09 00:41:29 -0500
redirect_from:
  - /archives/2008/03/if_only_i_could.shtml
legacy_url: http://seankerwin.org/archives/2008/03/if_only_i_could.shtml
---
The new version of Xcode included with the iPhone SDK has a nifty new feature that causes the autocompletion placeholders to display in a more integrated fashion. When using Xcode autocomplete Objective-C message parameters end up in source in the form `"<#(NSStringCompareOptions)options#>"`; now those surrounding tags are omitted and the whole placeholder is displayed as a single encapsulated item, similarly to email addresses in Mail.app.  

Unfortunately, the old way of doing things had one big benefit: I could command-double-click on `NSStringCompareOptions` to jump straight to the declaration of that symbol in NSString.h, which is really the only way I could ever remember that `NSAnchoredSearch` is the setting I need to make this particular line work properly.  

On the one hand, I'm glad to see Apple working on features that compete more directly with Intelliesense, and I've got to think that that's exactly what integrating placehodlers into the text renderer is meant to be. On the other hand, this pretty-but-not-terribly-useful feature has now broken something I used to use regularly and have often found myself wishing Visual Studio did.  

Whoops.
