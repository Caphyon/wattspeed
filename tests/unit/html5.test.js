import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import container from '@/components/panels/tech/container';
import html5 from '@/components/panels/tech/html5'; // name of your Vue component
import filter_item from '@/components/panels/tech/items/filter-item';

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
const emptyResponse = {
  messages: [],
};

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
  return shallowMount(html5, {
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

describe('html5.vue', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testing html5 component with issues', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(response) }));
    const wrapper = createWrapper(data);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.find('.html5-status.text--danger').exists()).toBeTruthy();
    expect(wrapper.find('.html5-status.text--danger').text()).toBe("Html issues found while checking the page.");

    expect(wrapper.find('.list-unstyled').exists()).toBeTruthy();
    expect(wrapper.findAll('li').length).toBe(1);
    expect(wrapper.findAll('li > p').length).toBe(1);

    expect(wrapper.find('div.state .state--success').exists()).toBeFalsy();
    expect(wrapper.findComponent(filter_item).exists()).toBeTruthy();
    wrapper.destroy();
  });

  it('Testing html5 component with no issues', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ body: JSON.stringify(emptyResponse) }));
    const wrapper = createWrapper(noData);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(container).exists()).toBeTruthy();
    expect(wrapper.find('.html5-status.text--success').exists()).toBeTruthy();
    expect(wrapper.find('.html5-status.text--success').text()).toBe("No html issues found.");
    expect(wrapper.find('.html5-status.text--danger').exists()).toBeFalsy();

    expect(wrapper.find('div.state .state--success').exists()).toBeTruthy();
    // expect(wrapper.findComponent(filter_item).exists()).toBeFalsy();
    wrapper.destroy();
  });

});
