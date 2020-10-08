<template>
  <svg
    :class="['vue-star-rating-star', {'vue-star-rating-star-rotate' : shouldAnimate}]"
    :height="starSize"
    :width="starSize"
    :viewBox="viewBox"
    @mousemove="mouseMoving"
    @click="selected"
    @touchstart="touchStart"
    @touchend="touchEnd"
  >

    <linearGradient
      :id="grad"
      x1="0"
      x2="100%"
      y1="0"
      y2="0"
    >
      <stop
        :offset="starFill"
        :stop-color="(rtl) ? getColor(inactiveColor) : getColor(activeColor)"
        :stop-opacity="(rtl) ? getOpacity(inactiveColor) : getOpacity(activeColor)"
      />
      <stop
        :offset="starFill"
        :stop-color="(rtl) ? getColor(activeColor) : getColor(inactiveColor)"
        :stop-opacity="(rtl) ? getOpacity(activeColor) : getOpacity(inactiveColor)"
      />
    </linearGradient>

    <filter
      :id="glowId"
      height="130%"
      width="130%"
      filterUnits="userSpaceOnUse"
    >
      <feGaussianBlur
        :stdDeviation="glow"
        result="coloredBlur"
      />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <polygon
      v-if="glowColor && glow > 0"
      v-show="fill > 1"
      :points="starPointsToString"
      :fill="gradId"
      :stroke="glowColor"
      :filter="'url(#'+glowId+')'"
      :stroke-width="border"
    />

    <polygon
      :points="starPointsToString"
      :fill="gradId"
      :stroke="getBorderColor"
      :stroke-width="border"
      :stroke-linejoin="strokeLinejoin"
    />
    <polygon
      :points="starPointsToString"
      :fill="gradId"
    />
  </svg>
</template>

<script type="text/javascript">
import AlphaColor from './classes/AlphaColor'

export default {
    name: 'Star',
    props: {
        fill: {
            type: Number,
            default: 0
        },
        points: {
            type: Array,
            default() {
                return []
            }
        },
        size: {
            type: Number,
            default: 50
        },
        starId: {
            type: Number,
            required: true
        },
        activeColor: {
            type: String,
            required: true
        },
        inactiveColor: {
            type: String,
            required: true
        },
        borderColor: {
            type: String,
            default: '#000'
        },
        activeBorderColor: {
            type: String,
            default: '#000'
        },
        borderWidth: {
            type: Number,
            default: 0
        },
        roundedCorners: {
            type: Boolean,
            default: false
        },
        rtl: {
            type: Boolean,
            default: false
        },
        glow: {
            type: Number,
            default: 0
        },
        glowColor: {
            type: String,
            default: null,
            required: false
        },
        animate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            starPoints: [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56],
            grad: '',
            glowId: '',
            isStarActive: true
        }
    },
    computed: {
        starPointsToString() {
            return this.starPoints.join(',')
        },
        gradId() {
            return 'url(#' + this.grad + ')'
        },
        starSize() {
            // Adjust star size when rounded corners are set with no border, to account for the 'hidden' border
            const size = (this.roundedCorners && this.borderWidth <= 0) ? parseInt(this.size) - parseInt(this.border) : this.size
            return parseInt(size) + parseInt(this.border)
        },
        starFill() {
            return (this.rtl) ? 100 - this.fill + '%' : this.fill + '%'
        },
        border() {
            return (this.roundedCorners && this.borderWidth <= 0) ? 6 : this.borderWidth
        },
        getBorderColor() {
            if (this.roundedCorners && this.borderWidth <= 0) {
                // create a hidden border
                return (this.fill <= 0) ? this.inactiveColor : this.activeColor
            }

            return (this.fill <= 0) ? this.borderColor : this.activeBorderColor
        },
        maxSize() {
            return this.starPoints.reduce(function(a, b) {
                return Math.max(a, b)
            })
        },
        viewBox() {
            return '0 0 ' + this.maxSize + ' ' + this.maxSize
        },
        shouldAnimate() {
            return this.animate && this.isStarActive
        },
        strokeLinejoin() {
            return this.roundedCorners ? 'round' : 'miter'
        }
    },
    created() {
        this.starPoints = (this.points.length) ? this.points : this.starPoints
        this.calculatePoints()
        this.grad = this.getRandomId()
        this.glowId = this.getRandomId()
    },
    methods: {
        mouseMoving($event) {
            if ($event.touchAction !== 'undefined') {
                this.$emit('star-mouse-move', {
                    event: $event,
                    position: this.getPosition($event),
                    id: this.starId
                })
            }
        },
        touchStart() {
            this.$nextTick(() => {
                this.isStarActive = true
            })
        },
        touchEnd() {
            this.$nextTick(() => {
                this.isStarActive = false
            })
        },
        getPosition($event) {
            // calculate position in percentage.
            var starWidth = (92 / 100) * this.size
            const offset = (this.rtl) ? Math.min($event.offsetX, 45) : Math.max($event.offsetX, 1)
            var position = Math.round((100 / starWidth) * offset)

            return Math.min(position, 100)
        },
        selected($event) {
            this.$emit('star-selected', {
                id: this.starId,
                position: this.getPosition($event)
            })
        },
        getRandomId() {
            return Math.random().toString(36).substring(7)
        },
        calculatePoints() {
            this.starPoints = this.starPoints.map((point, i) => {
                const offset = i % 2 === 0 ? this.border * 1.5 : 0
                return ((this.size / this.maxSize) * point) + offset
            })
        },
        getColor(color) {
            return new AlphaColor(color).parseAlphaColor().color
        },
        getOpacity(color) {
            return new AlphaColor(color).parseAlphaColor().opacity
        }
    }
}
</script>

<style scoped>
    .vue-star-rating-star {
        overflow: visible !important;
    }

    .vue-star-rating-star-rotate {
        transition: all .25s;
    }

    .vue-star-rating-star-rotate:hover {
        transition: transform 0.25s;
        transform: rotate(-15deg) scale(1.3)
    }
</style>