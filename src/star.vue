<template>
    <svg :height="getSize" :width="getSize" @mousemove="mouseMoving" @click="selected">
        <linearGradient :id="grad" x1="0" x2="100%" y1="0" y2="0">
            <stop :offset="getFill" :stop-color="activeColor" />
            <stop :offset="getFill" :stop-color="inactiveColor" />
        </linearGradient>
        <polygon :points="starPointsToString" :fill="getGradId"  :stroke="borderColor" :stroke-width="borderWidth" />
        <polygon :points="starPointsToString" :fill="getGradId" />
    </svg>
</template>

<script type="text/javascript">
export default {
    props: ['fill', 'size', 'starId', 'activeColor', 'inactiveColor', 'borderColor', 'borderWidth', 'padding'],
    created() {
        this.calculatePoints;
        this.grad = Math.random().toString(36).substring(7);
    },
    computed: {
        calculatePoints() {
            this.starPoints = this.starPoints.map((point) => {
                return ((this.size / 43) * point) + (this.borderWidth * 1.5);
            });
        },
        starPointsToString() {
            return this.starPoints.join(',');
        },
        getGradId(){
            return 'url(#'+this.grad+')';
        },
        getSize(){
            return parseInt(this.size) +  parseInt(this.borderWidth * 3) + this.padding;
        },
        getFill(){
          return this.fill + "%";
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
            var starWidth = (92 / 100) * this.size;
            var position = Math.round((100 / starWidth) * $event.offsetX);
            return (position > 100) ? 100 : position;
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
