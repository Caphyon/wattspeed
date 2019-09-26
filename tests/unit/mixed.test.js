import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import mixed_section from "../../src/components/panels/tech/mixed.vue"; // name of your Vue component

global.EventBus = new Vue();

describe("mixed.vue", () => {

  config.methods["allMixed"] = () => {};

  it("Testing mixed.vue component in case no https", () => {
    const wrapper = shallowMount(mixed_section)

    wrapper.setData({
      isHttps: false
    })
    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--warning.text--center.text--strong.mb0').exists()).toBe(true);

  });

  it("Testing mixed.vue component in case contains mixed content", () => {
    const wrapper = shallowMount(mixed_section, {
      computed: {
        hasMixedContent(){
          return true
        }
      }
      });

    wrapper.setData({
      isHttps: true
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--danger.text--center.text--strong.mb0').exists()).toBe(true);

  });

  it("Testing mixed.vue component in case no mixed content", () => {
    const wrapper = shallowMount(mixed_section, {
      computed: {
        hasMixedContent(){
          return false
        }
      }
      });

    wrapper.setData({
      isHttps: true
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.text--success.text--center.text--strong.mb0').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);

  });
});
