<template>
  <div
    id="svg-container"
    style="display: none"></div>
  <div
    id="app"
    class="watts-extension">
    <nav class="max-h-[46px] min-h-[46px]">
      <a
        href="https://wattspeed.com"
        target="_blank">
        <svg
          width="130"
          height="30"
          class="logo">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            href="#logo" />
        </svg>
      </a>
      <button
        @click="refreshData(true)"
        title="Refresh data"
        class="clickable">
        <svg
          width="18"
          height="18"
          data-icon>
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            href="#refresh" />
        </svg>
      </button>
    </nav>
    <template v-if="requestLimit">
      <div class="quota-exceeded max-h-[508px] min-h-[508px]">
        <h3 class="rounded bg-red-500/20 px-2 text-center font-semibold text-zinc-300/80">
          You have reached your request quota per hour, try again later.
        </h3>
        <svg
          class="watch"
          width="200"
          height="200"
          viewBox="0 0 185 185"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M92.5 185C143.586 185 185 143.586 185 92.5C185 41.4137 143.586 0 92.5 0C41.4137 0 0 41.4137 0 92.5C0 143.586 41.4137 185 92.5 185Z"
            fill="url(#paint0_linear)" />
          <path
            d="M174.4 92.2998C174.4 137.3 137.9 173.8 92.8999 173.8C47.8999 173.8 11.3999 137.3 11.3999 92.2998C11.3999 47.2998 47.8999 10.7998 92.8999 10.7998C137.9 10.7998 174.4 47.1998 174.4 92.2998Z"
            stroke="url(#paint2_linear)"
            stroke-width="2"
            fill="none" />
          <path
            d="M92.8999 161.8C131.284 161.8 162.4 130.684 162.4 92.2998C162.4 53.916 131.284 22.7998 92.8999 22.7998C54.5161 22.7998 23.3999 53.916 23.3999 92.2998C23.3999 130.684 54.5161 161.8 92.8999 161.8Z"
            stroke="url(#paint1_linear)"
            stroke-width="2"
            fill="none" />
          <path
            opacity="0.5"
            d="M92.6001 92.7002V42.7002"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            class="line" />
          <path
            opacity="0.5"
            d="M112.6 113.3L92.6001 92.7998"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            class="line line-alt" />
          <path
            d="M92.5 97.5C95.2614 97.5 97.5 95.2614 97.5 92.5C97.5 89.7386 95.2614 87.5 92.5 87.5C89.7386 87.5 87.5 89.7386 87.5 92.5C87.5 95.2614 89.7386 97.5 92.5 97.5Z"
            fill="white" />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="92.5"
              y1="0"
              x2="92.5"
              y2="322.5"
              gradientUnits="userSpaceOnUse">
              <stop stop-opacity="0" />
              <stop offset="1" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="92.55"
              y1="162.749"
              x2="93.05"
              y2="54.2491"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff" />
              <stop
                offset="1"
                stop-color="#fff"
                stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear"
              x1="93.255"
              y1="9.7507"
              x2="92.67"
              y2="136.719"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF8282" />
              <stop
                offset="1"
                stop-color="#FF8282"
                stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </template>
    <router-view
      v-else
      class="max-h-[508px] min-h-[508px]" />
    <footer class="max-h-[46px] min-h-[46px]">
      <div>
        <p>
          Like what you see? Create a
          <a
            href="https://app.wattspeed.com/signup?utm_source=wattspeedextension&utm_medium=referral"
            target="_blank">
            FREE account
          </a>
          so you can check your website automatically!
        </p>
      </div>
      <ul class="socials">
        <li>
          <a
            href="https://www.advancedwebranking.com/?utm_source=wattspeedextension&utm_medium=referral"
            target="_blank"
            title="Made by Advanced Web Ranking">
            <svg
              width="18"
              height="18"
              data-icon>
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#awr" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/wattspeed"
            target="_blank"
            title="Find us on Twitter">
            <svg
              width="18"
              height="18"
              data-icon>
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#twitter" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Caphyon/wattspeed"
            target="_blank"
            title="View the code on Github">
            <svg
              width="18"
              height="18"
              data-icon>
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#github" />
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
import { ANY, MOBILE, DESKTOP, API_URL } from './assets/scripts/constants.js';

