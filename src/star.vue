<template>
    <div>
        <svg :height="size" :width="size" @mousemove="mouseMoving" @click="selected">

            <linearGradient :id="grad" x1="0" x2="100%" y1="0" y2="0">
                <stop :offset="fillWidth" :stop-color="activeColor" />
                <stop :offset="fillWidth" :stop-color="inactiveColor" />
            </linearGradient>

            <polygon :points="starPointsToString" :fill="'url(#'+grad+')'" :id="id" />

        </svg>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ['fill', 'size', 'id', 'activeColor', 'inactiveColor'],
    created() {
        this.calculatePoints;
        this.setFill;
        this.grad = Math.random().toString(36).substring(7);
    },
    computed: {
        calculatePoints() {
            this.starPoints = this.starPoints.map((point) => {
                return (this.size / 43) * point;
            });
        },
        starPointsToString() {
            return this.starPoints.join(',');
        },
        setFill() {
            this.fillWidth = this.fill + "%";
        }
    },
    methods: {
        mouseMoving($event) {
            this.$emit('star-mouse-move', {
                event: $event,
                position: this.getPosition($event),
                id: this.id
            })
        },
        getPosition($event){
            // calculate position in percentage.
            var starWidth = (92 / 100) * this.size;
            var position = Math.round((100 / starWidth) * $event.offsetX);

            return (position > 100) ? 100 : position;
        },
        selected($event) {
            this.$emit('star-selected', {
                id: this.id,
                position: this.getPosition($event)
            })
        }
    },
    watch: {
        fill(val) {
            this.fillWidth = val;
            this.setFill;
        }
    },
    data() {
        return {
            fillWidth: "0%",
            starPoints: [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56],
            grad: ''
        }
    }
}
</script>
