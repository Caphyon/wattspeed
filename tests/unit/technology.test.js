import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import technology from "../../src/components/panels/tech/technology.vue"; // name of your Vue component

// you can add as many elements with the same structure as you want here
let techs = [
  {
    name: "Google Analytics",
    url: "http://www.google.com/analytics/"
  },
  {
    name: "SVG",
    url: "http://www.w3.org/Graphics/SVG/"
  }
];

global.EventBus = new Vue();

describe("technology.vue", () => {
  it("Testing technology component", () => {
    config.methods["allTechnologies"] = () => {};
    const wrapper = shallowMount(technology);

    wrapper.setData({
      techs: techs
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // // check if list exists
    expect(wrapper.find('.scrollable__container').exists()).toBe(true);

    // // check if data exists by passing staticly
    expect(wrapper.find('.tech').exists()).toBe(true);
    expect(wrapper.findAll('span').wrappers.length).toBe(wrapper.vm.$data.techs.length);
    expect(wrapper.findAll('img').wrappers.length).toBe(wrapper.vm.$data.techs.length);
  });

  it("Testing technology component without data", () => {
    config.methods["allTechnologies"] = () => {};
    const wrapper = shallowMount(technology);

    wrapper.setData({
      techs: []
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