import { computed } from 'vue';
import symbols from './assets/icons/symbols.svg';
import { marked } from 'marked';

let headers = new Headers();
headers.append('Content-Type', 'application/json');

export default {
  data() {
    return {
      METRICS: {
        'crux-url': {
          weight: 15,
          title: 'CrUX URL',
          color: 'lime-500',
          routeName: 'crux-url',
        },
        'crux-origin': {
          weight: 20,
          title: 'CrUX Origin',
          color: 'lime-500',
          routeName: 'crux-origin',
        },
        'performance-mobile': {
          weight: 15,
          title: 'Performance mobile',
          color: 'cyan-500',
          routeName: 'performance',
        },
        'performance-desktop': {
          weight: 15,
          title: 'Performance desktop',
          color: 'cyan-500',
          routeName: 'performance',
        },
        'performance-mobile-subsection': {
          weight: 4,
          title: 'Performance mobile friendly',
          color: 'cyan-500',
          routeName: 'mobile',
        },
        'security-headers': {
          weight: 6,
          title: 'Security headers',
          color: 'emerald-500',
          routeName: 'security',
        },
        'security-ssl': {
          weight: 8,
          title: 'Security SSL',
          color: 'emerald-500',
          routeName: 'security',
        },
        'html-errors': {
          weight: 8,
          title: 'HTML errors',
          color: 'rose-500',
          routeName: 'html',
        },
        'html-warnings': {
          weight: 2,
          title: 'HTML warnings',
          color: 'rose-500',
          routeName: 'html',
        },
        'a11y-score': {
          weight: 7,
          title: 'Accessibility',
          color: 'orange-500',
          routeName: 'a11y',
        },
      },
      score: null,
      crux: null,
      tab: {
        url: null,
      },
      performance: {
        mobile: {
          lighthouse: null,
          score: null,
        },
        desktop: {
          lighthouse: null,
          score: null,
        },
      },
      performanceMobile: null,
      security: null,
      html: null,
      a11y: {
        issuesCount: null,
        score: null,
        audits: null,
      },
      requestLimit: false,
      loading: {
        score: true,
        html: true,
        performance: true,
        performanceMobile: true,
        security: true,
        crux: true,
        a11y: true,
      },
      errors: {
        score: null,
        html: null,
        performance: null,
        performanceMobile: null,
        security: null,
        crux: null,
        a11y: null,
      },
    };
  },
  provide() {
    return {
      loading: computed(() => this.loading),
      errors: computed(() => this.errors),
      score: computed(() => this.score),
      html: computed(() => this.html),
      performance: computed(() => this.performance),
      performanceMobile: computed(() => this.performanceMobile),
      security: computed(() => this.security),
      crux: computed(() => this.crux),
      a11y: computed(() => this.a11y),
      METRICS: computed(() => this.METRICS),
    };
  },
  async mounted() {
    this.loadSvgSymbols();
    if (process.env.NODE_ENV === 'production') {
      await this.getCurrentTab();
    } else {
      this.tab.url = 'https://www.caphyon.com/';
    }

    await this.refreshData();
  },
  methods: {
    async getCurrentTab() {
      let queryOptions = { active: true, lastFocusedWindow: true };
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      let [tab] = await chrome.tabs.query(queryOptions);

      // Filter url and close the app if matched browser empty pages and browser store page
      if (!tab.url.match(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/)) {
        window.close();
      }
      this.tab = tab;
    },
    requestWrapper(request, section, strategy, callback) {
      this.loading[section] = true;
      if (section === 'crux-url' || section === 'crux-origin') {
        section = 'crux';
      }

      return this.makeRequest(request, section, strategy, (data) => {
        if (data.code === 1) {
          this.requestLimit = true;
        } else if (data.code === 2) {
          this.errors[section] = 'Something went wrong, please try again!';
          this.loading[section] = false;
        } else {
          this.errors[section] = null;
          callback(data);
        }
      });
    },
    makeRequest(request, section, strategy, callback) {
      return new Promise((resolve, reject) => {
        // CrUX URL and CrUX Origin are found in the same request
        const cacheKey = this.Buffer.from(`${section}${strategy}${this.tab.url}`).toString('base64');
        const data = localStorage.getItem(cacheKey);

        if (data != null) {
          callback(JSON.parse(data));
        }

        fetch(request)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            reject(response.statusText);
          })
          .then((data) => {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            resolve(callback(data));
          })
          .catch((error) => {
            this.errors[section] = error.message || 'An error occured while fetching the data';
            reject(this.errors[section]);
          });
      });
    },
    loadSvgSymbols() {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', symbols);
        xhr.onload = () => {
          document.getElementById('svg-container').innerHTML = xhr.responseText;
        };
        xhr.send();
      } catch (e) {
        // ignored
      }
    },
    async refreshData(clearStorage) {
      if (clearStorage) {
        this.loading.score = true;
      }

      if (clearStorage) {
        let panels = [
          {
            name: 'score',
            strategies: [ANY],
          },
          {
            name: 'crux',
            strategies: [ANY],
          },
          {
            name: 'performance',
            strategies: [MOBILE, DESKTOP],
          },
          {
            name: 'performanceMobile',
            strategies: [ANY],
          },
          {
            name: 'security',
            strategies: [ANY],
          },
          {
            name: 'html',
            strategies: [ANY],
          },
          {
            name: 'a11y',
            strategies: [ANY],
          },
        ];

        panels.forEach((panel) => {
          panel.strategies.forEach((strategy) => {
            const cacheKey = this.Buffer.from(`${panel.name}${strategy}${this.tab.url}`).toString('base64');
            localStorage.removeItem(cacheKey);
          });
        });
      }

      const promises = [
        this.getCrUX(),
        this.getPerformance(MOBILE),
        this.getPerformance(DESKTOP),
        this.getPerformanceMobile(),
        this.getSecurity(),
        this.getHtmlValidation(),
        this.getA11y(),
      ];

      const scoreCacheKey = this.Buffer.from(`score${ANY}${this.tab.url}`).toString('base64');
      const scoreIsCached = localStorage.getItem(scoreCacheKey);

      if (scoreIsCached) {
        this.getScore(scoreCacheKey);
      }

      await Promise.allSettled(promises)
        .then(() => {
          if (!this.requestLimit && !scoreIsCached) {
            this.getScore(scoreCacheKey);
          }
        })
        .catch((e) => console.log(e));
    },
    normalize(value, inMin, inMax, outMin, outMax, reverse) {
      if (value === null || value === 0) return outMin || 0;

      const normalizedValue = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      return reverse ? outMax - normalizedValue : normalizedValue;
    },
    passesCoreVitals(group) {
      const LCP = 'largest_contentful_paint';
      const FID = 'first_input_delay';
      const CLS = 'cumulative_layout_shift';

      const cwvMetrics = [LCP, FID, CLS];
      let metrics = [];
      let passesAll = true;

      if (this.crux[group] === null) {
        return 2;
      }

      if (this.crux[group] && this.crux[group].record && this.crux[group].record.metrics) {
        metrics = Object.keys(this.crux[group].record.metrics);
      }
      metrics.forEach((item) => {
        if (cwvMetrics.includes(item)) {
          const percentile = this.crux[group].record.metrics[item].percentiles.p75;
          for (let i = 0; i <= 2; i++) {
            const { start } = this.crux[group].record.metrics[item].histogram[i];
            const { end } = this.crux[group].record.metrics[item].histogram[i];

            switch (i) {
              case 1:
                if (percentile >= start && percentile <= end) {
                  passesAll = false;
                }
                break;
              case 2:
                if (percentile >= start) {
                  passesAll = false;
                }
                break;
              default:
                break;
            }
          }
        }
      });

      const hasMandatoryMetrics = [LCP, CLS].every((metric) => metrics.includes(metric));
      if (!hasMandatoryMetrics) {
        return 2;
      }

      return passesAll ? 1 : 0;
    },
    getPerformanceMobileSubsectionScore() {
      const scores = [];
      Object.keys(this.performanceMobile.audits).forEach((auditKey) => {
        if (['viewport', 'font-size', 'plugins', 'content-width'].indexOf(auditKey) >= 0) {
          scores.push(
            this.performanceMobile.audits[auditKey].score !== null ? this.performanceMobile.audits[auditKey].score : 0
          );
        }
      });
      return scores.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / scores.length;
    },
    getHtmlScore() {
      return {
        errors: this.html?.messages?.filter((message) => message.type === 'error')?.length || 0,
        warnings: this.html?.messages?.filter((message) => message.type !== 'error')?.length || 0,
      };
    },
    getScore(scoreCacheKey) {
      let data = localStorage.getItem(scoreCacheKey);

      if (data) {
        this.score = JSON.parse(data);
      } else {
        this.score = {};
        this.score.issues = [];

        const htmlScore = this.getHtmlScore();
        const securityGrades = {
          'A+': 800,
          A: 700,
          B: 600,
          C: 500,
          D: 400,
          E: 300,
          F: 200,
          T: 100,
        };

        let htmlErrorsScore = 0;
        let htmlWarningsScore = 0;
        if (htmlScore.errors >= 1 && htmlScore.errors <= 16) {
          htmlErrorsScore = this.addScore(htmlScore.errors, 0, 16, 'html-errors');
        }
        if (htmlScore.warnings >= 1 && htmlScore.warnings <= 30) {
          htmlWarningsScore = this.addScore(htmlScore.errors, 0, 30, 'html-warnings');
        }

        const cruxURL = this.passesCoreVitals('url');
        const cruxOrigin = this.passesCoreVitals('origin');
        this.score['crux-url'] = this.addScore(cruxURL === 2 ? 0 : cruxURL, 0, 1, 'crux-url');
        this.score['crux-origin'] = this.addScore(cruxOrigin === 2 ? 0 : cruxOrigin, 0, 1, 'crux-origin');
        this.score['performance-mobile'] = this.addScore(this.performance?.mobile?.score, 0, 1, 'performance-mobile');
        this.score['performance-desktop'] = this.addScore(
          this.performance?.desktop?.score,
          0,
          1,
          'performance-desktop'
        );
        this.score['performance-mobile-subsection'] = this.addScore(
          this.getPerformanceMobileSubsectionScore(),
          0,
          1,
          'performance-mobile-subsection'
        );
        this.score['security-headers'] = this.addScore(
          securityGrades[this.security?.grades?.headersGrade?.grade],
          100,
          800,
          'security-headers'
        );
        this.score['security-ssl'] = this.addScore(
          securityGrades[this.security?.grades?.sslGrade?.grade],
          100,
          800,
          'security-ssl'
        );
        this.score['html-errors'] = htmlErrorsScore;
        this.score['html-warnings'] = htmlWarningsScore;
        this.score['a11y-score'] = this.addScore(this.a11y?.score, 0, 100, 'a11y-score');

        localStorage.setItem(scoreCacheKey, JSON.stringify(this.score));
      }
      this.loading.score = false;
    },
    addScore(value, inMin, inMax, key) {
      const score = this.normalize(
        value,
        inMin,
        inMax,
        0,
        this.METRICS[key].weight,
        ['html-errors', 'html-warnings'].includes(key)
      );
      this.score.issues.push({
        key,
        score,
        title: this.METRICS[key].title,
        passed: score === this.METRICS[key].weight,
      });
      return score;
    },
    getCrUX() {
      const params = {
        params: {
          url: this.tab.url,
          action: 'crux',
          device: DESKTOP,
        },
      };

      const request = new Request(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      return this.requestWrapper(request, 'crux', ANY, (data) => {
        this.crux = data;

        if (this.crux === null || Object.keys(this.crux).length === 0)
          throw new Error('Response body for crux is empty or null');

        this.loading.crux = false;
      });
    },
    getPerformance(device) {
      const params = {
        params: {
          url: this.tab.url,
          action: 'lighthouse',
          section: 'performance',
          device,
        },
      };

      const request = new Request(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      return this.requestWrapper(request, 'performance', device, (data) => {
        this.performance[device].lighthouse = JSON.parse(data.body);
        if (
          this.performance[device].lighthouse == null ||
          Object.keys(this.performance[device].lighthouse).length === 0
        ) {
          throw new Error('Response body for performance ' + device + ' is empty or null');
        }

        let audits = [];
        this.performance[device].score = this.performance[device].lighthouse.categories.performance.score;

        Object.keys(this.performance[device].lighthouse.audits).forEach((audit) => {
          if (this.performance[device].lighthouse.audits[audit].score != null) {
            audits.push(this.performance[device].lighthouse.audits[audit]);
          }
        });

        this.performance[device].lighthouse = audits;
        if (this.performance.desktop.lighthouse !== null && this.performance.mobile.lighthouse !== null) {
          this.loading.performance = false;
        }
      });
    },
    getSecurity() {
      const params = {
        params: {
          url: this.tab.url,
          action: 'security',
          device: DESKTOP,
        },
      };

      const request = new Request(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      return this.requestWrapper(request, 'security', ANY, (data) => {
        this.security = data.body;
        this.loading.security = false;
      });
    },
    getHtmlValidation() {
      const params = {
        params: {
          url: this.tab.url,
          action: 'validate_html',
          device: DESKTOP,
        },
      };

      const request = new Request(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      return this.requestWrapper(request, 'html', ANY, (data) => {
        this.html = JSON.parse(data.body);

        if (this.html === null || Object.keys(this.html).length === 0)
          throw new Error('Response body for html5 validation is empty or null');

        this.loading.html = false;
      });
    },
    getA11y() {
      const params = {
        params: {
          url: this.tab.url,
          action: 'lighthouse',
          section: 'accessibility',
          device: DESKTOP,
        },
      };

      const request = new Request(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      return this.requestWrapper(request, 'a11y', ANY, (data) => {
        let a11y = JSON.parse(data.body);
        if (a11y == null || Object.keys(a11y).length === 0)
          throw new Error('Response body for accessibility is empty or null');

        let audits = [];
        a11y.categories.accessibility.auditRefs.forEach((element) => {
          if (element.weight > 0) {
            if (a11y.audits[element.id].score !== 1) {
              audits.push(a11y.audits[element.id]);
            }
          }
        });

        this.a11y.issuesCount = audits.length;

        if (a11y.categories.accessibility.score) {
          this.a11y.score = a11y.categories.accessibility.score * 100;
        } else {
          this.a11y.score = 1;
        }
        this.a11y.audits = this.parseA11yAudits(audits);

        this.loading.a11y = false;
      });
    },
    getPerformanceMobile() {
      const params = {
        params: {
          url: this.tab.url,
          action: 'lighthouse',
          section: 'mobile',
        },
      };

      const request = new Request(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      return this.requestWrapper(request, 'performanceMobile', MOBILE, (data) => {
        this.performanceMobile = JSON.parse(data.body);

        this.loading.performanceMobile = false;
      });
    },
    parseA11yAudits(audits) {
      const renderer = new marked.Renderer();
      renderer.link = function (href, title, text) {
        let link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace('<a', '<a target="_blank" ');
      };
      marked.setOptions({
        renderer: renderer,
      });

      let issues = [];
      for (const audit of audits) {
        let obj = {
          title: '',
          description: '',
          severity: '',
          snippets: [],
        };

        obj.title = marked.parseInline(audit.title);
        obj.description = marked.parseInline(audit.description);
        if (audit.details) {
          obj.severity = audit.details.debugData.impact;
        }
        let snippets = [];
        if (audit.details) {
          snippets = audit.details.items.map((item) => item.node.snippet);
        }
        obj.snippets = snippets;
        issues.push(obj);
      }

      return issues;
    },
  },
};
</script>
<style src="./style.css"></style>
