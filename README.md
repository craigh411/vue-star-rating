# Star Rating Component for Vue 2.x

[![Build Status](https://travis-ci.org/craigh411/vue-star-rating.svg?branch=master)](https://travis-ci.org/craigh411/vue-star-rating)

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

`var StarRating = require('vue-star-rating');`

or ES6 syntax:

`import StarRating from 'vue-star-rating'`

Then you can register the component globally:

`Vue.component('star-rating', StarRating);`

Or in your `Vue component`:

```javascript
components: {
  StarRating
}
```

You can then use the following markup in your project:

`<star-rating></star-rating>`

### Important

When using require or import you will need to make sure you can compile `ES6` (see: [babel](https://babeljs.io)  and the [ES2015 preset](https://babeljs.io/docs/plugins/preset-es2015/)) and have either [vueify](https://github.com/vuejs/vueify) (for browserify) or [vue-loader](https://github.com/vuejs/vue-loader) (for webpack) in your project to compile the `.vue` files.

If you are using `browserify` ensure you have both [vueify](https://github.com/vuejs/vueify) and [babelify](https://github.com/babel/babelify) in your project to correctly compile the components. 

### Via CDN

A `dist` file has also been created, which you can include in your webpage like so:

`<script src="unpkg.com/vue-star-rating/dist/star-rating.min.js"></script>`

The `star-rating` component is registered automatically, so there is no need to manually register the component.

## Docs

### Props

The following props can be passed to the component:

| Prop  | Description | Default |
| ------------- | ------------- |-------------|
| increment  |  The rating increment, for example pass 0.5 for half stars or 0.01 for fluid stars. Expects a number between 0.01 - 1. | 1
| rating  | The initial rating, this will automatically round to the closest increment, so for the most accurate rating pass 0.01 as increment  | 0 |
| max-rating  | The maximum rating, this lets `vue-star-rating` know how many stars to display | 5 |
| inactive-color  | The color of the non-highlighted portion of a star.  | #d8d8d8 |
| active-color  | The color of the highlighted portion of a star.  | #ffd055 |
| star-size  | The size of each star, this gets passed to the `SVG` width attribute, so  larger numbers are larger stars  | 50 |
| show-rating  | Whether or not to show the rating next to the stars  | true |
| read-only  | When set to true, the rating cannot be edited. Use in conjuction with `increment` to define rounding precision.  | false |
| text-class  | A css class name to style the rating text for a specific star rating component | '' |
| inline  | Sets the star rating to display inline | false |
| border-color  | Sets the colour of the border for each star | #d8d8d8 |
| border-width  | Sets the width of the border for each star | 0 |
| padding  | Pads the right of each star so distance between stars can be altered | 0 |

**Important:** Vue requires you to pass numbers and boolean values using `v-bind`, any props that require a number or bool should use `v-bind:` or the colon (`:`) shorthand.

#### Props Example

```HTML
<star-rating v-bind:increment="0.5" 
             v-bind:max-rating="3" 
             inactive-color="#000" 
             active-color="#f00" 
             v-bind:star-size="90">
</star-rating>
```

### Reactive Props

The `rating` prop is reactive, meaning that if you bind it to data in your parent view model, any change to that value will automatically feed through to the component. It's important to note that if you want to use this functionality you will have to manually sync data between the parent and child. 

[See here for an example](https://jsfiddle.net/craig_h_411/g8x3z5ps/)

### Custom Events

`vue-star-rating` fires the following custom events, simply use `v-on:event` or the `@` shortand to capture the event.

| Event  | Description | Return Value
| ------------- | ------------- |-----------|
| rating-selected  | Returns the rating the user selects via the click event |  rating
| current-rating  | Returns the rating that the users mouse is currently over  | rating


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

**Note:** When writing methods to capture custom events, the rating param is automatically passed to the method. If you need to declare methods with multiple paramaters you will need to use `$event` to pass the rating to the method:

```HTML
<star-rating @rating-selected="setRating($event, anotherParam)"></star-rating>
```

### IE9 Support
  
  `vue-star-rating` supports IE 9+; make sure you place the following in the `head` of your webpage to ensure that IE is in standards mode:
  
`<meta http-equiv="X-UA-Compatible" content="IE=Edge">`
  
  
