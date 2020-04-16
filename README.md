# `sean.kerw.in`

Source for Sean's website.  Copyright me.  If anything here is useful to you for
solving a particular problem, you're free to use it.  This does not extend to
the content of the posts themselves or any substantive chunk of the repository
unaltered.  E.g. you can take a snippet our of my SASS but you can't take the
whole thing; you can borrow a bit of algorithm from Stylunk but you can't just
host your own copy.

To whatever extent the spirit or letter of that statement is unclear, it should
be interpreted conservatively with respect to the author's rights -- where in
doubt: this is mine, go away.

## Running

```bash
$> bundle exec jekyll serve
```

## Re-importing
The `blogimport` directory contains the hideous JavaScript travesty that I used
to import my original Movable Type blog's XML archive into Jekyll.  It's here
in case I discover a systemic failure in the import and need to re-import or
so I can import `sticklord.com` at some point if I'm motivated.

```bash
$> cd blogimport
$> node main.js
```

## Posting
Creating a new post:
```bash
$> ./newpost.rb "Witty new title"
```
