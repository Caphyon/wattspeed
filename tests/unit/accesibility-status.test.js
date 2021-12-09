import { shallowMount, config } from "@vue/test-utils";
import accessibility from "../../src/components/panels/tech/items/accessibility-status"; // name of your Vue component

describe("accessibility-status.vue", () => {
  it("Snapshot for accessibility-item component with data ", () => {
    const wrapper = shallowMount(accessibility,{
      propsData:{
        issues: 1,
        warnings: 1,
        score: 93
      }
    });

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1 > .text--center').exists()).toBe(true);
    expect(wrapper.find('.alert--danger.mt0.mb0').exists()).toBe(true);
    expect(wrapper.findAll('span').length).toBe(3);
    expect(wrapper.findAll('span').wrappers[0].text()).toBe("issues");
    expect(wrapper.findAll('span').wrappers[1].text()).toBe("warnings");
    expect(wrapper.findAll('span').wrappers[2].text()).toBe("score");
    expect(wrapper.find('.text--center > .alert--warning.mt0.mb0').exists()).toBe(true);
    expect(wrapper.find('.text--center > .mt0.mb0').exists()).toBe(true);

  });

  it("Snapshot for accessibility-status component without data", () => {
    const wrapper = shallowMount(accessibility)
    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
  });
});
