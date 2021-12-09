import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import container from '@/components/panels/tech/container';
import mixed from "../../src/components/panels/tech/mixed.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

const linksData = ['http://example.com', 'https://www.example.com'];
const response = {
  links: linksData,
  srcs: [],
};

const emptyResponse = {
  links: [],
  srcs: [],
};

const dataWithIssues = {
  mixedContent: {
    links: linksData,
    srcs: [],
  },
  isHttps: true,
  data: {
    status: true,
    results: ['http://example.com'],
  },
  loading: false,
};

const dataNoIssues = {
  mixedContent: {
    links: ['https://example.com'],
    srcs: [],
  },
  data: {
    status: false,
    results: [],
  },
  isHttps: true,
  loading: false,
};

function createWrapper(data) {
  return shallowMount(mixed, {
    localVue,
    data() {
      return data;
    },
    computed: {
      tab() {
        return "https://example.com";
      },
      isUsingHttps() {
        return data.isHttps;
      },
    },
  });
}

describe("mixed.vue", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Testing mixed.vue component in case has mixed content", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(dataWithIssues);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.find('.mixed-status.text--danger').exists()).toBe(true);
    expect(wrapper.find('.state .state--success').exists()).toBeFalsy();
    expect(wrapper.find('.list-unstyled').exists()).toBeTruthy();
    expect(wrapper.findAll('li').length).toBe(1);
    wrapper.destroy();

  });

  it("Testing mixed.vue component in case no mixed content", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(emptyResponse) }));
    const wrapper = createWrapper(dataNoIssues);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.find('.mixed-status.text--success').exists()).toBe(true);
    expect(wrapper.find('.state .state--success').exists()).toBeTruthy();
    expect(wrapper.find('.list-unstyled').exists()).toBeFalsy();
    expect(wrapper.findAll('li').length).toBe(0);
    wrapper.destroy();
  });

  it("Testing mixed.vue component in case no https", () => {
    dataWithIssues.isHttps = false;
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(dataWithIssues);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.find('.mixed-status.text--warning').exists()).toBe(true);
    expect(wrapper.find('.state .state--success').exists()).toBeFalsy();
    wrapper.destroy();
  });

});
