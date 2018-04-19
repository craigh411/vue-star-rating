<template>
    <div>
        <star-rating v-model="rating" active-color="black" :increment="0.01" :rating="rating" :round-start-rating="false" :glow="3" :border-width="1" glow-color="#cc1166"></star-rating> {{rating}}
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
    		rating: 3.48
    	}
    }
}
</script>
