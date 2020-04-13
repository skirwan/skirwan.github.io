---
title: "Alternating Colors in MT"
date: 2004-02-19 15:20:00 -0500
redirect_from:
  - /archives/2004/02/alternating_col.shtml
legacy_url: http://seankerwin.org/archives/2004/02/alternating_col.shtml
---
<p>The new design for this site (<a href="http://hamstergeddon.dyndns.org/new_index.shtml">Front Page Preview</a>, <a href="http://hamstergeddon.dyndns.org/archives/2004/02/16/no_place_like_plrtz_glrb.shtml">Entry Page Preview</a>) is still underway, and starting to look (by my standards) rather nice.  I've grown a lot more comfortable with both CSS and MT template tags since my last rework, so I've taken the time to add some nifty things in the new version.</p>

<p>One innovation you might notice in the second preview is the coloration of the comments.  Ideally I'd like to be able to assign a name (and possibly icon) to visitors, but that's not really possible at the moment - when MT 3.0 rolls out with user registration for the comment system, that should hopefully do the trick.  In the mean time, I decided to break up the monotony by making each entry a different color in a rotating three-color set.  In theory it should be possible to do this with sibling selectors in CSS, but that would be an ugly hack: you'd have guess at the maximum number of comments you'd ever have and hard-code that many CSS rules.  Also, it wouldn't work right in Internet Explorer most of the time.  Ah, IE - it makes the web exciting!</p>

<p>The trick I went with was the following lovely bit of obfuscation:</p>

<div class="code">
&lt;MTSetVar name="color" value="1"&gt;
&lt;MTComments&gt;
  &lt;MTSwitch value="[MTGetVar name='color']"&gt;
    &lt;MTSwCase value="1"&gt;
    
    &lt;li class="firstcolor"&gt;
      &lt;MTSetVar name="color" value="2"&gt;
      
    &lt;/MTSwCase&gt;
    &lt;MTSwCase value="2"&gt;
    
    &lt;li class="secondcolor"&gt;
      &lt;MTSetVar name="color" value="3"&gt;
      
    &lt;/MTSwCase&gt;
    &lt;MTSwCase value="3"&gt;
    
    &lt;li class="thirdcolor"&gt;
      &lt;MTSetVar name="color" value="1"&gt;
      
    &lt;/MTSwCase&gt;
  &lt;/MTSwitch&gt;
  
    &lt;h3 class="subtitle"&gt;
      &lt;span&gt;&lt;$MTCommentAuthor$&gt;&lt;/span&gt;
      &lt;MTIfNonEmpty tag="MTCommentURL"&gt;
        &lt;a href="&lt;$MTCommentURL$&gt;"&gt;[&lt;$MTCommentAuthor$&gt;'s site]&lt;/a&gt;
      &lt;/MTIfNonEmpty&gt;
    &lt;/h3&gt;
    
    &lt;h4 class="attribution"&gt;
      Posted at 
      &lt;$MTCommentDate format="%l:%M %p"$&gt;
      on 
      &lt;$MTCommentDate format="%A %B %e, %Y"$&gt;
    &lt;/h4&gt;
    
    &lt;$MTCommentBody smarty_pants="1"$&gt;
  
  &lt;/li&gt;
&lt;/MTComments&gt;
</div>

<p>I'm sure any programmers out there are rolling their eyes and saying duh right now, but I figured some normal folk out there might find this useful.  Essentially, the MTSetVar variable named "color" is used to store a number between 1 and 3 (inclusive).  For each comment, we use the MTSwitch plugin to print out a <span class="code">&lt;li&gt;</span> element with the appropriate class, and then update the variable to the next color value.</p>

<p>Anyway, <i>I</i> thought it was nifty.  Though the colors aren't final - I may mute the comments down or change them to varying grays to provide more differentiation from the category colors.</p>

<p>There are a few other little tricks I've come up (or more likely reinvented) while doing this.  I'll probably provide similar writeups for those, if/when I get around to it.</p>

<div class="quote">UPDATE: My old code-displaying markup is stupid.  Try viewing <a href="http://hamstergeddon.dyndns.org/archives/2004/02/19/alternating_colors_in_mt.shtml">this page with new design</a> if you actually want to read the text.</div>
