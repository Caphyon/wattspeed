import { shallowMount } from "@vue/test-utils";
import security_ssl_item from "../../src/components/panels/tech/items/security-ssl-item";

describe("security-ssl-item.vue", () => {
  it("Snapshot for no data", () => {
    const wrapper = shallowMount(security_ssl_item, {
      propsData: {
        message: '',
        type: '',
      },
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.scrollable--issue.alert--danger').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--warning').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--success').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--secondary').exists()).toBe(true);
    wrapper.destroy();
  });

  it("Snapshot for component level danger", () => {
    const wrapper = shallowMount(security_ssl_item, {
      propsData: {
        message: 'The connection to the server is not secure',
        type: 'error',
      },
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.scrollable--issue.alert--danger').exists()).toBe(true);
    expect(wrapper.find('div.scrollable--issue.alert--warning').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--success').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--secondary').exists()).toBe(false);
    wrapper.destroy();
  });

  it("Snapshot for component level warning", () => {
    const wrapper = shallowMount(security_ssl_item, {
      propsData: {
        message: 'This server is using weak cipher suites',
        type: 'warning',
      },
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.scrollable--issue.alert--danger').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--warning').exists()).toBe(true);
    expect(wrapper.find('div.scrollable--issue.alert--success').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--secondary').exists()).toBe(false);
    wrapper.destroy();
  });

  it("Snapshot for component level success", () => {
    const wrapper = shallowMount(security_ssl_item, {
      propsData: {
        message: 'Certificate is trusted',
        type: 'success',
      },
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('div.scrollable--issue.alert--danger').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--warning').exists()).toBe(false);
    expect(wrapper.find('div.scrollable--issue.alert--success').exists()).toBe(true);
    expect(wrapper.find('div.scrollable--issue.alert--secondary').exists()).toBe(false);
    wrapper.destroy();
  });

});
