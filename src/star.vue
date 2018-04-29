<template>
    <svg :height="getSize" :width="getSize" @mousemove="mouseMoving" @click="selected" style="overflow:visible;">

        <linearGradient :id="grad" x1="0" x2="100%" y1="0" y2="0">
            <stop :offset="getFill" :stop-color="(rtl) ? inactiveColor : activeColor" />
            <stop :offset="getFill" :stop-color="(rtl) ? activeColor : inactiveColor" />
        </linearGradient>

        <filter id="glow">
            <feGaussianBlur :stdDeviation="glow" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>

        <polygon :points="starPointsToString" :fill="getGradId" :stroke="glowColor"
              filter="url(#glow)" v-show="fill > 1" />

        <polygon :points="starPointsToString" :fill="getGradId" :stroke="getBorderColor" :stroke-width="border" :stroke-linejoin="roundedCorners ? 'round' : 'miter'" />
        <polygon :points="starPointsToString" :fill="getGradId" />

    </svg>
</template>

<script type="text/javascript">
export default {
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
        borderWidth: {
            type: Number,
            default: 0
        },
        roundedCorners: {
            type: Boolean,
            default: false
        },
        padding: {
            type: Number,
            default: 0
        },
        rtl: {
            type: Boolean,
            default: false
        },
        glow: {
            type: Number,
            default: 0
        },
        glowColor:{
            type: String,
            required:false
        }
    },
    created() {
        if (this.points.length) {
            this.starPoints = this.points
        }
        this.calculatePoints
        this.grad = Math.random().toString(36).substring(7)
    },
    computed: {
        calculatePoints() {
            this.starPoints = this.starPoints.map((point) => {
                return ((this.size / 43) * point) + (this.border* 1.5)
            })
        },
        starPointsToString() {
            return this.starPoints.join(',')
        },
        getGradId() {
            return 'url(#' + this.grad + ')'
        },
        getSize() {
            // Adjust star size when rounded corners are set with no border, to account for the 'hidden' border
            let size = (this.roundedCorners && this.borderWidth <= 0) ? this.size - this.border : this.size
            return parseInt(size) + parseInt(this.border * 3) + this.padding
        },
        getFill() {
            return (this.rtl) ? 100 - this.fill + '%' : this.fill + '%'
        },
        border() {
            return (this.roundedCorners && this.borderWidth <= 0) ? 4 : this.borderWidth
        },
        getBorderColor() {
            if(this.roundedCorners && this.borderWidth <= 0){
                // create a hidden border
                return (this.fill <= 0) ? this.inactiveColor : this.activeColor
            }

            return this.borderColor
        }
    },
    methods: {
        mouseMoving($event) {
            this.$emit('star-mouse-move', {
                event: $event,
                position: this.getPosition($event),
                id: this.starId
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
        }
    },
    data() {
        return {
            starPoints: [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56],
            grad: ''
        }
    }
}
</script>
