import {mount, shallowMount} from '@vue/test-utils'
import StarRating from '../src/star-rating.vue'


describe('star-rating component', () => {

    it('should set the default props values', () => {
        const wrapper = mount(StarRating)
        const props = wrapper.props()

        expect(props.increment).toEqual(1);
        expect(props.rating).toEqual(0);
        expect(props.activeColor).toBe("#ffd055");
        expect(props.inactiveColor).toBe("#d8d8d8");
        expect(props.maxRating).toEqual(5);
        expect(props.starSize).toEqual(50);
        expect(props.showRating).toBeTruthy();
        expect(props.readOnly).toBeFalsy();
        expect(props.textClass).toBe("");
        expect(props.inline).toBeFalsy();
        expect(props.borderColor).toBe("#999");
        expect(props.activeBorderColor).toBeNull();
        expect(props.borderWidth).toEqual(0);
        expect(props.padding).toEqual(0);
        expect(props.fixedPoints).toBe(null);
        expect(props.rtl).toBeFalsy();
        expect(props.glow).toEqual(0);
        expect(props.glowColor).toBe('#fff');
        expect(props.clearable).toBeFalsy();
        expect(props.activeOnClick).toBeFalsy();
        expect(props.animate).toBeFalsy();
    });

    it('should set the props', () => {

        let propsData = {
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
            activeBorderColor: "#000",
            borderWidth: 1,
            padding: 5,
            fixedPoints: 2,
            rtl: true,
            glow: 5,
            glowColor: "#000",
            clearable: true,
            activeOnClick: true,
            animate: true
        }

        const wrapper = mount(StarRating, {
            propsData: propsData
        })
        const props = wrapper.props()

        expect(props.increment).toEqual(0.1);
        expect(props.rating).toEqual(1);
        expect(props.activeColor).toBe("red");
        expect(props.inactiveColor).toBe("black");
        expect(props.maxRating).toEqual(10);
        expect(props.starSize).toEqual(20);
        expect(props.showRating).toBeFalsy();
        expect(props.readOnly).toBeTruthy();
        expect(props.borderColor).toBe("#000");
        expect(props.activeBorderColor).toBe("#000");
        expect(props.borderWidth).toEqual(1);
        expect(props.padding).toEqual(5);
        expect(props.fixedPoints).toEqual(2);
        expect(props.rtl).toBeTruthy();
        expect(props.inline).toBeTruthy();
        expect(props.textClass).toBe("foo");
        expect(props.glow).toEqual(5);
        expect(props.glowColor).toBe('#000');
        expect(props.clearable).toBeTruthy();
        expect(props.activeOnClick).toBeTruthy();
        expect(props.animate).toBeTruthy();
    });


    it('should initilise the fillLevel array', () => {
        const wrapper = mount(StarRating)
        expect(wrapper.vm.fillLevel.length).toEqual(5);
    });

    it('should set the correct fillLevel percentages', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                rating: 3
            }
        })

        expect(wrapper.vm.fillLevel[0]).toEqual(100);
        expect(wrapper.vm.fillLevel[1]).toEqual(100);
        expect(wrapper.vm.fillLevel[2]).toEqual(100);
        expect(wrapper.vm.fillLevel[3]).toEqual(0);
        expect(wrapper.vm.fillLevel[4]).toEqual(0);
    });

    it('should round the fillLevel up to the nearest given increment', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                increment: 0.5,
                rating: 1.1
            }
        })

        expect(wrapper.vm.fillLevel[0]).toEqual(100);
        expect(wrapper.vm.fillLevel[1]).toEqual(50);
    });


    it('should not round the fillLevel up to the nearest given increment', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                increment: 0.5,
                rating: 1.1,
                roundStartRating: false
            }
        })

        expect(wrapper.vm.fillLevel[0]).toEqual(100);
        expect(wrapper.vm.fillLevel[1]).toEqual(10);
    });


    it('should set the currentRating and selected Rating based on passed rating prop', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                rating: 2
            }
        })

        expect(wrapper.vm.currentRating).toEqual(2);
        expect(wrapper.vm.selectedRating).toEqual(2);
    });

    it('should set the step based on the given increment', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                increment: 0.1
            }
        })
        expect(wrapper.vm.step).toEqual(10);
    });

    it('should return the correct percentage', () => {

        const wrapper = mount(StarRating, {
            propsData: {
                increment: 0.5
            }
        })
        wrapper.vm.setRating({position: 51, id: 2})
        expect(wrapper.vm.currentRating).toEqual(2);

    });

    it('should return the correct percentage when using rtl', () => {

        const wrapper = mount(StarRating, {
            propsData: {
                increment: 0.5,
                rtl: true
            }
        })
        wrapper.vm.setRating({position: 51, id: 2})
        expect(wrapper.vm.currentRating).toEqual(1.5);

    });

    it('should set the fixed points', () => {

        const wrapper = mount(StarRating, {
            propsData: {
                fixedPoints: 2
            }
        })


        expect(wrapper.vm.formattedRating).toBe("0.00")
    });

    it('should round currentRating to next increment', () => {

        const wrapper = mount(StarRating, {
            propsData: {
                increment: 0.25
            }
        })

        wrapper.vm.setRating({position: 71, id: 1})
        expect(wrapper.vm.currentRating).toEqual(0.75);
    });

    it('should set the fillLevels to currentRating', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                rating: 2
            }
        })
        expect(wrapper.vm.currentRating).toEqual(2);

        let fillLevel = wrapper.vm.fillLevel;

        expect(fillLevel[0]).toEqual(100);
        expect(fillLevel[1]).toEqual(100);
        expect(fillLevel[2]).toEqual(0);
        expect(fillLevel[3]).toEqual(0);
        expect(fillLevel[4]).toEqual(0);
    });

    it('should not round the start rating', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                roundStartRating: false,
                rating: 4.34
            }
        })

        expect(wrapper.vm.currentRating).toEqual(4.34);
    });

    it('should pad the color values with last array value when activeColor is array', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                activeColor: ["red", "black"],
            }
        })

        expect(wrapper.vm.activeColors.length).toEqual(5)
        expect(wrapper.vm.activeColors[4]).toBe("black")
    })

    it('should set the first star color value to first active color in array', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                activeColor: ["red", "black"],
            }
        })

        expect(wrapper.vm.activeColors[0]).toBe("red")
        expect(wrapper.vm.activeColors[1]).toBe("black")
    })

    it('should pad the color values with last array value when activeBorderColor is array', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                activeBorderColor: ["red", "black"],
            }
        })

        expect(wrapper.vm.activeBorderColors.length).toEqual(5)
        expect(wrapper.vm.activeBorderColors[4]).toBe("black")
    })

    it('should set the first star color value to first active border color in array', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                activeBorderColor: ["red", "black"],
            }
        })

        expect(wrapper.vm.activeBorderColors[0]).toBe("red")
        expect(wrapper.vm.activeBorderColors[1]).toBe("black")
    })

    it('should set the screenReader scoped slot to the default', () => {
        const wrapper = mount(StarRating, {
            propsData: {
                rating: 4
            }
        })
        expect(wrapper.text()).toContain('Rated 4 stars out of 5')
    })

    describe('dom events', () => {


        it('should add the given number of stars to the page ', () => {
            const wrapper = mount(StarRating)
            let stars = wrapper.findAll('polygon')

            // expect there to be 15 polygons, because we have 3 polygons for each star to account for border and glow
            // so, 5 stars is 15 polygons
            expect(stars.length).toEqual(15);
        });


        it('should emit hover:rating event on mousemove', async () => {
            const wrapper = mount(StarRating)
            let star = wrapper.find('polygon')
            await star.trigger('mousemove')

            expect(wrapper.emitted()).toHaveProperty('hover:rating')
        });


        it('should emit the update:rating event on click', async () => {
            const wrapper = mount(StarRating)
            let star = wrapper.find('polygon')
            await star.trigger('click')

            expect(wrapper.emitted()).toHaveProperty('update:rating')
        });

        it('should not emit hove:rating when star is readonly ', async () => {
            const wrapper = mount(StarRating, {
                propsData: {
                    readOnly: true
                }
            })

            let star = wrapper.find('polygon')
            await star.trigger('mousemove')

            expect(wrapper.emitted()).not.toHaveProperty('hover:rating')
        });

        it('should not emit update:rating when star is readonly ', async () => {
            const wrapper = mount(StarRating, {
                propsData: {
                    readOnly: true
                }
            })

            let star = wrapper.find('polygon')
            await star.trigger('click')

            expect(wrapper.emitted()).not.toHaveProperty('update:rating')
        });

        it('should display the current rating', () => {
            const wrapper = mount(StarRating)

            expect(wrapper.findAll('.vue-star-rating-rating-text').length > 0).toBeTruthy()
        });

        it('should hide the current rating', () => {
            const wrapper = mount(StarRating, {
                propsData: {
                    showRating: false
                }
            })

            expect(wrapper.findAll('.vue-star-rating-rating-text').length).toEqual(0)
        });

        it('should add the vue-star-rating-pointer class', () => {
            const wrapper = mount(StarRating)

            expect(wrapper.findAll('.vue-star-rating-pointer').length > 0).toBeTruthy()
        });

        it('should not add the pointer class when star is read-only', () => {
            const wrapper = mount(StarRating, {
                propsData: {
                    readOnly: true
                }
            })

            expect(wrapper.findAll('.vue-star-rating-pointer').length).toEqual(0)
        });


        it('should add the textClass class to rating-text', () => {

            const wrapper = mount(StarRating, {
                propsData: {
                    textClass: 'foo'
                }
            })

            expect(wrapper.findAll('.foo').length).toEqual(1);
        });


        it('should add the vue-star-rating-inline class to star-rating', () => {
            const wrapper = mount(StarRating, {
                propsData: {
                    inline: false
                }
            })

            expect(wrapper.findAll('.vue-star-rating-inline').length).toEqual(0);
        });

        it('should add the vue-star-rating-inline class to star-rating', () => {
            const wrapper = mount(StarRating, {
                propsData: {
                    inline: true
                }
            })

            expect(wrapper.findAll('.vue-star-rating-inline').length).toEqual(1);
        });

    });
});
