import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import speed_score from "../../src/components/panels/tech/items/performance-score.vue";

global.EventBus = new Vue();

describe("Testing speed-score comonent", () => {

  it("Should render the score of the page as danger", () => {
    const wrapper = shallowMount(speed_score, {
      propsData: {
        score: 0.14,
        type: "Desktop"
      },
    });
    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--center').exists()).toBe(true);
    expect(wrapper.find('.text--uppercase').exists()).toBe(true);
    expect(wrapper.find('.alert--danger').exists()).toBe(true);


  });

  it("Should render the score of the page as warning", () => {
    const wrapper = shallowMount(speed_score, {
      propsData: {
        score: 0.82,
        type: "Desktop"
      },
    });
    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--center').exists()).toBe(true);
    expect(wrapper.find('.text--uppercase').exists()).toBe(true);
    expect(wrapper.find('.alert--warning').exists()).toBe(true);


  });

  it("Should render the score of the page as success", () => {
    const wrapper = shallowMount(speed_score, {
      propsData: {
        score: 0.99,
        type: "Desktop"
      },
    });
    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--center').exists()).toBe(true);
    expect(wrapper.find('.text--uppercase').exists()).toBe(true);
    expect(wrapper.find('.alert--success').exists()).toBe(true);


  });

});
