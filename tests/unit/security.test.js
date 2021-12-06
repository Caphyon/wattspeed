import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import security from '../../src/components/panels/tech/security.vue'; // name of your Vue component
import security_grade from '../../src/components/panels/tech/items/security-grade.vue';
import security_headers_item from '../../src/components/panels/tech/items/security-headers-item.vue';
import security_ssl_item from '../../src/components/panels/tech/items/security-ssl-item.vue';

global.EventBus = new Vue();
const localVue = createLocalVue();

const data = {
  securityData: {},
  grades: {
    headersGrade: {
      grade: 'D',
      colour: 'orange',
    },
    sslGrade: {
      grade: 'B',
      colour: 'yellow',
    },
  },
  initialHeadersData: {
    'Strict-Transport-Security': {
      'value': 'max-age=31536000; includeSubDomains',
      'set': true,
    },
    'Content-Security-Policy': {
      'value': 'NA',
      'set': false,
    },
    'X-Frame-Options': {
      'value': 'SAMEORIGIN',
      'set': true,
    },
    'X-Content-Type-Options': {
      'value': 'NA',
      'set': false,
    },
    'Referrer-Policy': {
      'value': 'NA',
      'set': false,
    },
    'Permissions-Policy': {
      'value': 'NA',
      'set': false,
    },
  },
  initialSSLData: {
    'errors': {},
    'warnings': {
      'weakCiphers': 'This server supports weak cipher suites',
      'weakProtocols': 'This server supports weak TLS protocols',
    },
    'success': {
      'chain': 'Certificate is trusted',
    },
  },
  loading: false,
};

const methods = {
  getSecurity: jest.fn(),
};

function createWrapper(data) {
  return shallowMount(security, {
    localVue,
    methods,
    data() {
      return data;
    },
  });
}

describe('security.vue', () => {
  it('Testing speed component', () => {
    const wrapper = createWrapper(data);

    // controll if the component is instance
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBe(true);
    expect(wrapper.findAll(security_grade).length).toBe(2);
    expect(wrapper.findAll('.scrollable__container').exists()).toBe(true);

    expect(wrapper.findAll('.text--center.text--muted.mt0.mb1').length).toBe(2);
    expect(wrapper.findAll(security_headers_item).length).toBe(6);
    expect(wrapper.findAll(security_ssl_item).length).toBe(3);
    wrapper.destroy();
  });

});
