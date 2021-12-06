import { shallowMount } from "@vue/test-utils";
import tech from "../../src/components/panels/tech.vue"; // name of your Vue component
import tech_section from "../../src/components/sections/tech-section.vue";
import html5_section from "../../src/components/sections/html5-section.vue";
import speed_section from "../../src/components/sections/performance-section.vue";
import security_section from "../../src/components/sections/security-section.vue";
import mixed_section from "../../src/components/sections/mixed-section.vue";
import accessibility_section from "../../src/components/sections/accesibility-section.vue";

describe("Testing tech.vue component", () => {
  it("Should render corectly", () => {
    const wrapper = shallowMount(tech);

    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    // check if the divs are presents
    expect(wrapper.find('.mainContent').exists()).toBe(true);
    expect(wrapper.find('.sections').exists()).toBe(true);

    // check if all the components are imported correctly
    expect(wrapper.contains(tech_section)).toBe(true);
    expect(wrapper.contains(html5_section)).toBe(true);
    expect(wrapper.contains(speed_section)).toBe(true);
    expect(wrapper.contains(security_section)).toBe(true);
    expect(wrapper.contains(mixed_section)).toBe(true);
    expect(wrapper.contains(accessibility_section)).toBe(true);
  });

});
