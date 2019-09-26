import Vue from "vue";
import { shallowMount, config } from "@vue/test-utils";
import speed from "../../src/components/panels/tech/performance.vue"; // name of your Vue component
import speed_score from "../../src/components/panels/tech/items/performance-score.vue";
import speed_item from "../../src/components/panels/tech/items/performance-item.vue";


global.EventBus = new Vue();

describe("performance.vue", () => {

  config.methods["getPerformance"] = () => {};

  it("Testing speed component", () => {
    const wrapper = shallowMount(speed, {
      computed:{
        mobileMessages(){
          return {
            title: "First Contentful Paint",
            level: 0.63,
            msg: "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint).",
          }
        },
        desktopMessages(){
          return {
            title: "First Contentful Paint",
            level: 0.63,
            msg: "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint).",
          }
        }
      }
    });

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAll(speed_score).wrappers.length).toBe(2);

    wrapper.find(speed_score).vm.$emit('score', 'type = "Mobile"');
    wrapper.find(speed_score).vm.$emit('score', 'type = "Desktop"');
    expect(wrapper.findAll('.scrollable__container').exists()).toBe(true);

    expect(wrapper.findAll('.text--center.text--muted.mt0.mb1').wrappers.length).toBe(2);
    wrapper.find(speed_item).vm.$emit('data', 'key');
    expect(wrapper.findAll(speed_item).wrappers.length).toBe(6);



  });

});
