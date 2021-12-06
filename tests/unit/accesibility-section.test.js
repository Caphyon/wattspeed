import { createLocalVue, shallowMount } from "@vue/test-utils";
import accessibility_section from "../../src/components/sections/accesibility-section";
import Vue from "vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

const methods = {
  allAccessibility: jest.fn(),
};

const data = {
  score: 0,
  issues: 1,
  warnings: 0,
  loading: false,
};

function createWrapper() {
  return shallowMount(accessibility_section, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("Testing Accesibility-Section component", () => {
  it("Score 100", () => {
    data.score = 100;
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();

    // check if the divs are presents
    expect(wrapper.find("p.alert--success").exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
    wrapper.destroy();
  });

  it("Score under 100", () => {
    data.score = 67;
    const wrapper = createWrapper(data);
    
    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();

    // check if the divs are presents
    expect(wrapper.find("p.alert--success").exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    const allAccessibilityMock = jest.fn();
    const wrapper = createWrapper(data);
    wrapper.setMethods({ allAccessibility : allAccessibilityMock });

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');
    // The mock function is called onc
    expect(allAccessibilityMock.mock.calls.length).toBe(1);
    wrapper.destroy();
  });

});
