import Vue from 'vue'
import starRating from '../src/star-rating.vue'
import helpers from './helpers/helpers.js'

Vue.component('star-rating', starRating);

function getViewInstance(props, data) {
    data = data || { fired: false, position: 0 };

    return new Vue({
        render: function(createElement) {
            return createElement('star-rating', {
                on: {
                    'rating-selected': (e) => {
                        this.position = e;
                    },
                    'current-rating': (e) => {
                        this.position = e;
                    },
                },
                props: props,
            });
        },
        data: data
    })
}

function doEventOnStar(event, vm, position, offset) {
    position = (position * 2) - 1 || 0;
    offset = offset || 1;


    let star = vm.$el.getElementsByTagName('polygon')[position];
    let leftPos = star.getBoundingClientRect().left;

    helpers.doEvent(event, star, leftPos + offset, 0);

}

describe('star-rating component', () => {

    it('should set the default props values', () => {
        let props = helpers.createVM(starRating, {}).$options.props;

        expect(props.increment.default).toEqual(1);
        expect(props.rating.default).toEqual(0);
        expect(props.activeColor.default).toBe("#ffd055");
        expect(props.inactiveColor.default).toBe("#d8d8d8");
        expect(props.maxRating.default).toEqual(5);
        expect(props.starSize.default).toEqual(50);
        expect(props.showRating.default).toBeTruthy();
        expect(props.readOnly.default).toBeFalsy();
        expect(props.textClass.default).toBe("");
        expect(props.inline.default).toBeFalsy();
        expect(props.borderColor.default).toBe("#999");
        expect(props.borderWidth.default).toEqual(0);
        expect(props.padding.default).toEqual(0);
    });

    it('should set the props', () => {

        let props = {
            increment: 0.1,
            rating: 1,
            activeColor: "red",
            inactiveColor: "black",
            maxRating: 10,
            starSize: 20,
            showRating: false,
            readOnly: true,
            textClass: 'foo',
            inline: true,
            borderColor: "#000",
            borderWidth: 1,
            padding: 5
        }

        let propsData = helpers.getProps(starRating, props);

        expect(propsData.increment).toEqual(0.1);
        expect(propsData.rating).toEqual(1);
        expect(propsData.activeColor).toBe("red");
        expect(propsData.inactiveColor).toBe("black");
        expect(propsData.maxRating).toEqual(10);
        expect(propsData.starSize).toEqual(20);
        expect(propsData.showRating).toBeFalsy();
        expect(propsData.readOnly).toBeTruthy();
        expect(propsData.borderColor).toBe("#000");
        expect(propsData.borderWidth).toEqual(1);
        expect(propsData.padding).toEqual(5);

        expect(propsData.inline).toBeTruthy();  expect(propsData.textClass).toBe("foo");
    });


    it('should initilise the fillLevel array', () => {
        let data = helpers.getData(starRating, {});
        expect(data.fillLevel.length).toEqual(5);
    });

    it('should set the correct fillLevel percentages', () => {
        let data = helpers.getData(starRating, { rating: 3 });

        expect(data.fillLevel[0]).toEqual(100);
        expect(data.fillLevel[1]).toEqual(100);
        expect(data.fillLevel[2]).toEqual(100);
        expect(data.fillLevel[3]).toEqual(0);
        expect(data.fillLevel[4]).toEqual(0);
    });

    it('should round the fillLevel up to the nearest given increment', () => {
        let data = helpers.getData(starRating, { increment: 0.5, rating: 1.1 });

        expect(data.fillLevel[0]).toEqual(100);
        expect(data.fillLevel[1]).toEqual(50);
    });

    it('should set the currentRating and selected Rating based on passed rating prop', () => {
        let data = helpers.getData(starRating, { rating: 2 });

        expect(data.currentRating).toEqual(2);
        expect(data.selectedRating).toEqual(2);
    });

    it('should set the step based on the given increment', () => {
        let data = helpers.getData(starRating, { increment: 0.1 });
        expect(data.step).toEqual(10);
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

        it('should add the given number of stars to the page ', () => {
            vm = getViewInstance().$mount("#app");
            // expect there to be 10 polygons, because we have 2 polygones for each star to account for border
            // so, 5 stars is 10 polygons
            expect(vm.$el.getElementsByTagName('polygon').length).toEqual(10);
        });


        it('should set the currentRating on mouse over', () => {
            vm = getViewInstance().$mount("#app");

            expect(vm.$children[0].$data.currentRating).toEqual(0);

            doEventOnStar('mousemove', vm);
            expect(vm.$children[0].$data.currentRating).toEqual(1);

            // mouse over second star
            doEventOnStar('mousemove', vm, 2);
            expect(vm.$children[0].$data.currentRating).toEqual(2);
        });

        it('should set the selectedRating on mouse over', () => {
            vm = getViewInstance().$mount("#app");

            expect(vm.$children[0].$data.selectedRating).toEqual(0);

            doEventOnStar('click', vm);
            expect(vm.$children[0].$data.selectedRating).toEqual(1);

            // mouse over second star
            doEventOnStar('click', vm, 2);
            expect(vm.$children[0].$data.selectedRating).toEqual(2);
        });

        it('should set the currentRating to selectedRating on mouseout', () => {
            vm = getViewInstance().$mount("#app");

            // click on the first star to select it
            doEventOnStar('click', vm);
            expect(vm.$children[0].$data.selectedRating).toEqual(1);

            // mousemove on the second star
            doEventOnStar('mousemove', vm, 2);
            // currentRating should now be 2
            expect(vm.$children[0].$data.currentRating).toEqual(2);

            let starRating = document.getElementsByTagName('div')[1];

            // leave the starRating component, currentRating should reset to 1
            helpers.doEvent('mouseleave', starRating, 0, 0);
            expect(vm.$children[0].$data.currentRating).toEqual(1);
        });

        it('should set the fillLevels to currentRating', () => {
            vm = getViewInstance().$mount("#app");

            // mousemove on the second star
            doEventOnStar('mousemove', vm, 2);
            // currentRating should now be 2
            expect(vm.$children[0].$data.currentRating).toEqual(2);

            let fillLevel = vm.$children[0].$data.fillLevel;

            expect(fillLevel[0]).toEqual(100);
            expect(fillLevel[1]).toEqual(100);
            expect(fillLevel[2]).toEqual(0);
            expect(fillLevel[3]).toEqual(0);
            expect(fillLevel[4]).toEqual(0);
        });

        it('should round currentRating to next increment', () => {
            vm = getViewInstance({ increment: 0.25 }).$mount("#app");

            // move into the third section
            doEventOnStar('mousemove', vm, 1, 26);

            expect(vm.$children[0].$data.currentRating).toEqual(0.75);
        });

        it('should emit "selected-rating" event on click', () => {
            vm = getViewInstance().$mount("#app");

            doEventOnStar('click', vm, 2);
            expect(vm.$data.position).toEqual(2);
        });

        it('should emit "current-rating" event on mousemove', () => {
            vm = getViewInstance().$mount("#app");

            doEventOnStar('mousemove', vm, 1);
            expect(vm.$data.position).toEqual(1);
        });

        it('should display the current rating', () => {
            vm = getViewInstance().$mount("#app");
            expect(document.getElementsByClassName('rating-text')[0]).not.toBe(undefined);
        });

        it('should hide the current rating', () => {
            vm = getViewInstance({ showRating: false }).$mount("#app");
            expect(document.getElementsByClassName('rating-text')[0]).toBe(undefined);
        });

        it('should not update currentRating when star is readonly ', () => {
            vm = getViewInstance({ readOnly: true }).$mount("#app");
            doEventOnStar('mousemove', vm, 2);

            expect(vm.$children[0].$data.currentRating).toEqual(0);
        });

        it('should not update selectedRating when star is readonly ', () => {
            vm = getViewInstance({ readOnly: true }).$mount("#app");
            doEventOnStar('click', vm, 2);

            expect(vm.$children[0].$data.selectedRating).toEqual(0);
        });

        it('should not emit "star-selected" event when star is readonly ', () => {
            vm = getViewInstance({ readOnly: true }).$mount("#app");
            doEventOnStar('click', vm, 2);

            expect(vm.$data.position).toEqual(0);
        });

        it('should not emit "current-rating" event when star is readonly ', () => {
            vm = getViewInstance({ readOnly: true }).$mount("#app");
            doEventOnStar('mousemove', vm, 2);

            expect(vm.$data.position).toEqual(0);
        });

        it('should add the pointer class', () => {
            vm = getViewInstance().$mount("#app");
            let starRating = vm.$children[0].$el.getElementsByTagName('span')[0];

            expect(starRating.className).toBe('pointer star');
        });


        it('should not add the pointer class when star is read-only', () => {
            vm = getViewInstance({ readOnly: true }).$mount("#app");

            let starRating = vm.$children[0].$el.getElementsByTagName('span')[0];

            expect(starRating.className).toBe('star');
        });

        it('should add the textClass class to rating-text', () => {
            vm = getViewInstance({ textClass: 'foo' }).$mount("#app");

            let ratingText = document.getElementsByClassName('rating-text')[0];
            expect(ratingText.className).toBe('rating-text foo');
        });

         it('should not add the inline class to star-rating', () => {
            vm = getViewInstance().$mount("#app");

            let ratingText = document.getElementsByClassName('star-rating')[0];
            expect(ratingText.className).toBe('star-rating');
        });

         it('should add the inline class to star-rating', () => {
            vm = getViewInstance({ inline: true }).$mount("#app");

            let ratingText = document.getElementsByClassName('star-rating')[0];
            expect(ratingText.className).toBe('star-rating inline');
        });
    });
});
