import { createLocalVue, shallowMount } from "@vue/test-utils";
import pair_container from "../../src/components/panels/tech/pair-container";

const localVue = createLocalVue();

describe("Testing Pair Container component", () => {
  it("Pair Container with data", () => {
    const wrapper = shallowMount(pair_container, {
      localVue,
      computed: {
        title() {
          return 'TAB1';
        },
        title2() {
          return 'TAB2';
        },
        desc() {
          return "Test";
        },
      },
    });

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are presents
    expect(wrapper.find(".mainContent").exists()).toBe(true);
    expect(wrapper.find(".section__header").exists()).toBe(true);
    expect(wrapper.findAll(".sections__container--title").length).toBe(2);
    expect(wrapper.find("a.close[aria-label=\"Close button\"]").exists()).toBe(true);
    expect(wrapper.find(".section__header p.text--center").exists()).toBe(true);

    const spy = spyOn(wrapper.vm, 'close');
    wrapper.find('a.close').trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

});
