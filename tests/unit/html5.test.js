import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils'
import html5 from '../../src/components/panels/tech/html5.vue'; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

// you can add as many elements with the same structure as you want here
const data = {
  htmlData: {
    language: 'ro',
    messages: [
      {
        message:
          'Using “windows-1252” instead of the declared encoding “iso-8859-1”.',
        subType: 'warning',
        type: 'info',
        extract: '<div></div>',
      },
    ],
    url: 'https://www.caphyon.ro/',
  },
  initialData: [
    {
      msg: 'Using “windows-1252” instead of the declared encoding “iso-8859-1”.',
      mark: '<div></div>',
      type: 'Warnings',
      class: 'alert--warning',
    },
  ],
  filteredData: [
    {
      msg: 'Using “windows-1252” instead of the declared encoding “iso-8859-1”.',
      mark: '<div></div>',
      type: 'Warnings',
      class: 'alert--warning',
    },
  ],
  initialFilterTypes: ['Warnings'],
  loading: false,
};

const noData = {
  htmlData: {},
  loading: false,
};

const methods = {
  allHtml: jest.fn(),
};

function createWrapper(data) {
  return shallowMount(html5, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe('html5.vue', () => {
  it('Testing html5 component', () => {
    const wrapper = createWrapper(data);

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot()

    expect(wrapper.find('.text--danger.text--center.text--strong.mb0').exists()).toBe(true);
    expect(wrapper.find('.text--danger.text--center.text--strong.mb0').text()).toBe("Errors found while checking the page.");

    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(1);
    expect(wrapper.findAll('li > p').length).toBe(2);
    wrapper.destroy();
  });

  it('Testing html5 component with no data', () => {
    const wrapper = createWrapper(noData);

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot()

    expect(wrapper.find('.text--success.text--center.text--strong.mb0').exists()).toBe(true);
    expect(wrapper.find('.text--success.text--center.text--strong.mb0').text()).toBe("No errors found.");
    expect(wrapper.find('svg').exists()).toBe(true);
    wrapper.destroy();
  });

});
