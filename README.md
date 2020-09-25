# Star Rating Component for Vue 2.x / 3.x

[![Build Status](https://travis-ci.org/craigh411/vue-star-rating.svg?branch=master)](https://travis-ci.org/craigh411/vue-star-rating)
[![npm](https://img.shields.io/npm/dt/vue-star-rating.svg)]()

A simple, highly customisable star rating component for Vue 2.x. / 3.x

> Need more than stars? Check out [vue-rate-it](https://github.com/craigh411/vue-rate-it) with hundreds of different raters built in!

### Screenshot

![star-rating.png](https://user-images.githubusercontent.com/13747552/76623388-4ee74580-652b-11ea-9efb-5fb0ca548980.png)

#### See it in action:
- [Vue 2 Examples](https://jsfiddle.net/craig_h_411/992o7cq5/)
- [Vue 3 Examples](https://codepen.io/craigh411/pen/abNXVQN)

## Features:

  - SVG stars - scale without loss of quality.
  - Customisable rating increments.
  - Customisable colors.
  - Customisable number of stars.
  - Create read-only stars.

## Usage

### Install Via NPM


Install via npm:

#### Vue 2.x Install

`npm install vue-star-rating`

#### Vue 3.x Install

If you're using Vue 3 you will currently need to install the `next` version of `vue-star-rating`

`npm install vue-star-rating@next`

---

Once installed import in to your component:

`import StarRating from 'vue-star-rating'`

Then register `vue-star-rating` using the components option:

```javascript
components: {
  StarRating
}
```

You can then use the following markup in your project:

`<star-rating />`

---

### Via CDN

You may also include `vue-star-rating` directly in to your webpage via Unpkg. Simply add the following script tag:

#### Vue 2.x

`<script src="https://unpkg.com/vue-star-rating/dist/star-rating.min.js"></script>`

You will need to register the component by doing:

```javascript
Vue.component('star-rating', VueStarRating.default);
```

#### Vue 3.x

`<script src="https://unpkg.com/vue-star-rating@next/dist/VueStarRating.umd.min.js"></script>`

```javascript
const app = Vue.createApp({ 
  // Your component code
 })
app.component('star-rating', VueStarRating.default)
app.mount('#app')
```


## Getting Started

To get started with `vue-star-rating` you will want to sync the rating values between the component and parent, you can then take a look at the props and custom events section of the docs to customise your `star-rating` component.

### Syncing Rating Values with V-Model

`vue-star-rating` supports `v-model`, which is the simplest way to keep your ratings in sync:

#### Vue 2.2+

```HTML
<star-rating v-model="rating"></star-rating>
```

#### Vue 3.x

v-model works on the `rating` prop, so if you're using **Vue 3** you will need to do:

```HTML
<star-rating v-model:rating="rating"></star-rating>
```

## Docs

### Props

The following props can be passed to the component:

#### General Props

These props provide general functionailty to the star rating component

| Prop  | Description | Default |
| ------------- | ------------- |-------------|
| increment  |  The rating increment, for example pass 0.5 for half stars or 0.01 for fluid stars. Expects a number between 0.01 - 1. | 1
| rating  | The initial rating, this will automatically round to the closest increment, so for the most accurate rating pass 0.01 as increment or set the `round-start-rating` prop to false  | 0 |
| max-rating  | The maximum rating, this lets `vue-star-rating` know how many stars to display | 5 |
| star-points | The points defining a custom star shape.<br><small>_If no points are passed the default star shape is used._</small> | [] |
| read-only  | When set to true, the rating cannot be edited. Use in conjuction with `increment` to define rounding precision.  | false |
| show-rating  | Whether or not to show the rating next to the stars  | true |
| fixed-points  | Specify a fixed number of digits after the decimal point. | null |
| rtl  | Pass true to display star rating using rtl (right-to-left) | false |
| round-start-rating  | Pass false if you don't want the start rating value to round to the closest increment. The user will still only be able to select based on the given increment. | true |

#### Style Props

These props are used to style the star rating component


| Prop  | Description | Default |
| ------------- | ------------- |-------------|
| star-size  | The size of each star, this gets passed to the `SVG` width attribute, so  larger numbers are larger stars  | 50 |
| inactive-color  | The color of the non-highlighted portion of a star.  | #d8d8d8 |
| active-color  | The color of the highlighted portion of a star.  | #ffd055 |
| border-color  | Sets the colour of the border for each star | #999 |
| border-width  | Sets the width of the border for each star | 0 |
| padding  | Pads the right of each star so distance between stars can be altered | 0 |
| rounded-corners | Whether or not to round the star's corners | false |
| inline  | Sets the star rating to display inline | false |
| clearable  | When set to true a second click on the same rating clears the rating | false |
| glow | Adds a subtle glow around each active star, this should be a number to spread the glow (requires `glow-color` to be set) | 0 |
| glow-color | Sets the color for the glow (note, this effect can be very subtle) | null |
| text-class  | A css class name to style the rating text for a specific star rating component | '' |

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

### Custom Events

`vue-star-rating` fires the following custom events, simply use `v-on:` or the `@` shortand to capture the event.

### Vue 2.x Events

| Event  | Description | Return Value
| ------------- | ------------- |-----------|
| rating-selected  | Returns the rating the user selects via the click event |  rating
| current-rating  | Returns the rating that the users mouse is currently over  | rating

#### Vue 2.x Example

```HTML
<star-rating @rating-selected ="setRating"></star-rating>
```

Then in your view model:

```javascript
new Vue({
  el: '#app',
  methods: {
    setRating: function(rating){
      this.rating= rating;
    }
  },
  data: {
    rating: 0
  }
});
```

### Vue 3.x Events

Some changes have been made to event names in Vue 3

| Event  | Description | Return Value
| ------------- | ------------- |-----------|
| update:rating  | Returns the rating the user selects via the click event |  rating
| hover:rating  | Returns the rating that the users mouse is currently over  | rating


#### Vue 3.x Example

```HTML
<star-rating @update:rating ="setRating"></star-rating>
```

Then in your view model:

```javascript
const app = Vue.createApp({
  methods: {
    setRating(rating){
      this.rating= rating;
    }
  },
  data: {
    rating: 0
  }
})
app.component('star-rating', VueStarRating.default)
app.mount('#app')

```

### IE9 Support

  `vue-star-rating` supports IE 9+; make sure you place the following in the `head` of your webpage to ensure that IE is in standards mode:

`<meta http-equiv="X-UA-Compatible" content="IE=Edge">`


------------------------------------------------

Open-source should always be 100% FREE! but, if you're feeling generous, feel free to:

<a href="https://www.buymeacoffee.com/fkocI2e6H" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
