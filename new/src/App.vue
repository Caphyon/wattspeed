<template>
  <div id="svg-container" style="display: none"></div>
  <div id="app" class="watts-extension">
    <nav>
      <a href="https://wattspeed.com" target="_blank">
        <svg width="130" height="30" class="logo">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" href="#logo" />
        </svg>
      </a>
      <button @click="refreshData()" title="Refresh data" class="refreshData">
        <svg width="18" height="18" data-icon>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" href="#refresh" />
        </svg>
      </button>
    </nav>
    <template v-if="requestLimit">
      <div class="quota-exceeded">
        <h3 class="text-center text-zinc-300/80 bg-red-500/20 rounded px-2 font-semibold">
          You have reached your request quota per hour, try again later.
        </h3>
        <svg class="watch" width="200" height="200" viewBox="0 0 185 185" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M92.5 185C143.586 185 185 143.586 185 92.5C185 41.4137 143.586 0 92.5 0C41.4137 0 0 41.4137 0 92.5C0 143.586 41.4137 185 92.5 185Z"
            fill="url(#paint0_linear)" />
          <path
            d="M174.4 92.2998C174.4 137.3 137.9 173.8 92.8999 173.8C47.8999 173.8 11.3999 137.3 11.3999 92.2998C11.3999 47.2998 47.8999 10.7998 92.8999 10.7998C137.9 10.7998 174.4 47.1998 174.4 92.2998Z"
            stroke="url(#paint2_linear)" stroke-width="2" fill="none" />
          <path
            d="M92.8999 161.8C131.284 161.8 162.4 130.684 162.4 92.2998C162.4 53.916 131.284 22.7998 92.8999 22.7998C54.5161 22.7998 23.3999 53.916 23.3999 92.2998C23.3999 130.684 54.5161 161.8 92.8999 161.8Z"
            stroke="url(#paint1_linear)" stroke-width="2" fill="none" />
          <path opacity="0.5" d="M92.6001 92.7002V42.7002" stroke="white" stroke-width="2" stroke-linecap="round"
                class="line" />
          <path opacity="0.5" d="M112.6 113.3L92.6001 92.7998" stroke="white" stroke-width="2" stroke-linecap="round"
                class="line line-alt" />
          <path
            d="M92.5 97.5C95.2614 97.5 97.5 95.2614 97.5 92.5C97.5 89.7386 95.2614 87.5 92.5 87.5C89.7386 87.5 87.5 89.7386 87.5 92.5C87.5 95.2614 89.7386 97.5 92.5 97.5Z"
            fill="white" />
          <defs>
            <linearGradient id="paint0_linear" x1="92.5" y1="0" x2="92.5" y2="322.5" gradientUnits="userSpaceOnUse">
              <stop stop-opacity="0" />
              <stop offset="1" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="92.55" y1="162.749" x2="93.05" y2="54.2491"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff" />
              <stop offset="1" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint2_linear" x1="93.255" y1="9.7507" x2="92.67" y2="136.719"
                            gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF8282" />
              <stop offset="1" stop-color="#FF8282" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </template>
    <router-view v-else />
    <footer>
      <div>
        <p>
          Like what you see? Create a
          <a href="https://app.wattspeed.com/signup?utm_source=wattspeedextension&utm_medium=referral"
             target="_blank">
            FREE account
          </a>
          so you can check your website automatically!
        </p>
      </div>
      <ul class="socials">
        <li>
          <a href="https://www.advancedwebranking.com/?utm_source=wattspeedextension&utm_medium=referral"
             target="_blank" title="Made by Advanced Web Ranking">
            <svg width="18" height="18" data-icon>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#awr" />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/wattspeed" target="_blank" title="Find us on Twitter">
            <svg width="18" height="18" data-icon>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#twitter" />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://github.com/Caphyon/wattspeed" target="_blank" title="View the code on Github">
            <svg width="18" height="18" data-icon>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#github" />
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
import { ANY, MOBILE, DESKTOP, API_URL } from "./assets/utils/consts";

import { computed } from "vue";
import symbols from "./assets/icons/symbols.svg";
import { marked } from "marked";

