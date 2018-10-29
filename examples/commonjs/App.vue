<template>
    <div>
        <star-rating v-model="rating" :round-start-rating="false" />
        <a href="#" @click.prevent="rating = 3.5">Reset</a>
    </div>
</template>
<script type="text/javascript">
import StarRating from '../../src/star-rating.vue';

export default {
    components: {
        StarRating
    },
    created() {
       setTimeout(() => {
            this.rating = 3.5
        }, 1000)

    },
    data() {
        return {
            rating: 0
        }
    }
}
</script>
