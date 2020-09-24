<template>
    <div>
        <star-rating v-model:rating="rating" :increment="0.5" :round-start-rating="false" :clearable="true" />
        <a href="#" @click.prevent="rating = 3.5">Reset</a>
dd
        {{rating}}
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
    		rating: 3.5
    	}
    }
}
</script>
