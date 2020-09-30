# Change Log
- Changes before version 1.2.1 not documented (see commit history)
- Project follows [Semantic Versioning](http://semver.org/)

## Version 1.7.0 (Development)

- New `animate` prop added which slightly rotates and expands the star on mouseover
- New `active-on-click` prop applies active colors on click rather than on hover when set
- New `active-border-color` prop, which allows border colour to be changed when star is active (issue #34)
- `active-color` and `active-border-color` now optionally accept an array of color values, which can be used as break points
- :glow no longer requires glow-color to be set (thanks to @bifot)
- Screen readers are now supported. You can change the default message ("Rated {{rating}} out of {{maxRating}} stars") by using the `screen-reader` scoped slot:

````javascript
<star-rating>
    <template v-slot:screen-reader="slotProps">
        This product has been rated {{slotProps.rating}} out of {{slotProps.stars}} stars
    </template>
</star-rating>
````

- Better support for touch screen devices
- Refactor parseAlphaColor method into own class
- Refactor star.vue

## Version 1.6.3
- Update tests to jest and use vue test utils
- Fix issue where glow is always on (fixes #56 #50)
- Update webpack
- Update lint to eslint-plugin-vue

## Version 1.6.2
- Update Readme

## Version 1.6.1
- Fixes issue where round-start-rating isn't respected when initial value is set via an async call

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


