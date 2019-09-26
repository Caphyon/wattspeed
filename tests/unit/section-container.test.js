import { shallowMount } from "@vue/test-utils";
import section_container from "../../src/components/sections/section-container"; // name of your Vue component

describe("Testing Section-Container component", () => {
  it("Basic main container", () => {
    const wrapper = shallowMount(section_container, {
      computed: {
        title() {
          return "Title Test";
        },
        noDataMsg() {
          return "Warning Test";
        },
        error() {
          return "Error Test";
        },
        loading() {
          return true;
        },
        hasData() {
          return true;
        }
      }
    });
    // controll if the component is instance
    expect(wrapper.isVueInstance()).toBeTruthy();

    // check if the divs are presents
    expect(wrapper.find(".sections__container").exists()).toBe(true);

    // Header
    expect(wrapper.find(".sections__container--title").exists()).toBe(true);
    expect(wrapper.find(".sections__container--title > svg").exists()).toBe(
      true
    );

    // Main content
    expect(wrapper.find(".sections__container--content").exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Loading true", () => {
    const wrapper = shallowMount(section_container, {
      computed: {
        title() {
          return "Title Test";
        },
        noDataMsg() {
          return "Warning Test";
        },
        error() {
          return "Error Test";
        },
        loading() {
          return true;
        }
      }
    });

    // loading svg
    expect(
      wrapper
        .find(".sections__container--content > svg path > animatetransform")
        .exists()
    ).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Loading false, error true", () => {
    const wrapper = shallowMount(section_container, {
      computed: {
        title() {
          return "Title Test";
        },
        noDataMsg() {
          return "Warning Test";
        },
        error() {
          return "Error Test";
        },
        loading() {
          return false;
        }
      }
    });

    // loading svg
    expect(
      wrapper
        .find(".sections__container--content > svg path > animatetransform")
        .exists()
    ).toBe(false);
    expect(
      wrapper.find(".sections__container--content p.alert--danger").exists()
    ).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Loading false, error false", () => {
    const wrapper = shallowMount(section_container, {
      computed: {
        title() {
          return "Title Test";
        },
        noDataMsg() {
          return "Warning Test";
        },
        error() {
          return;
        },
        loading() {
          return false;
        }
      }
    });

    // loading svg
    expect(
      wrapper
        .find(".sections__container--content > svg path > animatetransform")
        .exists()
    ).toBe(false);
    expect(
      wrapper.find(".sections__container--content p.alert--warning").exists()
    ).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
