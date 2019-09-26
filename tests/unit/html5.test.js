import Vue from 'vue';
import { shallowMount, config } from '@vue/test-utils'
import html5 from '../../src/components/panels/tech/html5.vue'; // name of your Vue component


// you can add as many elements with the same structure as you want here
let htmlDataMock = {
  language: "ro",
  messages: [
    {
      message: "Using “windows-1252” instead of the declared encoding “iso-8859-1”.",
      subType: "warning",
      type: "warning",
      url: "https://www.caphyon.ro/",
    },
  ],
  url: "https://www.caphyon.ro/"
}

describe('html5.vue', () => {

  global.EventBus = new Vue();
  config.methods['allHtml'] = () => { };
  const wrapper = shallowMount(html5)

  it('Testing html5 component', () => {
    const myMockFn = jest.fn(allHtml => allHtml());
    myMockFn(() => {
      wrapper.setData({
        htmlData: htmlDataMock,
        loading: false
      });
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot()

    expect(wrapper.find('.text--danger.text--center.text--strong.mb0').exists()).toBe(true);
    expect(wrapper.find('.text--danger.text--center.text--strong.mb0').text()).toBe("Errors found while checking the page.");

    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
    expect(wrapper.findAll('li').wrappers.length).toBe(1);
    expect(wrapper.findAll('li > p').wrappers.length).toBe(2);

  })

  it('Testing html5 component with no data', () => {
    const wrapper = shallowMount(html5, {
      computed: {
        isValid(){
          return true
        }
      }
    })

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot()

    expect(wrapper.find('.text--success.text--center.text--strong.mb0').exists()).toBe(true);
    expect(wrapper.find('.text--success.text--center.text--strong.mb0').text()).toBe("No errors found.");
    expect(wrapper.find('svg').exists()).toBe(true);


  });
})
