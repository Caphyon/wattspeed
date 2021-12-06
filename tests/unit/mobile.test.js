import { createLocalVue, shallowMount } from "@vue/test-utils";
import mobile from "../../src/components/panels/tech/mobile";
import Vue from "vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

const data = {
  data: {
    audits: {
      'final-screenshot': {
        details: {
          data: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQA",
        },
      }
    },
  },
  mobile_friendly: 'This page is mobile friendly!',
  not_mobile_friendly: '',
  loading: false,
};

const methods = {
  allMobile: jest.fn(),
};

function createWrapper(data) {
  return shallowMount(mobile, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("Testing Mobile component", () => {
  it("Container with data", () => {
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are presents
    expect(wrapper.find("h3.text--success.text--center").exists()).toBe(true);
    expect(wrapper.find(".scrollable__container").exists()).toBe(true);
    expect(wrapper.find(".scrollable__container div.mobile img").exists()).toBe(true);
    wrapper.destroy();
  });

});
