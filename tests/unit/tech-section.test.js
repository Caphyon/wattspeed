import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import section_container from '@/components/sections/section-container';
import tech_section from "../../src/components/sections/tech-section.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

// you can add as many elements with the same structure as you want here

const techs = [
  {
    name: "Google Analytics",
    url: "http://www.google.com/analytics/",
  },
  {
    name: "SVG",
    url: "http://www.w3.org/Graphics/SVG/",
  },
];

const response = {
  tech: techs,
  json_ld: [],
};

const emptyResponse = {
  tech: [],
  json_ld: [],
};

const data = {
  tech: techs,
  json_ld: [],
  loading: false,
};

const noData = {
  tech: [],
  json_ld: [],
  loading: false,
};

function createWrapper(data) {
  return shallowMount(tech_section, {
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

describe("tech-section.vue", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });
  
  it("Testing tech-section.vue component", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if list exists
    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.list-unstyled').exists()).toBe(true);

    // check if data exists by passing staticly
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(2);
    expect(wrapper.findAll('span').length).toBe(2);
    wrapper.destroy();
  });

  it("Testing tech-section.vue component when no tech found", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(emptyResponse) }));
    const wrapper = createWrapper(noData);

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(0);
    expect(wrapper.findAll('span').length).toBe(0);
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);
    const spy = spyOn(wrapper.vm, 'getTechnologies');
    global.EventBus.$emit('refreshData');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

});
