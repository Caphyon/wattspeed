import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import tech_section from "../../src/components/sections/tech-section.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

// you can add as many elements with the same structure as you want here
const data = {
  techs: [
    {
      name: "Google Analytics",
      url: "http://www.google.com/analytics/",
    },
    {
      name: "SVG",
      url: "http://www.w3.org/Graphics/SVG/",
    },
  ],
  loading: false,
};

const noData = {
  techs: [],
  loading: false,
};

const methods = {
  getTechnologies: jest.fn(),
};

function createWrapper(data) {
  return shallowMount(tech_section, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("tech-section.vue", () => {
  it("Testing tech-section.vue component", () => {
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if list exists
    expect(wrapper.find('.list-unstyled').exists()).toBe(true);

    // check if data exists by passing staticly
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(wrapper.vm.$data.techs.length);
    expect(wrapper.findAll('span').length).toBe(wrapper.vm.$data.techs.length);
    wrapper.destroy();
  });

  it("Testing tech-section.vue component when no tech found", () => {
    const wrapper = createWrapper(noData);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    const getTechnologiesMock = jest.fn();
    const wrapper = createWrapper(data);
    wrapper.setMethods({ getTechnologies : getTechnologiesMock });

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');
    // The mock function is called onc
    expect(getTechnologiesMock.mock.calls.length).toBe(1);
    wrapper.destroy();
  });

});
