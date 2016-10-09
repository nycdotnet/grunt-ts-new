Grunt-ts New Experimental
=========================

This is a new experimental version of grunt-ts written with TypeScript 2.0 in mind, written using tests first and more modern techniques.  It is completely unsupported and doesn't yet work completely.

Goals:
  * Fight less with the Grunt API / reimplement less stuff given to us by the Grunt platform.
  * Balance the above with working in a build-platform agnostic way (via adapters).
  * Embrace tsconfig.json as the native way to pass config to tsc (as opposed to command-line parameters).
  * Use promises/async in a sane way.
  * Be fully testable.
  * Compile with TypeScript 2.0+ in a strict mode
  * Move "clever features" of grunt-ts classic into plugins to keep the core project very simple.
  * Great documentation and relatively easy for new folks to jump-in.

If the goals are achieved, it should be relatively easy to adapt the new system to work with other Node build tools (Gulp, etc.).
