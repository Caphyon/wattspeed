import { shallowMount, config } from "@vue/test-utils";
import accessibility from "../../src/components/panels/tech/items/mobile-item.vue"; // name of your Vue component

let data = {
  passed: 1,
  title: 'Has a `<meta name="viewport">` tag with `width` or `initial-scale`',
};
let data2 = {
  title: 'Has a `<meta name="viewport">` tag with `width` or `initial-scale`',
}

describe("mobile-item.vue", () => {
  it("Snapshot for mobile-item component with data ", () => {
    const wrapper = shallowMount(accessibility, {
      propsData: {
        data: data
      }
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--success').exists()).toBe(true);

  });

  it("Snapshot for mobile-item component without data", () => {
    const wrapper = shallowMount(accessibility, {
      propsData: {
        data: data2
      }
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.alert--danger').exists()).toBe(true);

  });
});
