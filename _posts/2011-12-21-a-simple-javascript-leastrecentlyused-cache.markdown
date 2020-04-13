---
title: "A Simple JavaScript Least-Recently-Used Cache"
date: 2011-12-21 14:30:38 -0500
redirect_from:
  - /archives/2011/12/a_simple_javascript_least-rece.shtml
legacy_url: http://seankerwin.org/archives/2011/12/a_simple_javascript_least-rece.shtml
---
In the course of a recent quick JavaScript side-project — post forthcoming — I needed a simple cache. Then I needed another cache within the cached objects. Then I needed another cache. It was at that point that I realized I should probably factor things out into a reusable component, and built [JSLRU](https://github.com/skirwan/JSLRU).  

Of course then I refactored things dramatically and it's barely used at all. But if you need a JavaScript least-recently-used cache, [check it out](https://github.com/skirwan/JSLRU).
