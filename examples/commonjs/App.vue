<template>
    <div>
        <star-rating v-model="rating" :increment="1" :rating="rating" :round-start-rating="false" :glow="2.5" :border-width="1"></star-rating> {{rating}}
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
