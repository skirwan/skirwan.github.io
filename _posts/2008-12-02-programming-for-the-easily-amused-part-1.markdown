---
title: "Programming For the Easily Amused: Part 1"
date: 2008-12-02 15:47:38 -0500
redirect_from:
  - /archives/2008/12/programming_for_the_easily_amu.shtml
legacy_url: http://seankerwin.org/archives/2008/12/programming_for_the_easily_amu.shtml
---
For a long time I've semi-seriously joked about writing a humorous non-theoretical book about computer science that isn't a total crock.  I think I've finally decided that the easiest thing to do is break the entire field down into a random series of blog posts that will in all likelihood never actually be collected into a book.  So here's the preamble.

So what is programming?  Programming a computer is all about explaining to a computer how to do things.  The big secret all programmers share is that computers are dumb.  Really dumb.  But -- and this is why we keep them around -- infallibly obedient and really, really good at math.  Have you ever called a tech support or customer service line and had to put up with a dolt who can't do anything but follow the script in the big-honking-binder his supervisor gave him on his first day?  Now imagine that guy with a calculator, and you're imagining someone maybe ten or twenty times smarter than a computer.  The job of the programmer is to write that big-honking-binder.

So if you're writing a big-honking-binder for your new friend the phone drone, what kind of instructions can you put in there?  If your employees were intelligent and informed, you wouldn't need much: just a single sheet of paper that says 'handle customer issues' at the top, and voila, you're done!  But remember, the computer you're programming here is stupid, and he's not going to understand high-level instructions like that.  You need to break it down:

1.  Ask the caller whether he or she currently owns a product.
    1.  If the caller says 'yes', go to step 2.
    2.  If the caller says 'no', go to step 5.
2.  Ask the caller what is wrong with the product.
    1.  If the caller says 'it will not turn on', go to step 3.
    2.  If the caller says 'it will not turn off', go to step 4.
3.  Tell the caller how to turn the product on. Hang up.
4.  Tell the caller how to turn the product off. Hang up.
5.  Tell the caller where to buy the product. Hang up.

If you look at that script, you'll probably notice a few things (besides the fact that we're training our human computer to be unbearably rude).  What if the answer to step one is "I don't know"?  Different people (computers) might handle that differently.  Some might hang up; some might continue on to step two; some might ask question one over and over until the frustrated customer picks 'yes' or 'no' (we'd call that "undefined behavior", which basically means we don't know in advance what's going to happen; undefined behavior is a source of some pretty nasty bugs). What if there's something wrong with the product besides an inability to turn it on or off?  What if the product won't turn on because it's broken?

Those are all bugs in our program, and they all serve to show part of what makes programming difficult; decomposing a task ('make customers happy') into tiny little steps that a mindless automaton can follow is very difficult.  You can't count on a computer to make a value judgement; you can't count on a computer to recognize that 'yeah' or 'yup' also mean 'yes'; you can't count on a computer to do much of anything except for faithfully following whatever flawed or incomplete script you give it.  That and math.
