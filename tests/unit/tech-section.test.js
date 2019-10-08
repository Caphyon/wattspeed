import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import tech_section from "../../src/components/sections/tech-section.vue"; // name of your Vue component

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

describe("tech-section.vue", () => {
  it("Testing tech-section.vue component", () => {
    config.methods["allTechnologies"] = () => {};
    const wrapper = shallowMount(tech_section);

    wrapper.setData({
      techs: techs
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // // check if list exists
    expect(wrapper.find('.list-unstyled').exists()).toBe(true);

    // check if data exists by passing staticly
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.findAll('li').wrappers.length).toBe(wrapper.vm.$data.techs.length);
    expect(wrapper.findAll('span').wrappers.length).toBe(wrapper.vm.$data.techs.length);
  });

  it("Testing tech-section.vue component when no tech found", () => {
    config.methods["allTechnologies"] = () => {};
    const wrapper = shallowMount(tech_section);

    wrapper.setData({
      techs: []
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
  });
});
