import Vue from 'vue'
import star from '../src/star.vue'

// helper function that mounts and returns the rendered text
function getRenderedTemplate(Component, propsData) {
    const Ctor = Vue.extend(Component)
    const vm = new Ctor({ propsData }).$mount()
    return vm.$el
}

// helper function that mounts and returns the rendered text
function getData(Component, propsData) {
    const Ctor = Vue.extend(Component)
    const vm = new Ctor({ propsData }).$mount()
    return vm.$data;
}

// helper function that mounts and returns the rendered text
function getProps(Component, propsData) {
    const Ctor = Vue.extend(Component)
    const vm = new Ctor({ propsData }).$mount()
    return vm.$options.propsData;
}

// helper function that mounts and returns the rendered text
function createVM(Component, propsData) {
    const Ctor = Vue.extend(Component)
    return new Ctor({ propsData }).$mount();
}

describe('Star Component', () => {
    it('has a created hook', () => {
        expect(typeof star.created).toBe('function')
    })

    it('should set the props', () => {
        let props = getProps(star, {
            fill: 50,
            size: 40,
            id: 'foo',
            activeColor: 'yellow',
            inactiveColor: 'grey'
        });

        expect(props.fill).toEqual(50);
        expect(props.size).toEqual(40);
        expect(props.id).toBe('foo');
        expect(props.activeColor).toBe('yellow');
        expect(props.inactiveColor).toBe('grey');
    })

    it('should scale the star based on size', () => {
        // star points for a star of size 43, hardcoded into star.vue;
        let starPoints = [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56];

        let data = getData(star, {
            fill: 50,
            size: 86, // double 43
            id: 'foo',
            activeColor: 'yellow',
            inactiveColor: 'grey'
        });

        let createdStarPoints = data.starPoints;

        // expect each point to be doubled!
        for (var i = 0; i < starPoints.length; i++) {
            expect(createdStarPoints[i]).toEqual(starPoints[i] * 2)
        }
    })

    it('should set the fillWidth', () => {
        let data = getData(star, {
            fill: 50,
            size: 86,
            id: 'foo',
            activeColor: 'yellow',
            inactiveColor: 'grey'
        });

        expect(data.fillWidth).not.toBe(undefined);
        expect(data.fillWidth).not.toBe("0%");
    });

    it('should calculate the correct fillWidth', () => {
        let data = getData(star, {
            fill: 50,
            size: 86,
            id: 'foo',
            activeColor: 'yellow',
            inactiveColor: 'grey'
        });

        // Because of margins the star is 92% of the total width, so 50% will be 50% of 92%:
        // (92 / 100) * 50 = 46
        expect(data.fillWidth).toBe("46%");
    });
    
});
