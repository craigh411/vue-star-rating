# Star Rating Component for Vue 2.x

A simple, highly customisable star rating component for Vue 2.x.

### Screenshot

[![vue-star-rating_ss.png](https://s28.postimg.org/hz3y0skot/vue_star_rating_ss.png)](https://postimg.org/image/4uydo3smx/)

[See it in action on JSFiddle](https://jsfiddle.net/craig_h_411/992o7cq5/)

## Features:

  - SVG stars - scale without loss of quality.
  - Customisable rating increments.
  - Customisable colors.
  - Customisable number of stars.
  - Create read-only stars.
 
## Usage

### Via NPM

Install via npm:

`npm install vue-star-rating --save-dev`

Then require in your project:

`var starRating = require('vue-star-rating');`

or ES6 syntax:

`import starRating from 'vue-star-rating'`

Then you can register the component globally:

`Vue.component('star-rating', starRating);`

Or in your `Vue component`:

```javascript
components: {
  starRating
}
```

You can then use the following markup in your project:

`<star-rating></star-rating>`

### Important

When using require or import you will need to make sure you can compile `ES6` (see: [babel](https://babeljs.io)  and the [ES2015 preset](https://babeljs.io/docs/plugins/preset-es2015/)) and have either [vueify](https://github.com/vuejs/vueify) or [vue-loader](https://github.com/vuejs/vue-loader) in your project to compile the `.vue` files.

### Via CDN

A `dist` file has also been created, which you can include in your webpage like so:

<script src="https://unpkg.com/vue-star-rating@1.0.0/dist/star-rating.js"></script>

The `star-rating` component is registered automatically, so there is no need to manually register the component.

## Docs

### Props

The following props can be passed to the component:

| Prop  | Description | Default |
| ------------- | ------------- |-------------|
| increment  |  The rating increment for example pass 0.5 for half stars or 0.01 for fluid stars. Expects a number between 0.01 - 1. | 1
| rating  | The initial rating, this will automatically round to the closest increment, so for the most accurate rating pass 0.01 as increment  | 0 |
| max-rating  | The maximum rating, this lets `vue-star-rating` know how many stars to display | 5 |
| inactive-color  | The color of the non-highlighted portion of a star.  | #d8d8d8 |
| active-color  | The color of the highlighted portion of a star.  | #ffd055 |
| star-size  | The size of each star, this gets passed to the `SVG` width attribute, so  larger numbers are larger stars  | 50 |
| show-rating  | Whether or not to show the rating next to the stars  | true |
| read-only  | When set to false, the rating cannot be edited  | true |
| text-class  | A css class name to style the rating text | '' |

**Important:** Vue requires you to pass numbers using `v-bind`, any props that require a number should use `v-bind:` or the colon (`:`) shorthand.

#### Props Example

```HTML
<star-rating v-bind:increment="0.5" 
             v-bind:max-rating="3" 
             inactive-color="#000" 
             active-color="#f00" 
             v-bind:star-size="90">
</star-rating>
```

### Custom Events

`vue-star-rating` fires the following custom events, simply use `v-on:event` or the `@` shortand to capture the event.

| Event  | Description |
| ------------- | ------------- |
| rating-selected  | Returns the rating the user selects via the click event |
| current-rating  | Returns the rating that the users mouse is currently over  |

#### Custom Events Example

```HTML
<star-rating @rating-selected="setRating"></star-rating>
```

Then in your view model:

```javascript
new Vue({
  el: '#app',
  methods: {
    setRating: function(rating){
      this.rating = rating;
    }
  },
  data: {
    rating: 0
  }
});

```
### IE9 Support
  
  `vue-star-rating` supports IE 9+; make sure you place the following in the `head` of your webpage to ensure that IE is in standards mode:
  
`<meta http-equiv="X-UA-Compatible" content="IE=Edge">`
  
  
