import Vue from 'vue'
import star from '../src/star.vue'
import helpers from './helpers/helpers.js'

Vue.component('star', star);

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
    data = data || {fired: false, position: 0};

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
        // star points for a star of size 43, hardcoded into star.vue;
        let starPoints = [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56];

        let props = defaultProps;
        props['size'] = 86;

        let data = helpers.getData(star, props);

        let createdStarPoints = data.starPoints;

        // expect each point to be doubled!
        for (var i = 0; i < starPoints.length; i++) {
            expect(createdStarPoints[i]).toEqual(starPoints[i] * 2)
        }
    })

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
            var starWidth = (92 / 100) * 86; // 92 / 100 accounts for margins, 86 is the star size.
            var position = Math.round((100 / starWidth) * x);
            expect(vm.$data.position).toEqual(position);

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
            var starWidth = (92 / 100) * 86; // 92 / 100 accounts for margins, 86 is the star size.
            var position = Math.round((100 / starWidth) * x);
            position = (position > 100) ? 100 : position;
            expect(vm.$data.position).toEqual(position);
        });
    });
});
