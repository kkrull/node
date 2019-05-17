# NPM Package Experiment

How do NPM packages work?  Build a town crier -- `herald` -- and find out!

Build and install dependencies:

    $ cd herald
    $ npm run build
    $ npm install

then run it

    $ cd herald
    $ npm start
    > herald@0.0.1 start .../node-sandbox/npm-package/herald
    > node main.js
    
    Hello super bacon
    Run along now, and solve one problem without creating any new ones


## Modules

The `herald` module is the main program, which imports code from other modules as follows:

- The `greeter` module is imported as a directory dependency.
- The `generator` module is a plain ES5 module that is imported as a tarball dependency.
- The `commander` module is an ES6 module that is transpiled to ES5, and imported as a tarball dependency.
