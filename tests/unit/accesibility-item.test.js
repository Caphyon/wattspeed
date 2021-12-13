import { shallowMount, config } from "@vue/test-utils";
import accessibility from "../../src/components/panels/tech/items/accessibility-item"; // name of your Vue component

// you can add as many elements with the same structure as you want here
let accessibilityData = {
  description:
    "Low-contrast text is difficult or impossible for many users to read. ",
  link:
    "https://dequeuniversity.com/rules/axe/2.2/color-contrast?application=lighthouse",
  severity: "serious",
  snippets: [
    "<li>",
    "<li>** Apple&nbsp;Arcade and Apple&nbsp;TV+ require a subscription.</li>",
    "<li>Case and band combinations can be made within collections (Apple&nbsp;Watch, Apple&nbsp;Watch&nbsp;Nike, and Apple&nbsp;Watch&nbsp;Hermès) only.</li>",
    '<div class="ac-gf-footer-shop" x-ms-format-detection="none">\n\t\tMore ways to shop: <a href="/retail/">Find an Apple Store</a> or <a href="https://locate.apple.com/">other retailer</a> near you. <span class="nowrap">Or call 1-800-MY-APPLE.</span>\n\t</div>',
    '<span class="nowrap">Or call 1-800-MY-APPLE.</span>',
    '<div class="ac-gf-footer-legal-copyright">Copyright ©\n\t\t\t\n\t\t\t2019\n\t\t\tApple Inc. All rights reserved.</div>'
  ],
  title:
    "<p>Background and foreground colors do not have a sufficient contrast ratio.</p>\n",
  };

describe("accessibility-item.vue", () => {


  it("Snapshot for accessibility-item component with data", () => {
    const wrapper = shallowMount(accessibility, {
      propsData: {
        data: accessibilityData
      }
    });

    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.scrollable--issue').exists()).toBe(true)
    expect(wrapper.find('.mt0.mb0').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('.list-unstyled').exists()).toBe(true)
    expect(wrapper.findAll('li').length).toBe(6)
  });

  it("Snapshot for accessibility-item component without data", () => {
    const wrapper = shallowMount(accessibility, {
      propsData: {
        data: {}
      }
    });
    // controll if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.scrollable--issue').exists()).toBe(true)
    expect(wrapper.find('.mt0.mb0').exists()).toBe(true)
    expect(wrapper.find('.list-unstyled').exists()).toBe(true)

  });

});
