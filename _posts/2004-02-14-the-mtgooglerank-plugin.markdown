---
title: "The MTGoogleRank Plugin"
date: 2004-02-14 02:31:00 -0500
redirect_from:
  - /archives/2004/02/the_mtgoogleran.shtml
legacy_url: http://seankerwin.org/archives/2004/02/the_mtgoogleran.shtml
---
<p>The <a href="http://www.johnsjottings.com/archives/2004/01/10/mtgooglerank.html">MTGoogleRank</a> plugin for MovableType is really nifty, though it's a pain in the ass to get it to work on Darwin/OS X (more on this below).</p>

<p>As you may or may not know, the primary drive behind this website is the fact that I'm not the first result for a Google search for my name.  This offends my megalomaniacal side, for obvious reasons.  I used to be first.</p>

<p>So for the latest redesign of my site (<a href="http://hamstergeddon.dyndns.org/new_index.shtml">Preview</a>) I decided to try out this plugin.  If you check the preview you'll see that it's finally up and running, but it wasn't exactly an easy experience, especially for one such as I who loathes and fears Perl.</p>

<p>Simply following the instructions will get you absolutely nothing as your reward.  To get any kind of results, you need to add some code to the beginning (just put it with the other 'use' declaration, though I don't think it matter much):</p>

<div class="code">use MT::Template::Context;</div>

<p>Now the plugin's loading, but it won't do anything useful.  You can get the version number, but whenever you try to use the blasted thing for its intended purpose, you'll get a thoroughly uninformative error message, along the lines of "Service description 'file:lib/MT/GoogleSearch.wsdl' can't be loaded: 501 Protocol scheme 'file' is not supported."</p>

<p>It turns out (and here's the part that caused much head-scratching and nearly as much cursing) you need to replace the five lines after the comment about 'GoogleSearch.wsdl' with this:</p>

<div class="code">my $google_search = SOAP::Lite-&gt;service("http://api.google.com/GoogleSearch.wsdl");</div>

<p>That'll do it.  I know that doesn't look like much, but trust me, <i>it is</i>.  Apparently the installation of Perl or SOAP::Lite (I'm still not sure which) that comes with Panther doesn't like 'file:' URIs.  As a result, it fails with a largely-useless and thoroughly uninformative error message.</p>

<p>Anyway - great module, crappy Darwin support.  Hopefully anybody else in the same situation will find this page on Google and be saved the headache.  Almost makes me wish I had TrackBack set up so I could ping the author of the plugin, 'cause I'm pretty sure both of those changes really <i>should</i> be in effect everywhere.</p>
