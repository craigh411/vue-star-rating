# Star Rating Component for Vue 2.x

A simple, highly customisable star rating component for Vue 2.x.

## Features:

  - SVG stars - scale without loss of quality.
  - Customisable rating increments.
  - Customisable colors.
  - Customisable number of stars.
  - Create read-only stars.
 
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
  
  