let headers = new Headers();
headers.append("Content-Type", "application/json");

export default {
  data() {
    return {
      tab: null,
      technologies: null,
      html: null,
      performance: {
        mobile: {
          lighthouse: null,
          score: null
        },
        desktop: {
          lighthouse: null,
          score: null
        }
      },
      performanceMobile: null,
      security: null,
      crux: null,
      a11y: {
        issuesCount: null,
        score: null,
        audits: null,
      },
      requestLimit: false,
      loading: {
        technologies: true,
        html: true,
        performance: true,
        performanceMobile: true,
        security: true,
        crux: true,
        a11y: true
      },
      errors: {
        technologies: null,
        html: null,
        performance: null,
        performanceMobile: null,
        security: null,
        crux: null,
        a11y: null
      }
    };
  },
  provide() {
    return {
      loading: computed(() => this.loading),
      errors: computed(() => this.errors),
      technologies: computed(() => this.technologies),
      html: computed(() => this.html),
      performance: computed(() => this.performance),
      performanceMobile: computed(() => this.performanceMobile),
      security: computed(() => this.security),
      crux: computed(() => this.crux),
      a11y: computed(() => this.a11y)
    };
  },
  mounted() {
    this.loadSvgSymbols();
    this.injectProductionScripts();
    // this.refreshData();
  },
  methods: {
    requestWrapper(request, section, strategy, callback) {
      this.loading[section] = true;
      if (section === "crux-url" || section === "crux-origin") {
        section = "crux";
      }

      this.makeRequest(request, section, strategy, (data) => {
        if (data.code === 1) {
          this.requestLimit = true;
        } else if (data.code === 2) {
          this.errors[section] = "Something went wrong, please try again!";
          this.loading[section] = false;
        } else {
          this.errors[section] = null;
          callback(data);
        }
      });
    },
    makeRequest(request, section, strategy, callback) {
      const url = request.url || request;
      // CrUX URL and CrUX Origin are found in the same request
      const cache_key = this.Buffer.from(`${section}${strategy}${this.tab.url}`).toString("base64");
      const data = localStorage.getItem(cache_key);

      if (data != null) {
        callback(JSON.parse(data));
        return;
      }

      fetch(request)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((data) => {
          localStorage.setItem(cache_key, JSON.stringify(data));
          callback(data);
        })
        .catch((error) => {
          this.errors[section] = error.message || "An error occured while fetching the data";
        });
    },
    injectProductionScripts() {
      if (process.env.NODE_ENV === "production") {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
          /**
           * Filter url and close the app if matched as helper.js cannot be
           * injected on chrome empty pages and chrome store page
           */
          if (
            !tabs[0].url.match(
              /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/
            )
          ) window.close();
          this.injectScript(tabs[0]);
        });
      } else {
        this.tab = {
          url: "https://www.apple.com/"
        };
      }
    },
    injectScript(tab) {
      // Get all content scripts
      chrome.manifest = chrome.runtime.getManifest();
      const injectIntoTab = (tabID) => {
        const scripts = chrome.manifest.content_scripts[0].js;
        chrome.scripting.executeScript({
          target: { tabId: tabID },
          files: scripts
        }, () => {
          this.tab = tab;
        });
      };
      chrome.tabs.sendMessage(tab.id, { action: "VERIFY_INJECTED" }, (status) => {
        if (!status && !tab.url.match("chrome.google.com")) {
          // new Promise(() => { localStorage.clear() })
          //   .then(() => {})
          //   .catch("could not clear local storage");
          injectIntoTab(tab.id);
        } else this.tab = tab;
      });
    },
    loadSvgSymbols() {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", symbols);
        xhr.onload = () => {
          document.getElementById("svg-container").innerHTML = xhr.responseText;
        };
        xhr.send();
      } catch (e) {
        // ignored
      }
    },
    async refreshData() {
      const myPromise = new Promise(() => {
        let panels = [
          {
            name: "a11y",
            strategies: [ANY]
          },
          {
            name: "performance",
            strategies: [MOBILE, DESKTOP]
          },
          {
            name: "technologies",
            strategies: [ANY]
          },
          {
            name: "crux",
            strategies: [ANY]
          },
          {
            name: "performanceMobile",
            strategies: [ANY]
          },
          {
            name: "html",
            strategies: [ANY]
          },
          {
            name: "security",
            strategies: [ANY]
          }
        ];

        if (this.$route.name === 'a11y') {
          panels = [{ name: "a11y", strategies: [ANY] }];
        }
        panels.forEach((panel) => {
          panel.strategies.forEach((strategy) => {
            const cache_key = this.Buffer.from(`${panel.name}${strategy}${this.tab.url}`).toString("base64");
            localStorage.removeItem(cache_key);
          });
        });
      });
      myPromise.catch(new Error("could not clear local storage"));
      // await this.getTechnologies();
      await this.getCrUX();
      await this.getPerformance(MOBILE);
      await this.getPerformance(DESKTOP);
      await this.getPerformanceMobile();
      await this.getSecurity();
      await this.getHtmlValidation();
      await this.getA11y();
    },
    getTechnologies() {
      const params = {
        params: {
          url: this.tab.url,
          action: 'get_jsonld',
        }
      };

      const request = new Request(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
      });

      this.requestWrapper(request, 'technologies', ANY, (data) => {
        this.technologies = JSON.parse(data.body);

        this.loading.technologies = false;
      });
    },
    getCrUX() {
      const params = {
        params: {
          url: this.tab.url,
          action: 'crux',
          device: DESKTOP,
        }
      };

      const request = new Request(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
      });

      this.requestWrapper(request, 'crux', ANY, (data) => {
        this.crux = data;

        if (this.crux === null || Object.keys(this.crux).length === 0)
          throw new Error("Response body for crux is empty or null");

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
        }
      };

      const request = new Request(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
      });

      this.requestWrapper(request, 'performance', device, (data) => {
        this.performance[device].lighthouse = JSON.parse(data.body);
        if (this.performance[device].lighthouse == null || Object.keys(this.performance[device].lighthouse).length === 0) {
          throw new Error("Response body for performance " + device + " is empty or null");
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
        }
      };

      const request = new Request(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
      });

      this.requestWrapper(request, 'security', ANY, (data) => {
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
        }
      };

      const request = new Request(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
      });

      this.requestWrapper(request, 'html', ANY, (data) => {
        this.html = JSON.parse(data.body);

        if (this.html === null || Object.keys(this.html).length === 0)
          throw new Error("Response body for html5 validation is empty or null");

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
        }
      };

      const request = new Request(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
      });

      this.requestWrapper(request, 'a11y', ANY, (data) => {
        let a11y = JSON.parse(data.body);
        if (a11y == null || Object.keys(a11y).length === 0)
          throw new Error("Response body for accessibility is empty or null");

        let audits = [];
        a11y.categories.accessibility.auditRefs.forEach(element => {
          if (element.weight > 0) {
            if (a11y.audits[element.id].score !== 1) {
              audits.push(a11y.audits[element.id]);
            }
          }
        });

        this.a11y.issuesCount = audits.length;

        if (a11y.categories.accessibility.score) {
          this.a11y.score = (a11y.categories.accessibility.score * 100);
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
        }
      };

      const request = new Request(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(params)
      });

      this.requestWrapper(request, 'performanceMobile', MOBILE, (data) => {
        this.performanceMobile = JSON.parse(data.body);

        this.loading.performanceMobile = false;
      });
    },
    parseA11yAudits(audits) {
      const renderer = new marked.Renderer();
      renderer.link = function(href, title, text) {
        let link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace('<a','<a target="_blank" ');
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
        // Use marked on description too, just in case
        obj.description = marked.parseInline(audit.description);
        // Change severity path if the version of ligthouse changes (5.2.0 now)
        if (audit.details) {
          obj.severity = audit.details.debugData.impact;
        }
        let snippets = [];
        if (audit.details)
          snippets = audit.details.items.map(item => item.node.snippet);
        obj.snippets = snippets;
        issues.push(obj);
      };

      return issues;
    },
  }
};
</script>
<style src="./style.css"></style>
