import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Container from '@/components/panels/tech/container';
import security from '@/components/panels/tech/security';
import security_grade from '@/components/panels/tech/items/security-grade';
import security_headers_item from '@/components/panels/tech/items/security-headers-item';
import security_ssl_item from '@/components/panels/tech/items/security-ssl-item';

global.EventBus = new Vue();
const localVue = createLocalVue();

const data = {
  body: {
    grades: {
      headersGrade: {
        grade: 'B',
        colour: 'yellow',
      },
      sslGrade: {
        grade: 'A+',
        colour: 'green',
      },
    },
    headersFeedback: {
      headers: {
        'Strict-Transport-Security': {
          value: 'max-age=15552000',
          set: true,
        },
        'Content-Security-Policy': {
          value: 'upgrade-insecure-requests; frame-ancestors \'self\' https://example.com',
          set: true,
        },
        'X-Frame-Options': {
          value: 'SAMEORIGIN',
          set: true,
        },
        'X-Content-Type-Options': {
          value: 'NA',
          set: false,
        },
        'Referrer-Policy': {
          value: 'NA',
          set: false,
        },
        'Permissions-Policy': {
          value: 'NA',
          set: false,
        },
      },
    },
    sslFeedback: {
      errors: {},
      warnings: {
        weakCiphers: 'This server supports weak cipher suites',
      },
      success: {
        chain: 'Certificate is trusted',
        currentBestProtocols: 'This server supports only the current best protocols',
      },
    },
    usesHttps: true,
  },
};

const noData = {
  body: {},
};

const url = [ 'http://example0.com', 'http://example1.com' ];

function createWrapper(url) {
  return shallowMount(security, {
    localVue,
    computed: {
      tab() {
        return url;
      },
    },
    data() {
      return {
        loading: false,
      };
    },
  });
}

describe('Testing security component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Render security component with data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(data), { ok: 1 });
    const wrapper = createWrapper(url[0]);

    // Check if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBeTruthy();
    expect(wrapper.findAllComponents(security_grade).length).toBe(2);
    expect(wrapper.findComponent(Container).exists()).toBeTruthy();
    expect(wrapper.find('.scrollable__container').exists()).toBeTruthy();

    expect(wrapper.findAll('.text--center.text--muted.mt0.mb1').length).toBe(2);
    wrapper.destroy();
  });

  it('Render security component with no data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(noData), { ok: 1 });
    const wrapper = createWrapper(url[1]);

    // Check if the component is instance
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.find('.section__header--stats.px2.py1').exists()).toBeTruthy();
    expect(wrapper.findAllComponents(security_grade).length).toBe(2);
    expect(wrapper.findComponent(Container).exists()).toBeTruthy();
    expect(wrapper.find('.scrollable__container').exists()).toBeTruthy();

    expect(wrapper.findAll('.text--center.text--muted.mt0.mb1').length).toBe(2);
    wrapper.destroy();
  });

});
