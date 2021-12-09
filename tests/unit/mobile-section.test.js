import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import section_container from '@/components/sections/section-container';
import mobile_section from "../../src/components/sections/mobile-section.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

const auditData = {
  viewport: {
    score: 1,
    title: 'Has a `<meta name="viewport">` tag with `width` or `initial-scale`',
  },
  plugins: {
    score: 1,
    title: 'Document avoids plugins',
  },
  'font-size': {
    score: 1,
    title: 'Document uses legible font sizes',
  },
  'content-width': {
    score: 1,
    title: 'Content is sized correctly for the viewport',
  },
  'final-screenshot': {
    details: {
      data: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQA",
    },
  },
};

const response = {
  audits: auditData,
};

const data = {
  data: {
    audits: auditData,
  },
  mobile_friendly: '',
  not_mobile_friendly: '',
  loading: false,
};

function createWrapper(data) {
  return shallowMount(mobile_section, {
    localVue,
    data() {
      return data;
    },
    computed: {
      tab() {
        return "https://example.com";
      },
    },
  });
}

describe("mobile-section component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Should show that is mobile friendly", () => {
    data.mobile_friendly = 'This page is mobile friendly!';
    data.not_mobile_friendly = '';
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.alert--success').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Should show that is not mobile friendly", () => {
    auditData.viewport.score = 0;
    auditData.plugins.score = 0;
    auditData['font-size'].score = 0;
    auditData['content-width'].score = 0;
    data.mobile_friendly = '';
    data.not_mobile_friendly = 'This page is not mobile friendly!';
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.alert--danger').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Should return how many times the method is called inside the EventBus", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);
    const spy = spyOn(wrapper.vm, 'allMobile');
    global.EventBus.$emit('refreshData');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

});
