lorem-marxum
============

a dummy text generator for the people ☭

what?
-----

what it says on the tin. like lorem ipsum, but using the communist manifesto as 
the text source.

why?
----

cus it's fuckin funny you bourgie pig.

how?
----

install it with npm. or buy a hardcopy from amazon where the rest of us
communists get our books.

```
npm install -g https://gitlab.com/emrose/lorem-marxum
```

cool, now you can use your expensive laptop built by exploited workers to print 
quotes from a dead white guy.

```
$ marxum --sentences 1
The bourgeois sees in his wife a mere instrument of production.
```

wow, see, you have always needed this. try `--help` for usage. oh, also, this 
might be useful for fuzz testing and stuff. that's actually why i made it.

```
const marxum = require('lorem-marxum');
const words = marxum.words(6);
const sentences = marxum.sentences(2);
const all = marxum.all();

// you get the idea
```

license
-------

licenses are for capitalists. or maybe it's gpl? can i really gpl < 50 lines of 
code and the communist manifesto? i don't know. whatever.
