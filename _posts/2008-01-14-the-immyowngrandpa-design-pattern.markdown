---
title: "The I'm-My-Own-Grandpa Design Pattern"
date: 2008-01-14 19:15:22 -0500
redirect_from:
  - /archives/2008/01/the_immyowngran.shtml
legacy_url: http://seankerwin.org/archives/2008/01/the_immyowngran.shtml
---
I wrote about this <a href="http://seankerwin.org/archives/2007/11/returning_a_sub.shtml">a few months back</a>, and today it proved the solution to an otherwise insoluble problem yet again.
<code><pre class="code">
class BaseMarklar&lt;T&gt; where T:BaseMarklar&lt;T&gt; {
	public T Self() { return (T)this; }
}

class BlueMarklar : BaseMarklar&lt;BlueMarklar&gt; {
	public void Frob() { ... }
}

class RedMarklar : BaseMarklar&lt;RedMarklar&gt; {
	public void Frizzle() { ... }
}
</pre></code>
I've decided to call it the "I'm My Own Grandpa" design pattern.  I've always regarded design patterns as primarily solutions to failures of the underlying language, and hence I consider the designation appropriate here.
