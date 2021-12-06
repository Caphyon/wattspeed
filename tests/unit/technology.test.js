import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import technology from "../../src/components/panels/tech/technology.vue"; // name of your Vue component

global.EventBus = new Vue();
const localVue = createLocalVue();

// you can add as many elements with the same structure as you want here
const data = {
  techs: [
    {
      name: "Google Analytics",
      url: "http://www.google.com/analytics/",
    },
    {
      name: "SVG",
      url: "http://www.w3.org/Graphics/SVG/",
    },
  ],
  loading: false,
};

const noData = {
  techs: [],
  loading: false,
};

const methods = {
  getTechnologies: jest.fn(),
};

function createWrapper(data) {
  return shallowMount(technology, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("technology.vue", () => {
  it("Testing technology component", () => {
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are present
    expect(wrapper.find(".scrollable__container").exists()).toBe(true);
    expect(wrapper.findAll(".scrollable__container a.tech").length).toBe(2);
    wrapper.destroy();
  });

  it("Testing technology component without data", () => {
    const wrapper = createWrapper(noData);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are present
    expect(wrapper.find(".scrollable__container").exists()).toBe(true);
    expect(wrapper.findAll(".scrollable__container a.tech").length).toBe(0);
    wrapper.destroy();
  });

});
