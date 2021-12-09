import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import section_container from "../../src/components/sections/section-container";
import accessibility_section from "../../src/components/sections/accesibility-section";
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
      score: 0.63,
      auditRefs: [{ id: 'frame-title', weight: 3 }],
    },
  },
};

const data = {
  score: 0,
  issues: 1,
  warnings: 0,
  loading: false,
  initialData: [],
};

function createWrapper(data) {
  return shallowMount(accessibility_section, {
    localVue,
    computed: {
      tab() {
        return "https://www.example.com";
      },
    },
    data() {
      return data;
    },
  });
}

describe("Testing Accesibility-Section component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Score 100", () => {
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

    // check if the divs are presents
    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.findComponent(accessibility_status).exists()).toBeFalsy();
    expect(wrapper.find("p.alert--success").exists()).toBe(true);
    wrapper.destroy();
  });

  it("Score under 100", () => {
    data.score = 67;
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);
    
    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are presents
    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.findComponent(accessibility_status).exists()).toBeTruthy();
    expect(wrapper.find("p.alert--success").exists()).toBe(false);
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);
    const spy = spyOn(wrapper.vm, 'allAccessibility');
    global.EventBus.$emit('refreshData');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

});
