import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import accessibility from "../../src/components/panels/tech/accessibility"; // name of your Vue component

global.EventBus = new Vue();

describe("Testing Accesibility component", () => {
  config.methods["allAccessibility"] = () => {};
  const wrapper = shallowMount(accessibility);

  it("Global", () => {

    wrapper.setData({
      score: 0,
      issues: 0,
      warnings: 0
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.state').exists()).toBe(true);
    expect(wrapper.find('div.state > svg').exists()).toBe(true);
  });

  it("With data, score under 100", () => {

    wrapper.setData({
      score: 67,
      issues: 1,
      warnings: 3
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('accessibility-status-stub').exists()).toBe(true);
  });

  it("With data, score 100", () => {

    wrapper.setData({
      score: 100,
      issues: 0,
      warnings: 0
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('h3.text--success').exists()).toBe(true);
  });
});
