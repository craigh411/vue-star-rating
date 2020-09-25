<template>
    <div>
        <div style="background:#000;overflow:auto;padding:10px;padding-bottom:20px;">
        <star-rating v-model="rating" :increment="0.5" :clearable="true" active-color="red" :round-start-rating="false" />
        </div>
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
