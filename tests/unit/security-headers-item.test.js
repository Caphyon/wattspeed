import { shallowMount } from "@vue/test-utils";
import security_headers_item from "../../src/components/panels/tech/items/security-headers-item";

describe("security-ssl-item.vue", () => {
  it("Snapshot for component level danger", () => {
    const wrapper = shallowMount(security_headers_item, {
      propsData: {
        title: 'Strict-Transport-Security',
        data: {
          value: 'NA',
          set: false,
        },
      },
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.scrollable--issue.alert--danger').exists()).toBe(true);
    expect(wrapper.find('div.scrollable--issue.alert--success').exists()).toBe(false);
    wrapper.destroy();
  });

  it("Snapshot for component level success", () => {
    const wrapper = shallowMount(security_headers_item, {
      propsData: {
        title: 'Strict-Transport-Security',
        data: {
          value: 'max-age=31536000',
          set: true,
        },
      },
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.scrollable--issue.alert--danger').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--success').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Snapshot for component level success_noValue", () => {
    const wrapper = shallowMount(security_headers_item, {
      propsData: {
        title: 'X-Frame-Options',
        data: {
          value: 'NA',
          set: true,
        },
      },
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.scrollable--issue.alert--danger').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--success').exists()).toBe(true);
    wrapper.destroy();
  });

});
