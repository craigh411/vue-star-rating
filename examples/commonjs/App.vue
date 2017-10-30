<template>
    <div>
        <star-rating v-model="rating" active-color="black" :increment="1"></star-rating> {{rating}}
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
    		rating: 4.38
    	}
    }
}
</script>
