import Vue from 'vue'
import starRating from '../src/star-rating.vue'
import helpers from './helpers/helpers.js'

Vue.component('star-rating', starRating);

var defaultProps = {
    increment: 0.1,
    rating: 1,
    activeColor: "red",
    inactiveColor: "black",
    maxRating: 10,
    starSize: 20,
    showRating: false,
    readOnly: true,
    textClass: 'foo'
};

describe('star-rating component', () => {

    it('should set the default props', () => {
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
    });

    it('should set the props', () => {
        let props = helpers.getProps(starRating, defaultProps);

        expect(props.increment).toEqual(0.1);
        expect(props.rating).toEqual(1);
        expect(props.activeColor).toBe("red");
        expect(props.inactiveColor).toBe("black");
        expect(props.maxRating).toEqual(10);
        expect(props.starSize).toEqual(20);
        expect(props.showRating).toBeFalsy();
        expect(props.readOnly).toBeTruthy();
        expect(props.textClass).toBe("foo");
    });

});
