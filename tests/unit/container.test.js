import Vue from 'vue';
import { shallowMount, config } from "@vue/test-utils";
import container from "../../src/components/panels/tech/container";

global.EventBus = new Vue();

describe("Testing Container component", () => {
  it("Container with data", () => {
    config.methods['close'] = () => { };
    const wrapper = shallowMount(container, {
      computed: {
        desc() {
          return "Descriere Test"
        }
      }
    });
    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();

    // check if the divs are presents
    expect(wrapper.find(".mainContent").exists()).toBe(true);
    expect(wrapper.find(".section__header").exists()).toBe(true);
    expect(wrapper.find("a.close[aria-label=\"Close button\"]").exists()).toBe(true);
    expect(wrapper.find(".section__header p.text--center").exists()).toBe(true);

    const spy = spyOn(wrapper.vm, 'close')
    wrapper.find('a.close').trigger('click')
    expect(spy).toBeCalled()

    expect(wrapper.element).toMatchSnapshot();
  });
});
