<template>
    <div>
        <star-rating v-model="rating" active-color="black" :increment="1" :rating="rating" :round-start-rating="false" :rtl="true"></star-rating> {{rating}}
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
