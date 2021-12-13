import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import pair_container from '@/components/panels/tech/pair-container';
import mobile from '@/components/panels/tech/mobile';  // name of your Vue component
import mobile_item from '@/components/panels/tech/items/mobile-item';

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
  mobile_friendly: 'This page is mobile friendly!',
  not_mobile_friendly: '',
  loading: false,
};

function createWrapper(data) {
  return shallowMount(mobile, {
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

describe("Testing Mobile component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Container with data", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are presents
    expect(wrapper.findComponent(pair_container).exists()).toBeTruthy();
    expect(wrapper.find("h3.text--success.text--center").exists()).toBe(true);
    expect(wrapper.find(".scrollable__container").exists()).toBe(true);
    expect(wrapper.findAllComponents(mobile_item).length).toBe(4);
    expect(wrapper.find(".scrollable__container div.mobile img").exists()).toBe(true);
    wrapper.destroy();
  });

});
