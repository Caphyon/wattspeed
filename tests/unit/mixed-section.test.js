import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import mixed_section from "../../src/components/sections/mixed-section.vue"; // name of your Vue component

global.EventBus = new Vue();

describe("mixed-section.vue", () => {

  config.methods["allMixed"] = () => {};
  const wrapper = shallowMount(mixed_section)

  it("Testing mixed-section.vue component in case danger", () => {
    const wrapper = shallowMount(mixed_section, {
      computed: {
        hasMixedContent(){
          return true
        }
      }
      });

    wrapper.setData({
      isHttps: true
    })
    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--danger').exists()).toBe(true);

  });

  it("Testing mixed-section.vue component in case no mixed content", () => {
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

    expect(wrapper.find('.alert--success').exists()).toBe(true);

  });

  it("Testing mixed-section.vue component in case no https pages", () => {

    wrapper.setData({
      isHttps: false
    });
    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--warning').exists()).toBe(true);

  });


  it('should return how many times the method is called inside the event bus', () => {

    const allMixedMock = jest.fn();
    wrapper.setMethods({ allMixed: allMixedMock })

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');

    // The mock function is called twice
    expect(allMixedMock.mock.calls.length).toBe(1);
  });

});
