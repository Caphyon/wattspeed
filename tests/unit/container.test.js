import { createLocalVue, shallowMount } from "@vue/test-utils";
import container from "../../src/components/panels/tech/container";

const localVue = createLocalVue();

describe("Testing Container component", () => {
  it("Container with data", () => {
    const wrapper = shallowMount(container, {
      localVue,
      computed: {
        title() {
          return "SECTION";
        },
        desc() {
          return "Descriere Test"
        },
      },
    });

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are presents
    expect(wrapper.find(".mainContent").exists()).toBe(true);
    expect(wrapper.find(".section__header").exists()).toBe(true);
    expect(wrapper.findAll(".sections__container--title").length).toBe(1);
    expect(wrapper.find("a.close[aria-label=\"Close button\"]").exists()).toBe(true);
    expect(wrapper.find(".section__header p.text--center").exists()).toBe(true);

    const spy = spyOn(wrapper.vm, 'close');
    wrapper.find('a.close').trigger('click');
    expect(spy).toBeCalled();
    wrapper.destroy();
  });

});
