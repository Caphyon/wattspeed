
import { shallowMount } from "@vue/test-utils";
import filter_item from "../../src/components/panels/tech/items/filter-item.vue"; // name of your Vue component

describe("filter-item.vue", () => {

  it("Testing filter-item component", () => {
    const wrapper = shallowMount(filter_item, {
      propsData:{
        filterCategories: ['Success', 'Warnings', 'Errors']
      },
    });
    wrapper.setData({
      Success: 'Success',
      Warnings: 'Warnings',
      Errors: 'Errors'
    })

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findAll('label').length).toBe(3);
    expect(wrapper.find('.cursor--pointer.filter__checkbox.filter--success').exists()).toBe(true);
    expect(wrapper.find('.cursor--pointer.filter__checkbox.filter--warning').exists()).toBe(true);
    expect(wrapper.find('.cursor--pointer.filter__checkbox.filter--danger').exists()).toBe(true);

  })
});
