import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import section_container from '@/components/sections/section-container';
import html5_section from '../../src/components/sections/html5-section.vue'; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

// you can add as many elements with the same structure as you want here
const messagesData = {
  messages: [
    {
      message: 'Using “windows-1252” instead of the declared encoding “iso-8859-1”.',
      subType: 'warning',
      type: 'info',
      extract: '<div>an_extract</div>',
    },
  ],
};

const computedData = [
  {
    msg: 'Using “windows-1252” instead of the declared encoding “iso-8859-1”.',
    class: 'alert--warning',
    type: 'Warnings',
    mark: '<div>an_extract</div>',
  },
];

const response = messagesData;

const data = {
  htmlData: messagesData,
  initialData: computedData,
  filteredData: computedData,
  initialFilterTypes: ['Warnings'],
  loading: false,
};

const noData = {
  htmlData: {
    messages: [],
  },
  initialData: [],
  filteredData: [],
  initialFilterTypes: [],
  loading: false,
};

function createWrapper(data) {
  return shallowMount(html5_section, {
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

describe('Testing html5_section component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Should render component with issues', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('p').text()).toBe("Html issues found while checking the page.");
    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(1);
    wrapper.destroy();
  });

  it('Should render component with no issues', () => {
    response.messages = [];
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(noData);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('p').text()).toBe("No html issues found.");
    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);
    const spy = spyOn(wrapper.vm, 'allHtml');
    global.EventBus.$emit('refreshData');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

});
