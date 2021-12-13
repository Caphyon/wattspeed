import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import section_container from '@/components/sections/section-container';
import security_section from '@/components/sections/security-section';
import security_grade from '@/components/panels/tech/items/security-grade';

global.EventBus = new Vue();
const localVue = createLocalVue();

const data = {
  grades: {
    headersGrade: {
      grade: 'B',
      colour: 'yellow',
    },
    sslGrade: {
      grade: 'A+',
      colour: 'green',
    },
  },
};
const noData = {};
const url = 'https://www.example.com';

function createWrapper(data) {
  return shallowMount(security_section, {
    localVue,
    computed: {
      tab() {
        return url;
      },
    },
    data() {
      return data;
    },
  });
}

describe('Testing security-section component', () => {
  it('Render component with no data', () => {
    fetch.mockResponseOnce(url, {});
    const wrapper = createWrapper(data);

    // Check if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAllComponents(security_grade).length).toBe(2);
    wrapper.destroy();
  });

  it('Render component with data', () => {
    fetch.mockResponseOnce(url, {});
    const wrapper = createWrapper(noData);

    // Check if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.findComponent(section_container).exists()).toBeTruthy();
    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAllComponents(security_grade).length).toBe(2);
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    const wrapper = createWrapper(data);
    const spy = spyOn(wrapper.vm, 'getSecurity');
    global.EventBus.$emit('refreshData');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

});
