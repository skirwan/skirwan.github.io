---
title: "Stupid Cocoa Tricks"
date: 2007-10-14 23:15:21 -0400
redirect_from:
  - /archives/2007/10/stupid_cocoa_tr.shtml
legacy_url: http://seankerwin.org/archives/2007/10/stupid_cocoa_tr.shtml
---
Cocoa can often be disappointing if you're used to richer languages (or even just richer libraries) -- sometimes it feels like you're spending all your time writing loops to accomplish things that that really should be supported by the library. To some extent that promised Objective-C 2.0 improvements should help, but there are a lot of things available now that I'd wager 99% of the Cocoa-coding public don't know about.  

For instance, the Xclan players window lets you see a simple list of players, or a list grouped by clan or profession (visually it looks like the new style source list found in the latest iLife apps). The data for this is simply an `NSArray` containing `NSDictionary` objects specifying the info for players. So given that data structure, how do you list the clans of all the online players?  

`  
[playersArray valueForKey:@"Clan"]  
`  

That's pretty basic. Calling `valueForKey` is similar to calling `map( )` in other languages; it returns the array of the results of calling `valueForKey` on each member individually. It's not defined in NSArray.h, but in NSKeyValueCoding.h as a category, and as a result you'll never find it if you're not looking _really_ hard. Kinda makes me wish Xcode had code completion that's not a total joke.  

Of course, that's not very useful code in itself, because it won't eliminate duplicates. If there are two folks from the same clan online and you're trying to draw them grouped by clan, an array that has that clan in it twice isn't very useful. Which is why you want to do this:  

`  
**[[NSSet setWithArray:**[playersArray valueForKey:@"Clan"]**] allObjects]**  
`  

`NSSet` is probably the neatest Cocoa class that never gets used. Or maybe it just seems that way to me because I've spent the last week optimizing a set implementation in C# (and if anyone thinks a week seems long for that, well, try doing a multithreaded set intersection and ring me back when you've got it working flawlessly). I'm not sure how Apple's is implemented (I can haz [treap](http://en.wikipedia.org/wiki/Treap)?) but in this particular case all I need it to do is enforce uniqueness, so I'm cool.  

The order of the objects returned by `NSSet`'s `allObjects` method doesn't seem to be guaranteed to be anything useful, so just to be safe we should follow that last snippet up with a sort:  

`  
**[**[[NSSet setWithArray:[playersArray valueForKey:@"Clan"]] allObjects] **sortedArrayUsingSelector:@selector(compare:)]**  
`  

But, final wrinkle, `playersArray` contains an entry for every character we've ever seen (so we can cache their information and save notes), and online/offline status is determined by an entry in that character's dictionary. Ideally our list of clans should only reflect clans that have at least one member online -- how can we do that?  

`  
**playersArray = [playersArray filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"SELF.Online == 'YES'"]];**  
[[[NSSet setWithArray:[playersArray valueForKey:@"Clan"]] allObjects] sortedArrayUsingSelector:@selector(compare:)];  
`  

`NSPredicate` was added with CoreData and not particularly well-documented outside of that context, but it adds a category method to `NSArray`, `filteredArrayUsingPredicate` that adds a degree of expressiveness to arrays that Cocoa hasn't had before. The format string for an NSPredicate uses a minimal language based around key-value coding, so it can introspect arbitrarily into KVC-compatible objects stored in the array -- think of it like doing a SQL-style query against your in-memory data structures.  

\---  

Anyhoo, that's some neat stuff you can do with Cocoa that (a) lots of people don't know about (b) isn't particularly well-documented.
