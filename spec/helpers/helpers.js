import Vue from 'vue'
Vue.config.productionTip = false;

export default {
    getData: function(Component, propsData) {
        const Ctor = Vue.extend(Component)
        const vm = new Ctor({ propsData }).$mount()
        return vm.$data;
    },

    // helper function that mounts and returns the rendered text
    getProps: function(Component, propsData) {
        const Ctor = Vue.extend(Component)
        const vm = new Ctor({ propsData }).$mount()
        return vm.$options.propsData;
    },

    createVM(Component, propsData){
        const Ctor = Vue.extend(Component)
        return new Ctor({ propsData }).$mount()
    },

    doEvent: function(event, el, x, y) {
        let evt = document.createEvent("MouseEvents");

        // Use deprecated initMouseEvent because MouseEvent doesn't exist in PhantomJS apparently ???
        evt.initMouseEvent(event, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
        el.dispatchEvent(evt);
    }
}
