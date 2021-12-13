import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import pair_container from "@/components/panels/tech/pair-container";
import speed from "../../src/components/panels/tech/performance.vue"; // name of your Vue component
import speed_score from "../../src/components/panels/tech/items/performance-score.vue";
import speed_item from "../../src/components/panels/tech/items/performance-item.vue";

global.EventBus = new Vue();
const localVue = createLocalVue();

const response = {
  categories: {
    performance: {
      score: 0.89,
    },
  },
  audits: {
    'first-contentful-paint': {
      title: 'First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).',
      description: 'First Contentful Paint',
      score: 0.79,
    },
  },
};

const messages = [
  {
    title: 'First Contentful Paint marks the time at which the first text or image is painted. <a target="_blank" href="https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint">Learn more</a>.',
    msg: 'First Contentful Paint',
    score: 0.79,
  },
];

const filteredMessages = [
  {
    title: 'First Contentful Paint marks the time at which the first text or image is painted. <a target="_blank" href="https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint">Learn more</a>.',
    msg: 'First Contentful Paint',
    level: 0.79,
    type: 'Warnings',
  },
];

const data = {
  essentialData: {
    mobileScore: 0.89,
    desktopScore: 0.89,
    mobile: messages,
    desktop: messages,
  },
  filteredMobileData: filteredMessages,
  filteredDesktopData: filteredMessages,
  loading: false,
};

const emptyResponse = {};

function createWrapper(data) {
  return shallowMount(speed, {
    localVue,
    computed: {
      tab() {
        return 'https://example.com';
      },
    },
    data() {
      return data;
    },
  });
}

describe("Testing performance component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Rendering speed component with issues", () => {
    fetchMock.mockResponse(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(pair_container).exists()).toBeTruthy();
    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAllComponents(speed_score).length).toBe(2);
    expect(wrapper.findAll('.scrollable__container').exists()).toBe(true);
    expect(wrapper.findAll('.text--center.text--muted.mt0.mb1').length).toBe(2);
    expect(wrapper.findAllComponents(speed_item).length).toBe(2);
    wrapper.destroy();
  });

  it("Renering speed component with no issues", () => {
    response.categories.performance.score = 1;
    response.audits['first-contentful-paint'].score = null;
    data.essentialData.mobileScore = 1;
    data.essentialData.desktopScore = 1;
    fetchMock.mockResponse(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(pair_container).exists()).toBeTruthy();
    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAllComponents(speed_score).length).toBe(2);
    expect(wrapper.findAll('.scrollable__container').exists()).toBe(true);
    expect(wrapper.findAll('.text--center.text--muted.mt0.mb1').length).toBe(2);
    expect(wrapper.findAllComponents(speed_item).length).toBe(2);
    wrapper.destroy();
  });

});
