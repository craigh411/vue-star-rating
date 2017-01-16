<template>
    <div>
        <div @mouseleave="resetRating" id="stars">
            <span v-for="n in maxRating" class="star">
      <star :fill="fillLevel[n-1]" :size="starSize" :id="n" :step="step" :active-color="activeColor" :inactive-color="inactiveColor" @star-selected="setRating($event, true)" @star-mouse-move="setRating"></star>    
    </span>
            <span id="#rating-text" v-if="showRating"> {{currentRating}}</span>
        </div>

    </div>
</template>

<script type="text/javascript">
import star from './star.vue';
export default {
    components: {
        star
    },
    props: {
        increment: {
            default: 1
        },
        rating: {
            default: 0
        },
        activeColor: {
            default: "#ffd055"
        },
        inactiveColor: {
            default: "#d8d8d8"
        },
        maxRating: {
            default: 5
        },
        starSize: {
            default: 50
        },
        showRating: {
            default: true
        },
        readOnly: {
            default: false
        }
    },
    created() {
        this.step = this.increment * 100;
        this.currentRating = this.rating;
        this.selectedRating = this.rating;
        this.createStars;
    },
    computed: {
        createStars() {
            this.fillLevel = [];
            this.round;
            for (var i = 0; i < this.maxRating; i++) {
                let level = 0;
                if (i < this.currentRating) {
                    level = (this.currentRating - i > 1) ? 100 : (this.currentRating - i) * 100;
                }
                this.fillLevel[i] = Math.round(level);
            }
        },
        round() {
            var inv = 1.0 / this.increment;
            this.currentRating = Math.ceil(this.currentRating * inv) / inv;
        }
    },
    methods: {
        setRating($event, persist) {
            if (!this.readOnly) {
                let position = $event.position / 100;
                this.currentRating = (($event.id + position) - 1).toFixed(2);
                this.currentRating= (this.currentRating > this.maxRating) ? this.maxRating : this.currentRating;
                this.createStars;
                if (persist) {
                    this.selectedRating = this.currentRating;
                    this.$emit('rating-selected', this.selectedRating);
                } else {
                    this.$emit('current-rating', this.currentRating);
                }
            }
        },
        resetRating() {
            if (!this.readOnly) {
                this.currentRating = this.selectedRating;
                this.createStars;
            }
        }
    },
    watch: {
        rating(val) {
            this.currentRating = val;
            this.createStars;
        }
    },
    data() {
        return {
            step: 0,
            fillLevel: [],
            currentRating: 0,
            selectedRating: 0
        }
    }
}
</script>

<style scoped>
.star {
    display: inline-block;
    cursor: pointer;
}

#stars {
    display: flex;
    align-items: center;
}

#rating-text {
    margin-left: 10px;
}
</style>
