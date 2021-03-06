---
title: "About This Site"
date: 2004-02-23 17:46:00 -0500
redirect_from:
  - /archives/2004/02/about_this_site.shtml
legacy_url: http://seankerwin.org/archives/2004/02/about_this_site.shtml
---
I'm not sure precisely what a 'colophon' is, and I'm loathe to use a word that's not strictly part of my vocabulary just because it's a trendy word. So, in deference to my linguistic shortcomings, welcome to the 'About This Site' page of Sean Kerwin's _Neutiquam Erro_.

The title, _Neutiquam Erro_, is a Latin phrase that is generally translated as "I am not lost". I trust anyone stumbling their way through life has made a similar feeble protestation at one time or another, even if the thought never finds voice.

The site is hosted on an aging Power Mac G4 Sawtooth with a 500 Mhz G4 processor and 1 Gigabyte of RAM. Its network access it provide via a wireless connection to a LinkSys wireless router hooked to a Motorola SURFBoard cable modem. External access to the server is provided via port forwarding.

The server is currently running Mac OS X 10.3.x (Panther). Pages are served with the standard Apache installation, and the content is managed with Movable Type 2.65. Apache Virtual Hosts are used to allow subdomains.

All of the MT templates are customized quite heavily; the desire was to produce thoroughly XHTML-compliant code to which a wide variety of skins could easily be applied. My inspiration in this pursuit was the venerable CSS Zen Garden.

When viewed at the XHTML level, much of the site is actually within various unordered lists (`<ul>` tags). This was a deliberate decision to make the source presentable on a text-only browser. The CSS used in the site is valid and appears to be working correctly on Safari, Mozilla, IE 5.x Mac, IE 5.x Windows, and IE 6 Windows. I tweak the CSS constantly and the bulk of the verification/testing is done with Safari or Mozilla, so I make no guarantees about the other browsers.

MT is extended by use of the SmartyPants plugin, which provides attractive typography, the MTSwitch plugin, which allows a number of nifty techniques in the templates, and the the Acronym plugin, which automatically adds `<acronym>` tags around familiar acronyms.

The random text you'll see on many pages -- such as the _Buffy the Vampire Slayer_ quote above and the random song excerpt below -- is generated by a rather simplistic shell script I've written. The output from the script is integrated into the page content using server-side includes.

The 'today in history' section on the front page is also generated by a short shell script. This script essentially `grep`s through the FreeBSD calendar files and picks out everything that matches the current date. This script is also included in the page using SSI.

The link list is actually generated by another blog within MT; this blog outputs a file which is then imported into the sidebar module using the `<MTInclude>` tag. The categories in the link blogs become the section headers, the post titles become the link labels, and the post content becomes the actual link.

To facilitate laziness, all the redundant parts of the site are stored as MT modules which are the imported as appropriate. Because the comment preview and error pages are dynamically generated and thus cannot make use of the SSI feature for the random quote and song lyrics, two copies of each module exist; one dynamic with the SSI, one static with hard-coded quote and lyrics.

\[UPDATED 10/2/04\]

The more things stay the same, the more... Well, I guess it doesn't work as well backwards.

The site has been pretty thoroughly made over since the above was originally set down. The Zen aspirations are no more; the site has one theme, the requirements of which dictate the structure of the markup to a fairly significant extent. The new look was described in [this post](http://hamstergeddon.dyndns.org/archives/2004/09/07/neutiquam_erro_reloaded.shtml) on September 7th.

Also new in the interval is the nify new [recent songs page](http://hamstergeddon.dyndns.org/songs.shtml), which contains a list of songs I've played in iTunes since the last time the list was reset. It uses some pretty nifty perl code (of which I'm rather proud) to search for tracks in the Amazon database, cache the cover image locally, and do all sort of other nifty things. A post detailing the specifics will be forthcoming shortly.

Also, if you have a javaScript-aware browser, the title and masthead quote fade in as the the page loads. Totally gratuitous, clearly derivative or [Orkut](http://www.orkut.com/), but nifty nonetheless, IM-ever-so-HO.
