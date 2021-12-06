import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import mixed_section from "../../src/components/sections/mixed-section.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

const usingHttps = {
  mixedContent: {
    links: ['http://example.com', 'https://www.example.com'],
    srcs: [],
  },
  isHttps: true,
  data: {
    status: true,
    results: ['http://example.com'],
  },
  loading: false,
};

const notUsingHttps = {
  mixedContent: null,
  isHttps: false,
  loading: false,
};

const methods = {
  allMixed: jest.fn(),
};

function createWrapper(data) {
  return shallowMount(mixed_section, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("mixed-section.vue", () => {
  it("Testing mixed-section.vue component in case danger", () => {
    const wrapper = createWrapper(usingHttps);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--danger').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Testing mixed-section.vue component in case no mixed content", () => {
    usingHttps.data.status = false;
    usingHttps.data.results = [];
    const wrapper = createWrapper(usingHttps);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--success').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Testing mixed-section.vue component in case no https pages", () => {
    const wrapper = createWrapper(notUsingHttps);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--warning').exists()).toBe(true);
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    const allMixedMock = jest.fn();
    const wrapper = createWrapper(usingHttps);
    wrapper.setMethods({ allMixed: allMixedMock });

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');

    // The mock function is called twice
    expect(allMixedMock.mock.calls.length).toBe(1);
    wrapper.destroy();
  });

});
