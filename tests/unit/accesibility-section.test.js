import { shallowMount, config } from "@vue/test-utils";
import accesibility_section from "../../src/components/sections/accesibility-section";
import Vue from "vue"; // name of your Vue component

describe("Testing Accesibility-Section component", () => {
  global.EventBus = new Vue();

  config.methods["allAccessibility"] = () => {}
  const wrapper = shallowMount(accesibility_section);
  it("Score 100", () => {
    wrapper.setData({
      score: 100,
      issues: 2,
      warnings: 1
    })
    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();

    // check if the divs are presents
    expect(wrapper.find("p.alert--success").exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Score under 100", () => {
    wrapper.setData({
      score: 67,
      issues: 2,
      warnings: 1
    })
    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();

    // check if the divs are presents
    expect(wrapper.find("p.alert--success").exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });
});
