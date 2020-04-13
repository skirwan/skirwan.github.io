---
title: "Generic Accumulators in C#"
date: 2008-12-31 11:29:43 -0500
redirect_from:
  - /archives/2008/12/generic_accumulators_in_c.shtml
legacy_url: http://seankerwin.org/archives/2008/12/generic_accumulators_in_c.shtml
---
<div style="border:1px solid red; background:yellow; border-radius:10px; font-weight:bold; padding: 10px; color: red;">This was written in C# 2.0; if you're using 3.0 you might want to check out <a href="http://seankerwin.org/archives/2011/12/generic_accumulators_in_c_redu.shtml">my updated version</a></div>

 <p>I fell down a chain of links today and wound up reading <a href="http://www.paulgraham.com/icad.html">one of Paul Graham's numerous pro-Lisp essays</a>.  I responded as I typically do by attempting to implement his examples in whatever language I have handy, which today was C# 2.0.</p>

<p>The example Graham cites in the appendix is a function for generating accumulators:</p>

<code><pre>(defun foo (n)
  (lambda (i) (incf n i)))
</pre></code>

<p>For those of me who always find reading Lisp akin to reading the opening chapters of the Bible (but with parentheses standing in for the voluminous 'begats'), he also helpfully provides equivalents in a few other languages, such as JavaScript:</p>

<code><pre>function foo(n) { 
  return function (i) { 
		   return n += i } }
</pre></code>

<p>An accumulator is a function that maintains internal state; when you invoke it with a new value it adds that value to its internal state and returns the new sum.  An example usage would be to initialize it to zero and invoke it with each value in an array of integers; the result of the final invocation would be the sum of the integers -- or rather, the accumulation of the values.</p>

<p>For instance:</p>

<code><pre>var myAcc = foo(0); // Initialize to zero
myAcc(1); // 0 + 1 = 1
myAcc(10); // 0 + 1 + 10 = 11
myAcc(44); // 0 + 1 + 10 + 44 = 55
</pre></code>

<p>So, can we build that in C#?  The answer is an enthusiastic 'kinda'!</p>

<code><pre>[TestFixture]
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
</pre></code>

<p>It's not actually that long -- the <code>TestAccumulator</code> function at the bottom is a quickie NUnit test case to verify it's doing what I think it should.  It's still longer than the Lisp or JavaScript version though.</p>

<p>But there's one other major difference from those versions -- typing.  The C# version only works on integers, whereas the Lisp and JavaScript version will work on anything that can be added.  But if we try to genericize the C# code we'll run into problems at the <code>n = n + inc</code> statement, because you can't add two objects and thus can't add two generic objects without a generic constraint guaranteeing you can.  And since there's no <code>IAddable</code> interface that integers and floats and strings and everything implement (and since C# still doesn't have a more generalized form of <code>where</code> clause that would let us specify constraints as duck types rather than static types), we're basically SOL with a generic C# accumulator.</p>

<p><i>Or are we?</i> (Bum-bum-<b>BUM</b>!)</p>

<p>What if we passed our <code>MakeAccumulator</code> function two parameters: a starting value, and a delegate function to use for incrementing?</p>

<code><pre>[TestFixture]
public class AccumulatorTest
{
	private delegate T Accumulator&lt;T&gt;(T inc);

	private delegate T AccumulationDelegate&lt;T&gt;(T a, T b);

	private static Accumulator&lt;T&gt; MakeAccumulator&lt;T&gt;(T start, AccumulationDelegate&lt;T&gt; accumulationDelegate)
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
		Accumulator&lt;int&gt; acc = MakeAccumulator(0, delegate(int a, int b) { return a + b; });

		Assert.AreEqual(0 + 0, acc(0));
		Assert.AreEqual(0 + 0 + 1, acc(1));
		Assert.AreEqual(0 + 0 + 1 + 10, acc(10));
		Assert.AreEqual(0 + 0 + 1 + 10 + 44, acc(44));
	}

	[Test]
	public void TestFloatAccumulator()
	{
		Accumulator&lt;float&gt; acc = MakeAccumulator((float)0, delegate(float a, float b) { return a + b; });

		Assert.AreEqual(0 + 0, acc(0));
		Assert.AreEqual(0 + 0 + 1, acc(1));
		Assert.AreEqual(0 + 0 + 1 + 10, acc(10));
		Assert.AreEqual(0 + 0 + 1 + 10 + 44, acc(44));
	}

	[Test]
	public void TestStringAccumulator()
	{
		Accumulator&lt;string&gt; acc = MakeAccumulator("", delegate(string a, string b) { return a + b; });

		Assert.AreEqual("" + "", acc(""));
		Assert.AreEqual("" + "" + "marklar", acc("marklar"));
		Assert.AreEqual("" + "" + "marklar" + "smurf", acc("smurf"));
		Assert.AreEqual("" + "" + "marklar" + "smurf" + "foo", acc("foo"));
	}
}
</pre></code>

<p>Yay!</p>

<p>So what is it good for?  Absolutely nothing!  But it sure was fun!</p>
