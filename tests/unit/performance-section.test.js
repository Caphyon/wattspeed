import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import section_container from '@/components/sections/section-container';
import speed_section from '@/components/sections/performance-section';
import speed_score from '@/components/panels/tech/items/performance-score';

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

const responseNoIssue = {
  categories: {
    performance: {
      score: 1,
    },
  },
  audits: {
    'first-contentful-paint': {
      title: 'First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).',
      description: 'First Contentful Paint',
      score: null,
    },
  },
};

const data = {
  essentialData: {
    mobileScore: 0.89,
    desktopScore: 0.89,
    mobile: [],
    desktop: [],
  },
  filteredMobileData: [],
  filteredDesktopData: [],
  loading: false,
};

const dataNoIssue = {
  essentialData: {
    mobileScore: 1,
    desktopScore: 1,
    mobile: [],
    desktop: [],
  },
  filteredMobileData: [],
  filteredDesktopData: [],
  loading: false,
};

function createWrapper(data) {
  return shallowMount(speed_section, {
    localVue,
    computed: {
      tab() {
        return 'https://www.example.com';
      },
    },
    data() {
      return data;
    },
  });
}

describe("Testing performance-section component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Render performance-section with no issues", () => {
    fetchMock.mockResponse(JSON.stringify({ body: JSON.stringify(responseNoIssue) }));
    const wrapper = createWrapper(dataNoIssue);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAllComponents(speed_score).length).toBe(2);
    wrapper.destroy();
  });

  it("Render performance-section with issues", () => {
    fetchMock.mockResponse(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAllComponents(speed_score).length).toBe(2);
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    fetchMock.mockResponse(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);
    const spy = spyOn(wrapper.vm, 'getPerformance');
    global.EventBus.$emit('refreshData');
    expect(spy).toHaveBeenCalledTimes(2);
    wrapper.destroy();
  });

});
