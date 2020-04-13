---
title: "Functional Programming"
date: 2009-10-27 14:29:40 -0400
redirect_from:
  - /archives/2009/10/functional_programming.shtml
legacy_url: http://seankerwin.org/archives/2009/10/functional_programming.shtml
---
```
public void BeginGetSingle(TIdentityCriteria identityCriteria, CompletionCallback<TItem> callback)
{
    TFilterCriteria filterCriteria =
        CriteriaUtilities.UpgradeCriteria<TIdentityCriteria, TFilterCriteria>(identityCriteria);

    RestClient.BeginGet<TItem>(
        CriteriaUtilities.CriteriaToUrl(
            filterCriteria,
            m_Map,
            m_ServiceUrlBase,
            r => typeof (TItem).FullName.Equals(r.OutputPayloadClass) && r.AllowedVerbs.Contains(Verb.Get)),
        completionFunction => callback(() => completionFunction().Payload));        
}
```

My function takes a function and when done it calls that function, passing a function that the calling function calls for the result.

Now in fact my function calls another function taking a function accepting a function to call for its result, and to that function it passes a function which when called calls the first function passing a new function that when called calls the function that was passed to the function that my function passed to the other function, thereby returning the result of that function to the function that called my function.

And they say you can't write Lisp code in C#.
