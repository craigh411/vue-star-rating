<template>
    <div>
        <star-rating v-model="rating" :roundedCorners="true"></star-rating> {{rating}}
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
