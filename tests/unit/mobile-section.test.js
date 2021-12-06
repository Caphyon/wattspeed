import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import mobile_section from "../../src/components/sections/mobile-section.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

const methods = {
  allMobile: jest.fn(),
};

const data = {
  mobile_friendly: '',
  not_mobile_friendly: '',
  loading: false,
};

function createWrapper(data) {
  return shallowMount(mobile_section, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("mobile-section component", () => {
  it("Should show that is mobile friendly", () => {
    data.mobile_friendly = 'This page is mobile friendly!';
    data.not_mobile_friendly = '';
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--success').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Should show that is not mobile friendly", () => {
    data.mobile_friendly = '';
    data.not_mobile_friendly = 'This page is not mobile friendly!';
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--danger').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Should return how many times the method is called inside the EventBus", () => {
    const allMobileMock = jest.fn();

    const wrapper = createWrapper(data);
    wrapper.setMethods({ allMobile: allMobileMock });

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');

    expect(allMobileMock.mock.calls.length).toBe(1);
    wrapper.destroy();
  });

});
