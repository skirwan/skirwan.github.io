---
title: "Adapative Post Listings"
date: 2004-02-21 01:47:00 -0500
redirect_from:
  - /archives/2004/02/adapative_post.shtml
legacy_url: http://seankerwin.org/archives/2004/02/adapative_post.shtml
---
You'll note the new site design is live, more-or-less. Style switching is nonfunctional and will remain that way until I update the alternate styles, while the archives are under development and should be completed soon. I suppose I shouldn't have gone live till all the pieces were ready, but I was bored and it's not like anybody's going to complain.

An interesting challenge came up in writing the by-category archive template. I wanted to list all entries for that category, with the first ten showing up in the nifty little preview boxes from the front page and the remainder just being in a list. You can see what I'm talking about [here](http://hamstergeddon.dyndns.org/archives/journal.shtml), the current in-progress journal entry list. I've decided to call this 'adaptive listings', for the simple reason that I can't think of anything else to call it.

You'd think could just do something like this:

```
<MTEntries lastn="10">  
(Code for the large display)  
</MTEntries>  

<MTEntries offset="10">  
(Code for the small display)  
</MTEntries>
```

But that won't work; the lower list will duplicate the first ten entries displayed in the upper list, because for some dumb reason the `offset` code only works in the prescence of the `lastn` code. Of course you could just put in a very large number for `lastn` and assume you'll never have more posts than that in the category, but that's the sort of _simple_ ugly hack for which I simply will not stand.

Anyway, the following ugly snippet does what I want in a sufficiently scalable fashion that I feel comfortable using it:

```
<MTSetVar name="displayed" value="0">  
<!-- count how many posts we've shown -->  

<ul id="entrypreviewlist">  

<!-- for every entry -->  
<MTEntries>  

<!-- open either a full or condensed 'li' -->  
<MTSwitch value="\[MTGetVar name='displayed'\]">  
<MTSwCase value="ENOUGH">  
<li class="<$MTEntryCategory$>shrunk">  
</MTSwCase>  

<MTSwDefault>  
<li class="<$MTEntryCategory$>">  
</MTSwDefault>  
</MTSwitch>  

<!-- title is a link for condensed items -->  
<MTSwitch value="\[MTGetVar name='displayed'\]">  
<MTSwCase value="ENOUGH">  
<h3 class="subtitle">  
<a href="<$MTEntryPermalink$>">  
<$MTEntryTitle smarty\_pants="1"$>  
</a>  
</h3>  
</MTSwCase>  

<MTSwDefault>  
<h3 class="subtitle"><$MTEntryTitle smarty\_pants="1"$></h3>  
</MTSwDefault>  
</MTSwitch>  

<!-- The Attribution Line Was Here -->  

<!-- show this entry, advance the counter -->  
<MTSwitch value="\[MTGetVar name='displayed'\]">  
<MTSwCase value="0">  
<MTSetVar name="displayed" value="1">  
<p><$MTEntryExcerpt convert\_breaks="0" smarty\_pants="1"$></p>  
<a href="<$MTEntryPermalink$>">Read This Post</a>  
</MTSwCase>  

<MTSwCase value="1">  
<MTSetVar name="displayed" value="2">  
<p><$MTEntryExcerpt convert\_breaks="0" smarty\_pants="1"$></p>  
<a href="<$MTEntryPermalink$>">Read This Post</a>  
</MTSwCase>  

<MTSwCase value="2">  
<MTSetVar name="displayed" value="3">  
<p><$MTEntryExcerpt convert\_breaks="0" smarty\_pants="1"$></p>  
<a href="<$MTEntryPermalink$>">Read This Post</a>  
</MTSwCase>  

<!-- And so one, you see the pattern -->  

<!-- After showing nine entries, we've shown 'ENOUGH' -->  
<MTSwCase value="9">  
<MTSetVar name="displayed" value="ENOUGH">  
<p><$MTEntryExcerpt convert\_breaks="0" smarty\_pants="1"$></p>  
<a href="<$MTEntryPermalink$>">Read This Post</a>  
</MTSwCase>  

<!-- no default case: we do nothing once we've counted enough -->  

</MTSwitch>  

<!-- close the open tags -->  
</li>  
</MTEntries>  
</ul>
```

Of course my actual template is formatted such that the resulting HTML file ends up looking nice, but it's easier to read this way. The code for the attribution line isn't included in the snippet above because it's not really pertinent to this process. Also, the attribution line has another `MTSwitch` block in it and makes things even harder to read.

As with my [other MT template snippet](http://hamstergeddon.dyndns.org/archives/2004/02/19/alternating_colors_in_mt.shtml), this is the kind of thing that makes most fairly up-to-date programmers roll their eyes, or sometimes run screaming. MT's template markup is primitive by sufficiently rich that most things can be done provided you're willing to suffer. Think of it this way: as Perl is to C++, MT template tags are to assembly.

That said, I'm _sure_ there's a better way to do this. _Absolutely positive_. But I can't come up with it, short of writing a plugin. And those have to be written in Perl, and that's the sort of thing that makes _me_roll my eyes and/or run screaming.
