import Vue from 'vue';
import { shallowMount, config, } from '@vue/test-utils'
import html5_section from '../../src/components/sections/html5-section.vue'; // name of your Vue component


// you can add as many elements with the same structure as you want here
const htmlDataMock = {
  language: "ro",
  messages: [
    {
      message:
        "Using “windows-1252” instead of the declared encoding “iso-8859-1”.",
      subType: "warning",
      type: "warning",
      url: "https://www.caphyon.ro/"
    }
  ],
  url: "https://www.caphyon.ro/"
}

// const EventBus = new Vue();

// const GlobalPlugins = {
//   install(v) {
//     // Event bus
//     v.prototype.$bus = EventBus;
//   }
// };

// create a local instance of the global bus
// const localVue = createLocalVue();
// localVue.use(GlobalPlugins);

describe('Testing html5_section.vue component', () => {
  let wrapper;
  global.EventBus = new Vue();

  beforeEach(() => {
    config.methods['allHtml'] = () => { };
    wrapper = shallowMount(html5_section);
  });


  it('Should render component with data', () => {
    const myMockFn = jest.fn(allHtml => allHtml());
    myMockFn(() => {
      wrapper.setData({
        htmlData: htmlDataMock,
        loading: false
      });
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('p').text()).toBe("Errors found while checking the page.");
    expect(wrapper.find('.list-unstyled').exists()).toBe(true);
    expect(wrapper.findAll('li').wrappers.length).toBe(1);
    expect(wrapper.findAll('li > p').wrappers.length).toBe(2);


  });

  it('Should render component with no data', () => {
    wrapper.setData({
      htmlData: {},
      loading: false
    });

    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('p').text()).toBe("No errors found.");
  });

  it('should return how many times the method is called inside the event bus', () => {
    const allHtmlMock = jest.fn();
    wrapper.setMethods({ allHtml: allHtmlMock })

    expect(wrapper.isVueInstance).toBeTruthy();
    global.EventBus.$emit('refreshData');
    // The mock function is called onc
    expect(allHtmlMock.mock.calls.length).toBe(1);

  });
})
