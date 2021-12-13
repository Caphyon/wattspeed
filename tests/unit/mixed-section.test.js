import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import section_container from '@/components/sections/section-container';
import mixed_section from "../../src/components/sections/mixed-section.vue"; // name of your Vue component

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
  return shallowMount(mixed_section, {
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

describe("mixed-section.vue", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Testing mixed-section component in case has mixed content", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(dataWithIssues);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.mixed-status.alert--danger').exists()).toBe(true);
    expect(wrapper.find('.mixed-status.alert--danger').text()).toBe('This site contains mixed content.');
    wrapper.destroy();
  });

  it("Testing mixed-section.vue component in case no mixed content", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(emptyResponse) }));
    const wrapper = createWrapper(dataNoIssues);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.mixed-status.alert--success').exists()).toBe(true);
    expect(wrapper.find('.mixed-status.alert--success').text()).toBe('This page does not contain mixed content.');
    wrapper.destroy();
  });

  it("Testing mixed-section.vue component in case not using https", () => {
    dataWithIssues.isHttps = false;
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(dataWithIssues);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.mixed-status.alert--warning').exists()).toBe(true);
    expect(wrapper.find('.mixed-status.alert--warning').text()).toBe('Does not apply to non HTTPS pages.');
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(dataWithIssues);
    const spy = spyOn(wrapper.vm, 'allMixed');
    global.EventBus.$emit('refreshData');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

});
