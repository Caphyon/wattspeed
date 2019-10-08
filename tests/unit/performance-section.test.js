import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import speed_section from "../../src/components/sections/performance-section.vue"; // name of your Vue component
import speed_score from "../../src/components/panels/tech/items/performance-score.vue";

global.EventBus = new Vue();

describe("performance-section.vue", () => {

  config.methods["getPerformance"] = () => {};
  const wrapper = shallowMount(speed_section);

  it("Testing performance-section.vue component", () => {

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.contains(speed_score)).toBe(true)
    wrapper.find(speed_score).vm.$emit('score', 'type = "Mobile"')
    wrapper.find(speed_score).vm.$emit('score', 'type = "Desktop"')

  });

  it('should return how many times the method is called inside the event bus', () => {
    const getPerformanceMock = jest.fn();
    wrapper.setMethods({ getPerformance: getPerformanceMock })

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');

    // The mock function is called twice
    expect(getPerformanceMock.mock.calls.length).toBe(2);
  });

});
