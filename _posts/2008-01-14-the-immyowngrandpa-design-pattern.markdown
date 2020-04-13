---
title: "The I'm-My-Own-Grandpa Design Pattern"
date: 2008-01-14 19:15:22 -0500
redirect_from:
  - /archives/2008/01/the_immyowngran.shtml
legacy_url: http://seankerwin.org/archives/2008/01/the_immyowngran.shtml
---
I wrote about this [a few months back](/archives/2007/11/returning_a_sub.shtml), and today it proved the solution to an otherwise insoluble problem yet again.  
 ```
class BaseMarklar<T> where T:BaseMarklar<T> {  
	public T Self() { return (T)this; }  
}  

class BlueMarklar : BaseMarklar<BlueMarklar> {  
	public void Frob() { ... }  
}  

class RedMarklar : BaseMarklar<RedMarklar> {  
	public void Frizzle() { ... }  
}
```

I've decided to call it the "I'm My Own Grandpa" design pattern. I've always regarded design patterns as primarily solutions to failures of the underlying language, and hence I consider the designation appropriate here.
