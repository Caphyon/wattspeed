import { shallowMount, config } from "@vue/test-utils";
import mobile from "../../src/components/panels/tech/mobile";
import Vue from "vue"; // name of your Vue component

describe("Testing Mobile component", () => {
  global.EventBus = new Vue();

  config.methods["allMobile"] = () => {}
  const wrapper = shallowMount(mobile);
  it("Container with data", () => {

    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();

    // check if the divs are presents
    expect(wrapper.find("h3.text--success.text--center").exists()).toBe(true);
    expect(wrapper.find(".scrollable__container").exists()).toBe(true);
    expect(wrapper.find(".scrollable__container div.mobile img").exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
