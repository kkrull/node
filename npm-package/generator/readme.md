# Name Generator

OMG it's a Node package!

It doesn't do much.  It just generates names for things.


## Packaging for use in other projects

    $ npm run pack

This creates a tarball in the current directory, by running [npm pack][npm-pack].
Files listed in `.npmignore` are excluded from the package.

Inspect the package with `tar tvzf <.tgz file>`

[npm-pack]: https://docs.npmjs.com/cli/pack
