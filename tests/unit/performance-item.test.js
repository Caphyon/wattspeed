import { shallowMount, config } from "@vue/test-utils";
import speed_item from "../../src/components/panels/tech/items/performance-item"; // name of your Vue component

describe("performance-item.vue", () => {
  it("Global", () => {
    const wrapper = shallowMount(speed_item, {
      propsData: {
        data: {
          title: "Use video formats for animated content",
          msg: "Large GIFs are inefficient for delivering animated content",
          level: null
        }
      }
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.alert--success.scrollable--issue').exists()).toBe(true);
    expect(wrapper.find('h4').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });

  it("Snapshot for speed-item component level danger", () => {
    const wrapper = shallowMount(speed_item, {
      propsData: {
        data: {
          title: "Use video formats for animated content",
          msg: "Large GIFs are inefficient for delivering animated content",
          level: null
        }
      }
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.alert--success.scrollable--issue.alert--danger').exists()).toBe(true);
  });

  it("Snapshot for speed-item component level warning", () => {
    const wrapper = shallowMount(speed_item, {
      propsData: {
        data: {
          title: "Use video formats for animated content",
          msg: "Large GIFs are inefficient for delivering animated content",
          level: 0.67
        }
      }
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.alert--success.scrollable--issue.alert--warning').exists()).toBe(true);
  });

  it("Snapshot for speed-item component level success", () => {
    const wrapper = shallowMount(speed_item, {
      propsData: {
        data: {
          title: "Use video formats for animated content",
          msg: "Large GIFs are inefficient for delivering animated content",
          level: 1.0
        }
      }
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.alert--success.scrollable--issue.alert--warning').exists()).toBe(false);
    expect(wrapper.find('div.alert--success.scrollable--issue.alert--danger').exists()).toBe(false);

  });
});
