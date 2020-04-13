---
title: "Generic Accumulators in C#, Redux"
date: 2011-12-21 14:20:27 -0500
redirect_from:
  - /archives/2011/12/generic_accumulators_in_c_redu.shtml
legacy_url: http://seankerwin.org/archives/2011/12/generic_accumulators_in_c_redu.shtml
---
It turns out one of the most-trafficked pages on this site is [my discussion of generic accumulators in C#](/archives/2008/12/generic_accumulators_in_c.shtml). It occurs to me that it could use a bit of an update, as some newer features like lambdas and the predefined `Func<>` family simplifies things quite a bit:

```
class Program
{
    public static Func<T, T> MakeAccumulator<T>(T start, Func<T, T, T> addFunction)
    {
        return inc => start = addFunction(start, inc);
    }

    static void Main(string[] args)
    {
        var intAccumulator = MakeAccumulator(0, (i, j) => i + j);

        Debug.Assert(0 == intAccumulator(0));
        Debug.Assert(1 == intAccumulator(1));
        Debug.Assert(11 == intAccumulator(10));
        Debug.Assert(55 == intAccumulator(44));

        var floatAccumulator = MakeAccumulator(0.0, (i, j) => i + j);

        Debug.Assert(0 == floatAccumulator(0.0));
        Debug.Assert(0.1 == floatAccumulator(0.1));
        Debug.Assert(1.1 == floatAccumulator(1.0));
        Debug.Assert(5.5 == floatAccumulator(4.4));

        var stringAccumulator = MakeAccumulator("", (i, j) => i + j);

        Debug.Assert("" == stringAccumulator(""));
        Debug.Assert("ZYZ" == stringAccumulator("ZYZ"));
        Debug.Assert("ZYZZY" == stringAccumulator("ZY"));
        Debug.Assert("ZYZZYVA" == stringAccumulator("VA"));

        Console.WriteLine("Success!");
        Console.ReadLine();
    }
}
```

So there's that. Still not terribly useful, but I _do_ like shortening code.
