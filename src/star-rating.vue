<template>
    <div :class="['star-rating', {inline: inline}]">
        <div @mouseleave="resetRating" class="star-rating">
            <span v-for="n in maxRating" :class="[{pointer: !readOnly }, 'star']">
              <star :fill="fillLevel[n-1]" :size="starSize" :star-id="n" :step="step" :active-color="activeColor" :inactive-color="inactiveColor" :border-color="borderColor" :border-width="borderWidth" :padding="padding" @star-selected="setRating($event, true)" @star-mouse-move="setRating"></star>
            </span>
            <span v-if="showRating" :class="['rating-text', textClass]"> {{currentRating}}</span>
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
            type: Number,
            default: 1
        },
        value: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        activeColor: {
            type: String,
            default: "#ffd055"
        },
        inactiveColor: {
            type: String,
            default: "#d8d8d8"
        },
        maxRating: {
            type: Number,
            default: 5
        },
        starSize: {
            type: Number,
            default: 50
        },
        showRating: {
            type: Boolean,
            default: true
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        textClass: {
            type: String,
            default: ""
        },
        inline: {
            type: Boolean,
            default: false
        },
        borderColor: {
            type: String,
            default: "#999"
        },
        borderWidth: {
            type: Number,
            default: 0
        },
        padding: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.step = this.increment * 100;
        if (this.value !== 0) {
            this.currentRating = this.value;
            this.selectedRating = this.value;
        } else {
            this.currentRating = this.rating;
            this.selectedRating = this.rating;
        }
        this.createStars();
    },
    methods: {
        setRating($event, persist) {
            if (!this.readOnly) {
                let position = $event.position / 100;
                this.currentRating = (($event.id + position) - 1).toFixed(2);
                this.currentRating = (this.currentRating > this.maxRating) ? this.maxRating : this.currentRating;
                this.createStars();
                if (persist) {
                    this.selectedRating = this.currentRating;
                    this.$emit('rating-selected', this.selectedRating);
                    this.$emit('input', this.selectedRating);
                } else {
                    this.$emit('current-rating', this.currentRating);
                }
            }
        },
        resetRating() {
            if (!this.readOnly) {
                this.currentRating = this.selectedRating;
                this.createStars();
            }
        },
        createStars() {
            this.round();
            for (var i = 0; i < this.maxRating; i++) {
                let level = 0;
                if (i < this.currentRating) {
                    level = (this.currentRating - i > 1) ? 100 : (this.currentRating - i) * 100;
                }
                this.$set(this.fillLevel, i, Math.round(level));
            }
        },
        round() {
            var inv = 1.0 / this.increment;
            this.currentRating = Math.ceil(this.currentRating * inv) / inv;
        }
    },
    watch: {
        rating(val) {
            this.currentRating = val;
            this.selectedRating = val;
            this.createStars();
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
}
.pointer {
    cursor: pointer;
}
.star-rating {
    display: flex;
    align-items: center;
}
.inline {
    display: inline-flex;
}
.rating-text {
    margin-top: 7px;
    margin-left: 7px;
}
</style>
