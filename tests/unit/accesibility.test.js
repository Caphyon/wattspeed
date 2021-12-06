import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import accessibility from "../../src/components/panels/tech/accessibility"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

const methods = {
  allAccessibility: jest.fn(),
};

const data = {
  score: 0,
  issues: 1,
  warnings: 0,
  loading: false,
  data: [
    {
      title: 'Links do not have a discernible name',
      description: 'Link text (and alternate text for images, when used as links) that is discernible...',
      severity: 'serious',
      link: 'https://web.dev/link-name/',
    }
  ],
  initialData: [
    {
      title: 'Links do not have a discernible name',
      description: 'Link text (and alternate text for images, when used as links) that is discernible...',
      severity: 'serious',
      link: 'https://web.dev/link-name/',
      class: 'alert--danger',
      type: 'Errors',
    },
  ],
  filteredData: [
    {
      title: 'Links do not have a discernible name',
      description: 'Link text (and alternate text for images, when used as links) that is discernible...',
      severity: 'serious',
      link: 'https://web.dev/link-name/',
      class: 'alert--danger',
      type: 'Errors',
    },
  ],
  initialFilterTypes: ['Errors'],
};

const noData = {
  score: 0,
  issues: 0,
  warnings: 0,
  data: [],
  initialData: [],
  filteredData: [],
  initialFilterTypes: [],
  loading: false,
};

function createWrapper() {
  return shallowMount(accessibility, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("Testing Accesibility component", () => {
  it("Global", () => {
    const wrapper = createWrapper(noData);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.state').exists()).toBe(false);
    expect(wrapper.find('accessibility-status-stub').exists()).toBe(true);
    wrapper.destroy();
  });

  it("With data, score under 100", () => {
    data.score = 72;
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.state').exists()).toBe(false);
    expect(wrapper.find('accessibility-status-stub').exists()).toBe(true);
    wrapper.destroy();
  });

  it("With data, score 100", () => {
    data.score = 100;
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.state').exists()).toBe(false);
    expect(wrapper.find('h3.text--success').exists()).toBe(true);
    wrapper.destroy();
  });

});
