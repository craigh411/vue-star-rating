# Change Log
- Changes before version 1.2.1 not documented (see commit history)
- Project follows [Semantic Versioning](http://semver.org/)

## Version 1.6.0
- Add rounded corners (thanks to @SparoHawk)
- Add custom star shapes (thanks to @SparoHawk)
- Add glow prop, for a subtle glow when star selected
- Add glow-color prop
- Add viewbox attribute
- Space by adding right margin to star div in star-rating.vue, rather than on SVG

## Version 1.5.1
- Fixed Screenshot im Readme.md

## Version 1.5.0
- Added `round-start-value` prop
- Fixed dead column of pixels allowing rating to be reset to 0
- Added new tests
- Updated Readme

## Version 1.4.0

- RTL Support Added via `rtl` prop (closes issue #11).
- `fixed-points` prop added.
- css class names changed to avoid name clashes causing unexpected formatting issues (solves issue #12).
- Webpack added for build, development and tests.
- Webpack configs added for dev & dist whcih now exports a single UMD module.
- ESLint, eslint-config-vue and eslint-plugin-vue added.
- Scripts added to package.json for linting (global & local eslint & plugins required to run this).
- Browserify & gulp removed.
- Browserify transforms removed from package json as they are no longer required with UMD module.
- Further tests added for new features.
- Added rtl example.
- Created new commonjs example.
- Readme updated.

## Version 1.3.0

- Added v-model support
- Added new v-model example
- Updated Readme


## Version 1.2.2

- Added Watchify for development
- ChangeLog
- Updated Readme
- Added new `watch` task to gulpfile.babel.js


