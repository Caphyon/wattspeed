import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils'
import html5_section from '../../src/components/sections/html5-section.vue'; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

// you can add as many elements with the same structure as you want here
const data = {
  htmlData: {
    language: 'ro',
    messages: [
      {
        message: 'Using “windows-1252” instead of the declared encoding “iso-8859-1”.',
        subType: 'warning',
        type: 'info',
        extract: '<div></div>',
      },
    ],
    url: 'https://www.caphyon.ro/',
  },
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
  return shallowMount(html5_section, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe('Testing html5_section.vue component', () => {
  it('Should render component with data', () => {
    const wrapper = createWrapper(data);
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('p').text()).toBe("Errors found while checking the page.");
    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(1);
    expect(wrapper.findAll('li > p').length).toBe(2);
    wrapper.destroy();
  });

  it('Should render component with no data', () => {
    const wrapper = createWrapper(noData);

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('p').text()).toBe("No errors found.");
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    const allHtmlMock = jest.fn();
    const wrapper = createWrapper(data);
    wrapper.setMethods({ allHtml : allHtmlMock });

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');
    // The mock function is called onc
    expect(allHtmlMock.mock.calls.length).toBe(1);
    wrapper.destroy();
  });

});
