<template>
    <div>
        <div style="background:#000;overflow:auto;padding:10px;padding-bottom:20px;">
        <star-rating v-model:rating="rating" :increment="0.5" glow-color="#fff" glow="5" :round-start-rating="false" :clearable="true" />
        </div>
        <a href="#" @click.prevent="rating = 3.5" >Reset</a>
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
