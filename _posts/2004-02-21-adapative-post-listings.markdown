---
title: "Adapative Post Listings"
date: 2004-02-21 01:47:00 -0500
redirect_from:
  - /archives/2004/02/adapative_post.shtml
legacy_url: http://seankerwin.org/archives/2004/02/adapative_post.shtml
---
<p>You'll note the new site design is live, more-or-less.  Style switching is nonfunctional and will remain that way until I update the alternate styles, while the archives are under development and should be completed soon.  I suppose I shouldn't have gone live till all the pieces were ready, but I was bored and it's not like anybody's going to complain.</p>

<p>An interesting challenge came up in writing the by-category archive template.  I wanted to list all entries for that category, with the first ten showing up in the nifty little preview boxes from the front page and the remainder just being in a list.  You can see what I'm talking about <a href="http://hamstergeddon.dyndns.org/archives/journal.shtml">here</a>, the current in-progress journal entry list.  I've decided to call this 'adaptive listings', for the simple reason that I can't think of anything else to call it.</p>

<p>You'd think could just do something like this:</p>

<div class="code">
&lt;MTEntries lastn="10"&gt;
    (Code for the large display)
&lt;/MTEntries&gt;

&lt;MTEntries offset="10"&gt;
    (Code for the small display)
&lt;/MTEntries&gt;
</div>

<p>But that won't work; the lower list will duplicate the first ten entries displayed in the upper list, because for some dumb reason the <span class="code">offset</span> code only works in the prescence of the <span class="code">lastn</span> code.  Of course you could just put in a very large number for <span class="code">lastn</span> and assume you'll never have more posts than that in the category, but that's the sort of <i>simple</i> ugly hack for which I simply will not stand.</p>

<p>Anyway, the following ugly snippet does what I want in a sufficiently scalable fashion that I feel comfortable using it:</p>

<div class="code">
&lt;MTSetVar name="displayed" value="0"&gt;
&lt;!-- count how many posts we've shown --&gt;

&lt;ul id="entrypreviewlist"&gt;

&lt;!-- for every entry --&gt;
&lt;MTEntries&gt;

&lt;!-- open either a full or condensed 'li' --&gt;
&lt;MTSwitch value="[MTGetVar name='displayed']"&gt;
    &lt;MTSwCase value="ENOUGH"&gt;
        &lt;li class="&lt;$MTEntryCategory$&gt;shrunk"&gt;
    &lt;/MTSwCase&gt;
    
    &lt;MTSwDefault&gt;
        &lt;li class="&lt;$MTEntryCategory$&gt;"&gt;
    &lt;/MTSwDefault&gt;
&lt;/MTSwitch&gt;

&lt;!-- title is a link for condensed items --&gt;
&lt;MTSwitch value="[MTGetVar name='displayed']"&gt;
    &lt;MTSwCase value="ENOUGH"&gt;
        &lt;h3 class="subtitle"&gt;
            &lt;a href="&lt;$MTEntryPermalink$&gt;"&gt;
                &lt;$MTEntryTitle smarty_pants="1"$&gt;
            &lt;/a&gt;
        &lt;/h3&gt;
    &lt;/MTSwCase&gt;
    
    &lt;MTSwDefault&gt;
        &lt;h3 class="subtitle"&gt;&lt;$MTEntryTitle smarty_pants="1"$&gt;&lt;/h3&gt;
    &lt;/MTSwDefault&gt;
&lt;/MTSwitch&gt;

&lt;!-- The Attribution Line Was Here --&gt;

&lt;!-- show this entry, advance the counter --&gt;
&lt;MTSwitch value="[MTGetVar name='displayed']"&gt;
    &lt;MTSwCase value="0"&gt;
        &lt;MTSetVar name="displayed" value="1"&gt;
        &lt;p&gt;&lt;$MTEntryExcerpt convert_breaks="0" smarty_pants="1"$&gt;&lt;/p&gt;
        &lt;a href="&lt;$MTEntryPermalink$&gt;"&gt;Read This Post&lt;/a&gt;
    &lt;/MTSwCase&gt;
    
    &lt;MTSwCase value="1"&gt;
        &lt;MTSetVar name="displayed" value="2"&gt;
        &lt;p&gt;&lt;$MTEntryExcerpt convert_breaks="0" smarty_pants="1"$&gt;&lt;/p&gt;
        &lt;a href="&lt;$MTEntryPermalink$&gt;"&gt;Read This Post&lt;/a&gt;
    &lt;/MTSwCase&gt;

    &lt;MTSwCase value="2"&gt;
        &lt;MTSetVar name="displayed" value="3"&gt;
        &lt;p&gt;&lt;$MTEntryExcerpt convert_breaks="0" smarty_pants="1"$&gt;&lt;/p&gt;
        &lt;a href="&lt;$MTEntryPermalink$&gt;"&gt;Read This Post&lt;/a&gt;
    &lt;/MTSwCase&gt;
    
    &lt;!-- And so one, you see the pattern --&gt;
    
    &lt;!-- After showing nine entries, we've shown 'ENOUGH' --&gt;
    &lt;MTSwCase value="9"&gt;
        &lt;MTSetVar name="displayed" value="ENOUGH"&gt;
        &lt;p&gt;&lt;$MTEntryExcerpt convert_breaks="0" smarty_pants="1"$&gt;&lt;/p&gt;
        &lt;a href="&lt;$MTEntryPermalink$&gt;"&gt;Read This Post&lt;/a&gt;
    &lt;/MTSwCase&gt;

    &lt;!-- no default case: we do nothing once we've counted enough --&gt;
    
&lt;/MTSwitch&gt;

&lt;!-- close the open tags --&gt;
&lt;/li&gt;
&lt;/MTEntries&gt;
&lt;/ul&gt;
</div>

<p>Of course my actual template is formatted such that the resulting HTML file ends up looking nice, but it's easier to read this way.  The code for the attribution line isn't included in the snippet above because it's not really pertinent to this process.  Also, the attribution line has another <span class="code">MTSwitch</span> block in it and makes things even harder to read.</p>

<p>As with my <a href="http://hamstergeddon.dyndns.org/archives/2004/02/19/alternating_colors_in_mt.shtml">other MT template snippet</a>, this is the kind of thing that makes most fairly up-to-date programmers roll their eyes, or sometimes run screaming.  MT's template markup is primitive by sufficiently rich that most things can be done provided you're willing to suffer.  Think of it this way: as Perl is to C++, MT template tags are to assembly.</p>

<p>That said, I'm <i>sure</i> there's a better way to do this.  <i>Absolutely positive</i>.  But I can't come up with it, short of writing a plugin.  And those have to be written in Perl, and that's the sort of thing that makes <i>me</i>roll my eyes and/or run screaming.</p>
