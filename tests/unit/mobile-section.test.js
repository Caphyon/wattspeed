import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import mobile_section from "../../src/components/sections/mobile-section.vue"; // name of your Vue component

global.EventBus = new Vue();

describe("mobile-section component", () => {

  config.methods["allMobile"] = () => {};
  const wrapper = shallowMount(mobile_section);

  it("Should show that is mobile friendly", () => {

    wrapper.setData({
      mobile_friendly: "This page is mobile friendly!"
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--success').exists()).toBe(true);
  });

  it("Should show that is not mobile friendly", () => {

    wrapper.setData({
      mobile_friendly: '',
      not_mobile_friendly: 'This page is not mobile friendly!'
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--danger').exists()).toBe(true);

  });

  it("Should return how many times the method is called inside the EventBus", () => {
    const allMobileMock = jest.fn();
    wrapper.setMethods({ allMobile: allMobileMock });

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');

    expect(allMobileMock.mock.calls.length).toBe(1);

  });
});
