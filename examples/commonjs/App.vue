<template>
    <div>
        <star-rating v-model="rating" active-color="black" :increment="0.01"></star-rating> {{rating}}
    </div>
</template>

<script type="text/javascript">
import StarRating from '../../dist/star-rating.min.js';

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
