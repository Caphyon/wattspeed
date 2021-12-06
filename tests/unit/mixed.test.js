import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import mixed from "../../src/components/panels/tech/mixed.vue"; // name of your Vue component

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
  return shallowMount(mixed, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("mixed.vue", () => {
  it("Testing mixed.vue component in case no https", () => {
    const wrapper = createWrapper(notUsingHttps);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--warning.text--center.text--strong.mb0').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Testing mixed.vue component in case contains mixed content", () => {
    const wrapper = createWrapper(usingHttps);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--danger.text--center.text--strong.mb0').exists()).toBe(true);
    wrapper.destroy();

  });

  it("Testing mixed.vue component in case no mixed content", () => {
    usingHttps.data.status = false;
    usingHttps.data.results = [];
    const wrapper = createWrapper(usingHttps);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--success.text--center.text--strong.mb0').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
    wrapper.destroy();
  });

});
