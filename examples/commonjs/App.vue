<template>
    <div>
<<<<<<< HEAD
        <star-rating v-model="rating" :increment="0.5" :round-start-rating="false" :clearable="true" />
=======
        <star-rating v-model="rating" :round-start-rating="false" />
>>>>>>> master
        <a href="#" @click.prevent="rating = 3.5">Reset</a>
    </div>
</template>
<script type="text/javascript">
import StarRating from '../../src/star-rating.vue';

export default {
    components: {
        StarRating
    },
<<<<<<< HEAD
    data(){
    	return{
    		rating: 3.5
    	}
=======
    created() {
       setTimeout(() => {
            this.rating = 3.5
        }, 1000)

    },
    data() {
        return {
            rating: 0
        }
>>>>>>> master
    }
}
</script>
