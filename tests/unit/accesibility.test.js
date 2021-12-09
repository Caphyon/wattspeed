import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import container from '@/components/panels/tech/container';
import accessibility from "../../src/components/panels/tech/accessibility"; // name of your Vue component
import accessibility_status from '@/components/panels/tech/items/accessibility-status';

global.EventBus = new Vue();
const localVue = createLocalVue();

const response = {
  audits: {
    'frame-title': {
      title: '`<frame>` or `<iframe>` elements do not have a title',
      description: 'Screen reader users rely on frame titles to describe the contents of frames. [Learn more](https://web.dev/frame-title/).',
      score: 0,
      id: 'frame-title',
      details: {
        debugData: {
          impact: 'serious',
        },
        items: [
          { node: { snippet: '<iframe src=\"/howto/tryhow_js_slideshow_ifr.htm\" id=\"howto_iframe\">' }},
        ],
      },
    },
  },
  categories: {
    accessibility: {
      score: 0.72,
      auditRefs: [{ id: 'frame-title', weight: 3 }],
    },
  },
};

const data = {
  score: 0,
  issues: 1,
  warnings: 0,
  loading: false,
  initialData: [
    {
      title: '`<frame>` or `<iframe>` elements do not have a title',
      description: 'Screen reader users rely on frame titles to describe the contents of frames. [Learn more](https://web.dev/frame-title/).',
      severity: 'serious',
      class: 'alert--danger',
      type: 'Errors',
    },
  ],
};

const noData = {
  score: 0,
  issues: 0,
  warnings: 0,
  initialData: [],
  loading: false,
};

function createWrapper(data) {
  return shallowMount(accessibility, {
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

describe("Testing Accesibility component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Global", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify({}) }));
    const wrapper = createWrapper(noData);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.findComponent(accessibility_status).exists()).toBeTruthy();
    expect(wrapper.find('div.state .state--success').exists()).toBe(false);
    expect(wrapper.find('h3.text--success').exists()).toBe(false);
    wrapper.destroy();
  });

  it("With data, score under 100", () => {
    data.score = 72;
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.findComponent(accessibility_status).exists()).toBeTruthy();
    expect(wrapper.find('div.state .state--success').exists()).toBe(false);
    expect(wrapper.find('h3.text--success').exists()).toBe(false);
    wrapper.destroy();
  });

  it("With data, score 100", () => {
    response.audits['frame-title'].score = null;
    response.categories.accessibility.score = 1;
    data.score = 100;
    data.issues = 0;
    data.initialData = [];
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.findComponent(accessibility_status).exists()).toBeFalsy();
    expect(wrapper.find('div.state .state--success').exists()).toBe(true);
    expect(wrapper.find('h3.text--success').exists()).toBe(true);
    wrapper.destroy();
  });

});
