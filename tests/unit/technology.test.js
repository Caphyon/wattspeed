import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import container from '@/components/panels/tech/container';
import technology from "../../src/components/panels/tech/technology.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

// you can add as many elements with the same structure as you want here
const data = {
  tech: [
    {
      name: "Google Analytics",
      url: "http://www.google.com/analytics/",
    },
    {
      name: "SVG",
      url: "http://www.w3.org/Graphics/SVG/",
    },
  ],
  json_ld: [],
  loading: false,
};

const noData = {
  tech: [],
  json_ld: [],
  loading: false,
};

function createWrapper(data) {
  return shallowMount(technology, {
    localVue,
    computed: {
      tab() {
        return "https://example.com";
      },
    },
    data() {
      return data;
    },
  });
}

describe("technology.vue", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Testing technology component", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(data) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are present
    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.find(".scrollable__container").exists()).toBe(true);
    expect(wrapper.findAll(".scrollable__container a.tech").length).toBe(2);
    wrapper.destroy();
  });

  it("Testing technology component without data", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(noData) }));
    const wrapper = createWrapper(noData);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are present
    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.find(".scrollable__container").exists()).toBe(true);
    expect(wrapper.findAll(".scrollable__container a.tech").length).toBe(0);
    wrapper.destroy();
  });

});
