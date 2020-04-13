---
title: "Generic Accumulators in C#"
date: 2008-12-31 11:29:43 -0500
redirect_from:
  - /archives/2008/12/generic_accumulators_in_c.shtml
legacy_url: http://seankerwin.org/archives/2008/12/generic_accumulators_in_c.shtml
---
This was written in C# 2.0; if you're using 3.0 you might want to check out [my updated version](/archives/2011/12/generic_accumulators_in_c_redu.shtml)

I fell down a chain of links today and wound up reading [one of Paul Graham's numerous pro-Lisp essays](http://www.paulgraham.com/icad.html). I responded as I typically do by attempting to implement his examples in whatever language I have handy, which today was C# 2.0.

The example Graham cites in the appendix is a function for generating accumulators:

```
(defun foo (n)
  (lambda (i) (incf n i)))
```

For those of me who always find reading Lisp akin to reading the opening chapters of the Bible (but with parentheses standing in for the voluminous 'begats'), he also helpfully provides equivalents in a few other languages, such as JavaScript:

```
function foo(n) { 
  return function (i) { 
		   return n += i } }
```

An accumulator is a function that maintains internal state; when you invoke it with a new value it adds that value to its internal state and returns the new sum. An example usage would be to initialize it to zero and invoke it with each value in an array of integers; the result of the final invocation would be the sum of the integers -- or rather, the accumulation of the values.

For instance:

```
var myAcc = foo(0); // Initialize to zero
myAcc(1); // 0 + 1 = 1
myAcc(10); // 0 + 1 + 10 = 11
myAcc(44); // 0 + 1 + 10 + 44 = 55
```

So, can we build that in C#? The answer is an enthusiastic 'kinda'!

```
[TestFixture]
public class AccumulatorTest
{
	private delegate int Accumulator(int inc);

	private static Accumulator MakeAccumulator(int start)
	{
		int n = start;

		return delegate(int inc)
		{
			n = n + inc;
			return n;
		};
	}

	[Test]
	public void TestAccumulator()
	{
		Accumulator acc = MakeAccumulator(0);

		Assert.AreEqual(0 + 0, acc(0));
		Assert.AreEqual(0 + 0 + 1, acc(1));
		Assert.AreEqual(0 + 0 + 1 + 10, acc(10));
		Assert.AreEqual(0 + 0 + 1 + 10 + 44, acc(44));
	}
}
```

It's not actually that long -- the `TestAccumulator` function at the bottom is a quickie NUnit test case to verify it's doing what I think it should. It's still longer than the Lisp or JavaScript version though.

But there's one other major difference from those versions -- typing. The C# version only works on integers, whereas the Lisp and JavaScript version will work on anything that can be added. But if we try to genericize the C# code we'll run into problems at the `n = n + inc` statement, because you can't add two objects and thus can't add two generic objects without a generic constraint guaranteeing you can. And since there's no `IAddable` interface that integers and floats and strings and everything implement (and since C# still doesn't have a more generalized form of `where` clause that would let us specify constraints as duck types rather than static types), we're basically SOL with a generic C# accumulator.

_Or are we?_ (Bum-bum-**BUM**!)

What if we passed our `MakeAccumulator` function two parameters: a starting value, and a delegate function to use for incrementing?

```
[TestFixture]
public class AccumulatorTest
{
	private delegate T Accumulator<T>(T inc);

	private delegate T AccumulationDelegate<T>(T a, T b);

	private static Accumulator<T> MakeAccumulator<T>(T start, AccumulationDelegate<T> accumulationDelegate)
	{
		T n = start;

		return delegate(T inc)
		{
			n = accumulationDelegate(n, inc);
			return n;
		};
	}

	[Test]
	public void TestIntAccumulator()
	{
		Accumulator<int> acc = MakeAccumulator(0, delegate(int a, int b) { return a + b; });

		Assert.AreEqual(0 + 0, acc(0));
		Assert.AreEqual(0 + 0 + 1, acc(1));
		Assert.AreEqual(0 + 0 + 1 + 10, acc(10));
		Assert.AreEqual(0 + 0 + 1 + 10 + 44, acc(44));
	}

	[Test]
	public void TestFloatAccumulator()
	{
		Accumulator<float> acc = MakeAccumulator((float)0, delegate(float a, float b) { return a + b; });

		Assert.AreEqual(0 + 0, acc(0));
		Assert.AreEqual(0 + 0 + 1, acc(1));
		Assert.AreEqual(0 + 0 + 1 + 10, acc(10));
		Assert.AreEqual(0 + 0 + 1 + 10 + 44, acc(44));
	}

	[Test]
	public void TestStringAccumulator()
	{
		Accumulator<string> acc = MakeAccumulator("", delegate(string a, string b) { return a + b; });

		Assert.AreEqual("" + "", acc(""));
		Assert.AreEqual("" + "" + "marklar", acc("marklar"));
		Assert.AreEqual("" + "" + "marklar" + "smurf", acc("smurf"));
		Assert.AreEqual("" + "" + "marklar" + "smurf" + "foo", acc("foo"));
	}
}
```

Yay!

So what is it good for? Absolutely nothing! But it sure was fun!
