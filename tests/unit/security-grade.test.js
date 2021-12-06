import { createLocalVue, shallowMount } from '@vue/test-utils';
import security_grade from '../../src/components/panels/tech/items/security-grade.vue';

const localVue = createLocalVue();

const data = {
  grade: {
    grade: '',
    colour: '',
  },
  section: '',
};

const noData = {};

function createWrapper(data) {
  return shallowMount(security_grade, {
    localVue,
    propsData: data,
  });
}

describe('Test security grade', () => {
  test('Render security-grade with no data', () => {
    const wrapper = createWrapper(noData);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--secondary').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe('NA');
    expect(wrapper.find('.security-grade-section').text()).toBe('');
    wrapper.destroy();
  });

  test('Render grade A+ with color green', () => {
    data.grade.grade = 'A+';
    data.grade.colour = 'green';
    data.section = 'Headers';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--success').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

  test('Render grade A with color green', () => {
    data.grade.grade = 'A';
    data.grade.colour = 'green';
    data.section = 'Headers';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--success').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

  test('Render grade B with color yellow', () => {
    data.grade.grade = 'B';
    data.grade.colour = 'yellow';
    data.section = 'Headers';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--warning').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

  test('Render grade C with color yellow', () => {
    data.grade.grade = 'C';
    data.grade.colour = 'yellow';
    data.section = 'Headers';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--warning').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

  test('Render grade D with color orange', () => {
    data.grade.grade = 'D';
    data.grade.colour = 'orange';
    data.section = 'Headers';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--orange').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

  test('Render grade E with color orange', () => {
    data.grade.grade = 'E';
    data.grade.colour = 'orange';
    data.section = 'Headers';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--orange').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

  test('Render grade F with color red', () => {
    data.grade.grade = 'F';
    data.grade.colour = 'red';
    data.section = 'Headers';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--danger').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

  test('Render grade T with color red', () => {
    data.grade.grade = 'T';
    data.grade.colour = 'red';
    data.section = 'SSL';
    const wrapper = createWrapper(data);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.security-grade-letter.alert--danger').exists()).toBeTruthy();
    expect(wrapper.find('.security-grade-letter').text()).toBe(data.grade.grade);
    expect(wrapper.find('.security-grade-section').text()).toBe(data.section);
    wrapper.destroy();
  });

});