<template>
    <div>
        <star-rating
            :star-size="100"
            :glow="15"
            :rounded-corners="true"
            :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"/>
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
