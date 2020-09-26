<template>
  <div style="background: #000;padding:50px;">
    <star-rating
      v-model:rating="rating"
      :round-start-rating="false"
      :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
      border-color="black"
      active-border-color="#ccc"
      :clearable="true"
      inactive-color="#fff"
      :apply-active-color-on-hover="false"
      :animate="true"
      :glow="5"
    />
    <a
      href="#"
      @click.prevent="rating = 3.5"
    >Reset</a>
    {{ rating }}
  </div>
</template>
<script type="text/javascript">
import StarRating from '../../src/star-rating.vue';

export default {
    components: {
        StarRating
    },
    data(){
    	return{
    		rating: 0
    	}
    }
}
</script>
