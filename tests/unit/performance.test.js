import Vue from "vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import speed from "../../src/components/panels/tech/performance.vue"; // name of your Vue component
import speed_score from "../../src/components/panels/tech/items/performance-score.vue";
import speed_item from "../../src/components/panels/tech/items/performance-item.vue";

global.EventBus = new Vue();
const localVue = createLocalVue();

const data = {
  filteredMobileData: [
    {
      title: "First Contentful Paint",
      level: 0.63,
      msg: "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint).",
    },
    {
      title: "First Contentful Paint",
      level: 0.63,
      msg: "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint).",
    },
  ],
  essentialData: {
    mobileScore: 100,
    desktopScore: 100,
  },
  loading: false,
};

const methods = {
  getPerformance: jest.fn(),
};

function createWrapper(data) {
  return shallowMount(speed, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe("performance.vue", () => {
  it("Testing speed component", () => {
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAll(speed_score).length).toBe(2);

    wrapper.find(speed_score).vm.$emit('score', 'type = "Mobile"');
    wrapper.find(speed_score).vm.$emit('score', 'type = "Desktop"');
    expect(wrapper.findAll('.scrollable__container').exists()).toBe(true);

    expect(wrapper.findAll('.text--center.text--muted.mt0.mb1').length).toBe(2);
    wrapper.find(speed_item).vm.$emit('data', 'key');
    expect(wrapper.findAll(speed_item).length).toBe(2);
    wrapper.destroy();
  });

});
