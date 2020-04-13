---
title: "Ruby's a Gem"
date: 2006-12-05 00:30:03 -0500
redirect_from:
  - /archives/2006/12/rubys_a_gem.shtml
legacy_url: http://seankerwin.org/archives/2006/12/rubys_a_gem.shtml
---
I didn't have a backup when my server went down. I have the latest build of iClan, Stylunk, and Clieunk on my laptop, but alas there was no backup of my MySQL database and thus no backup of my blog.  

What's a technophile to do?  

Well, it turns out my most recent post was long enough ago that it was all in the Google cache, so finding the text of everything was easy enough. But of course, that's just the rendered pages... it would be much nicer to somehow transform those into [Movable Type's crappt-ass import format](http://www.sixapart.com/movabletype/docs/mtimport).  

This looks like a job for Perl!  

Except I hate Perl!  

So maybe it's a job for Ruby!  

Long story short, I wrote up a relatively short (56 line) Ruby script that opened all the files I saved from the Google cache, parsed out the post title, body, time and data, and printed it out in a form appropriate for importing into Movable Type.  

Doing it in a C language would've taken significantly longer; I played with getting the regular expression right by bringing up the interactive Ruby console, I didn't need to worry about creating a project and setting up compiler targets and what-not... I just wrote code and it did things. Ruby is probably the most Mac-like language I've ever used; things _just work_.
