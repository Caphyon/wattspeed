import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import security_section from "../../src/components/sections/security-section.vue"; // name of your Vue component
import security_grade from "../../src/components/panels/tech/items/security-grade.vue";

global.EventBus = new Vue();
const localVue = createLocalVue();

const methods = {
  getSecurity: jest.fn(),
};

const data = {

};

function createWrapper(data) {
  return shallowMount(security_section, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("security-section.vue", () => {
  it("Testing security-section.vue component", () => {
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAll(security_grade).length).toBe(2);
    wrapper.destroy();
  });

  it('should return how many times the method is called inside the event bus', () => {
    const getSecurityMock = jest.fn();

    const wrapper = createWrapper(data);
    wrapper.setMethods({ getSecurity: getSecurityMock })

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');

    // The mock function is called twice
    expect(getSecurityMock.mock.calls.length).toBe(1);
    wrapper.destroy();
  });

});
