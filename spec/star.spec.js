import Vue from 'vue'
import star from '../src/star.vue'
import helpers from './helpers/helpers.js'

Vue.component('star', star);
Vue.config.productionTip = false;

var defaultProps = {
    fill: 50,
    size: 40,
    starId: 1,
    activeColor: 'yellow',
    inactiveColor: 'grey',
    borderColor: '#000',
    borderWidth: 0,
    padding: 0
};

function getViewInstance(props, data) {
    props = props || defaultProps;
    data = data || { fired: false, position: 0 };

    return new Vue({
        render: function(createElement) {
            return createElement('star', {
                on: {
                    'star-selected': (e) => {
                        this.fired = true;
                        this.position = e.position;
                    },
                    'star-mouse-move': (e) => {
                        this.fired = true;
                        this.position = e.position;
                    },
                },
                props: props,
            });
        },
        data: data
    })
}

describe('Star Component', () => {

    it('should set the props', () => {
        let props = helpers.getProps(star, defaultProps);

        expect(props.fill).toEqual(50);
        expect(props.size).toEqual(40);
        expect(props.starId).toBe(1);
        expect(props.activeColor).toBe('yellow');
        expect(props.inactiveColor).toBe('grey');
        expect(props.borderColor).toBe('#000');
        expect(props.borderWidth).toEqual(0);
        expect(props.padding).toEqual(0);
    })

    it('should scale the star based on size', () => {
        
        let starPoints = [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56];

        // Double maximum size
        let props = defaultProps;
        props['size'] = 87.12;

        let data = helpers.getData(star, props);

        let createdStarPoints = data.starPoints;

        // expect each point to be doubled!
        for (var i = 0; i < starPoints.length; i++) {
            expect(createdStarPoints[i]).toEqual(starPoints[i] * 2)
        }
    })

    it('should set the correct fill level when using rtl', () => {
        let Component = Vue.extend(star);
        Component = Component.extend({
            props: {
                starId: {
                    required: false
                },
                activeColor: {
                    required: false
                },
                inactiveColor: {
                    required: false
                },
                fill:{
                    default: 51
                }
            }
        });

        let component = new Component();

        // left-to-right
        expect(component.getFill).toBe("51%");
        component.rtl = true;
        // right to left
        expect(component.getFill).toEqual("49%");

    });

    it('should set the fill level', () => {

        let props = helpers.getProps(star, defaultProps);

        expect(props.fill).not.toBe(undefined);
        expect(props.fill).not.toEqual(0);
    });

    it('should calculate the correct fill', () => {
        let props = helpers.getProps(star, defaultProps);

        expect(props.fill).toEqual(50);
    });

    it('should create a random gradient id', () => {
        let data = helpers.getData(star, defaultProps);

        expect(data.grad.length > 0).toBeTruthy();
    });

    describe('color parsing function', () => {

        let Component = Vue.extend(star);
        Component = Component.extend({
            props: {
                starId: {
                    required: false
                },
                activeColor: {
                    required: false
                },
                inactiveColor: {
                    required: false
                },
            }
        });
        let component = new Component();

        it('should calculate hex(a) color and opacity', () => {
            expect(component.getColor("#000")).toBe("#000");
            expect(component.getOpacity("#000")).toBe("1");

            expect(component.getColor("#0009")).toBe("#000");
            expect(component.getOpacity("#0009")).toBe("0.60");

            expect(component.getColor("#000000")).toBe("#000000");
            expect(component.getOpacity("#000000")).toBe("1");

            expect(component.getColor("#00000080")).toBe("#000000");
            expect(component.getOpacity("#00000080")).toBe("0.50");
        });

        it('should calculate rgb(a) color and opacity', () => {
            expect(component.getColor('rgb(100, 100, 100)')).toBe("rgb(100, 100, 100)");
            expect(component.getOpacity('rgb(100, 100, 100)')).toBe("1");

            expect(component.getColor('rgba(100, 100, 100, 0)')).toBe("rgb(100, 100, 100)");
            expect(component.getOpacity('rgba(100, 100, 100, 0)')).toBe("0");

            expect(component.getColor('rgba(100, 100, 100, 0.67)')).toBe("rgb(100, 100, 100)");
            expect(component.getOpacity('rgba(100, 100, 100, 0.67)')).toBe(".67");

            expect(component.getColor('rgba(100, 100, 100, .67)')).toBe("rgb(100, 100, 100)");
            expect(component.getOpacity('rgba(100, 100, 100, .67)')).toBe(".67");

            expect(component.getColor('rgba(50%, 50%, 50%, .67)')).toBe("rgb(50%, 50%, 50%)");
            expect(component.getOpacity('rgba(50%, 50%, 50%, .67)')).toBe(".67");

            expect(component.getColor('rgba(100,100,100,.67)')).toBe("rgb(100,100,100)");
            expect(component.getOpacity('rgba(100,100,100,.67)')).toBe(".67");

            expect(component.getColor('rgba(100, 100, 100, 1)')).toBe("rgb(100, 100, 100)");
            expect(component.getOpacity('rgba(100, 100, 100, 1)')).toBe("1");
        });

        it('should calculate hsl(a) color and opacity', () => {
            expect(component.getColor('hsl(100, 50%, 50%)')).toBe("hsl(100, 50%, 50%)");
            expect(component.getOpacity('hsl(100, 50%, 50%)')).toBe("1");

            expect(component.getColor('hsla(100, 50%, 50%, 0)')).toBe("hsl(100, 50%, 50%)");
            expect(component.getOpacity('hsla(100, 50%, 50%, 0)')).toBe("0");

            expect(component.getColor('hsla(100, 50%, 50%, 0.67)')).toBe("hsl(100, 50%, 50%)");
            expect(component.getOpacity('hsla(100, 50%, 50%, 0.67)')).toBe(".67");

            expect(component.getColor('hsla(100, 50%, 50%, .67)')).toBe("hsl(100, 50%, 50%)");
            expect(component.getOpacity('hsla(100, 50%, 50%, .67)')).toBe(".67");

            expect(component.getColor('hsla(100,50%,50%,.67)')).toBe("hsl(100,50%,50%)");
            expect(component.getOpacity('hsla(100,50%,50%,.67)')).toBe(".67");

            expect(component.getColor('hsla(100, 50%, 50%, 1)')).toBe("hsl(100, 50%, 50%)");
            expect(component.getOpacity('hsla(100, 50%, 50%, 1)')).toBe("1");
        });

    })

    describe('dom events', () => {

        var vm;

        beforeEach(() => {
            var el = document.createElement("div");
            el.setAttribute('id', 'app');
            document.body.appendChild(el);
        });

        afterEach(() => {
            vm.$destroy();
            document.body.innerHTML = "";
        });

        it('should emit "star-selected" event on click', () => {
            vm = getViewInstance().$mount("#app");

            let polygon = document.getElementsByTagName('polygon')[0];
            // The absolute (left) position of the star on the page
            let leftPos = polygon.getBoundingClientRect().left;
            let x = Math.floor(Math.random() * 80) + 1;;
            helpers.doEvent('click', polygon, x + leftPos, 0)
            expect(vm.$data.fired).toBeTruthy();

            // expect it to return the correct fill percentage (requires knowledge of the internal calculation)
            var starWidth = (92 / 100) * 87.12; // 92 / 100 accounts for margins, 87.12 is the star size.
            var position = Math.round((100 / starWidth) * x); 
            expect(vm.$data.position).toEqual(Math.min(100, position)); 

        });


        it('should emit "star-mouse-move" event on mousemove', () => {
            vm = getViewInstance().$mount("#app");

            let polygon = document.getElementsByTagName('polygon')[0];
            // The absolute (left) position of the star on the page
            let leftPos = polygon.getBoundingClientRect().left;
            let x = Math.floor(Math.random() * 80) + 1;
            helpers.doEvent('mousemove', polygon, x + leftPos, 0)
            expect(vm.$data.fired).toBeTruthy();

            // expect it to return the correct fill percentage (requires knowledge of the internal calculation)
            var starWidth = (92 / 100) * 87.12; // 92 / 100 accounts for margins, 87.12 is the star size.
            var position = Math.round((100 / starWidth) * x);
            position = (position > 100) ? 100 : position;
            expect(vm.$data.position).toEqual(position);
        });
    });
});
