import Vue from 'vue'
import star from '../src/star.vue'

describe('Star Component', () => {
    it('has a created hook', () => {
        expect(typeof star.created).toBe('function')
    })

});
