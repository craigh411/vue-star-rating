<template id="star">
    <div>
        <svg :height="size" :width="size" @mousemove="mouseMoving" @click="selected">

            <mask x="0" y="0" id="half">
                <rect fill="white" height="100%" :width="fillWidth" />
            </mask>
            <polygon :points="starPointsToString" :fill="inactiveColor" />

            <polygon :points="starPointsToString" mask="url(#half)" :fill="activeColor" />
        </svg>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ['fill', 'size', 'id', 'activeColor', 'inactiveColor'],
    created() {
        this.calculatePoints;
        this.setFill;
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
            // Normalise to base 92% to account to margins
            this.fillWidth = (92 / 100) * this.fill + "%";
        },
    },
    methods: {
        mouseMoving($event) {
            // calculate position in percentage!
            var starWidth = (92 / 100) * this.size;
            var position = Math.round((100 / starWidth) * $event.offsetX);
            this.$emit('star-mouse-move', {
                event: $event,
                position: position,
                id: this.id
            })
        },
        selected($event) {
            // calculate position in percentage!
            var starWidth = (92 / 100) * this.size;
            var position = Math.round((100 / starWidth) * $event.offsetX);
            this.$emit('star-selected', {
                id: this.id,
                position: position
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
            starPoints: [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56]
        }
    }
}
</script>
