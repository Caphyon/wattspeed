/*
 *   This file will be injected into page content
 *   and is used to communicate between extension
 *   and DOM of the page
 */
(function () {
  /**
   * Class used to parse DOM document
   */
  var PARSER = function () {
    /**
     * Property used to store data for parsing cache
     */
    this.storage = {
      classes: false,
      scripts: false,
      attrs: false,
      links: false,
      comments: false,
      srcs: false,
      hrefs: false,
      title: false,
      descr: false,
      metas: false,
      lang: false,
      cookies: false,
      headers: false
    };

    /**
     * Self reference variable used in functions to reference
     * the object
     */
    var self = this;

    /**
     * Variable used to store all page elements
     */
    this.elements = document.querySelectorAll('*');

    /**
     * Returns cached title or parses it
     */
    this.getDOMTitle = function () {
      return !this.storage.title && (document.title || window.location.href);
    };

    /**
     * Returns cached description or parses it, check for lowercase
     * and camelcase description property
     */
    this.getDOMDescription = function () {
      function getDescription() {
        var $element = document.querySelector('meta[name="description"]') || document.querySelector('meta[name="Description"]'),
          $description = ($element != null ? $element.getAttribute('content') : false);

        return ((self.storage.descr = $description) && $description);
      }

      return this.storage.descr || getDescription();
    };

    /**
     * Iterates through pages' elements, parsing their classes on first run,
     * on second run it returns the cached ones
     */
    this.parseClasses = function () {
      function getClasses() {
        var $classes = [],
          $elements = self.elements;

        Array.prototype.forEach.call($elements, function ($element) {
          var $className = $element.className + '';
          $className.split(/\s/).forEach(function ($class) {
            ($class && $classes.indexOf($class) == -1) ? $classes.push($class): null;
          });
        });

        return ((self.storage.classes = $classes) && $classes);
      }

      return this.storage.classes || getClasses();
    };

    /**
     * Iterates through pages' scripts, parsing their srcs and inline js on first run,
     * on second run it returns the cached ones
     */
    this.parseScripts = function () {
      function getScripts() {
        var $scripts = [],
          $elements = document.querySelectorAll('script'),
          $inline = document.querySelector('html').innerHTML.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g);

        for (var i = 0, len = $elements.length; i < len;
          (function () {
            $scripts.indexOf($elements[i].getAttribute('src')) == -1 ? $scripts.push($elements[i].getAttribute('src')) : null;
          })(), i++);

        /**
         * Pushes the inline js array values into the scripts array
         */
        for (var $index in $inline) $scripts.push($inline[$index]);

        return ((self.storage.scripts = $scripts) && $scripts);
      }

      return this.storage.scripts || getScripts();
    };

    this.getLDJSON = function(){
      function getLDJSON(){
        var $ldscripts = []
        $elements = document.querySelectorAll("[type='application/ld+json']");
        for ( var i = 0, len = $elements.length; i < len; i++){
          $ldscripts.push('<script type="application/ld+json">'+ $elements[i].innerHTML);
        }
        return (self.storage.ldscripts = $ldscripts) && $ldscripts;
      }

      return this.storage.ldscripts || getLDJSON();
    }

    /**
     * Iterates through pages' elements, parsing their attrs on first run,
     * on second run it returns the cached ones
     */
    this.parseAttrs = function () {
      function parseAttrs() {
        var $attributes = [],
          $elements = self.elements;

        for (var i = 0, len = $elements.length; i < len;
          (function () {
            Array.prototype.slice.call($elements[i].attributes).forEach(function (item) {
              $attributes.indexOf(item.name) == -1 ? $attributes.push(item.name) : null;
            });
          })(), i++);

        return ((self.storage.attrs = $attributes) && $attributes);
      }

      return this.storage.attrs || parseAttrs();
    };

    /**
     * Iterates through pages' links, parsing their hrefs on first run,
     * on second run it returns the cached ones
     */
    this.parseLinks = function () {
      function parseLinks() {
        var $links = [],
          $elements = document.querySelectorAll('link[rel="stylesheet"]');

        for (var i = 0, len = $elements.length; i < len;
          (function () {
            $links.indexOf($elements[i].getAttribute('href')) == -1 ? $links.push($elements[i].getAttribute('href')) : null;
          })(), i++);

        return ((self.storage.links = $links) && $links)
      }

      return this.storage.links || parseLinks();
    };

    /**
     * Regex document innerHtml and parses all comments on first run,
     * on second run it returns the cached ones
     */
    this.parseComments = function () {
      function parseComments() {
        var $comments = document.querySelector('html').innerHTML.match(/<!--.*?-->/g);

        return ((self.storage.comments = $comments) && $comments);
      }

      return this.storage.comments || parseComments();
    };

    /**
     * Iterates through pages' images and iframes parsing their srcs on first run,
     * on second run it returns the cached ones
     */
    this.parseSrcs = function () {
      function parseSrcs() {
        var $srcs = [],
          $elements = ['img', 'video', 'audio', 'object', 'iframe'];


        for (var i = 0, len = $elements.length; i < len;
          (function () {
            for (var i = 0, $element = document.querySelectorAll($elements[i]), len = $element.length; i < len;
              (function () {
                $srcs.indexOf($element[i].getAttribute('src')) == -1 ? $srcs.push($element[i].getAttribute('src')) : null;
              })(), i++);
          })(), i++);

        return ((self.storage.srcs = $srcs) && $srcs);
      }

      return this.storage.srcs || parseSrcs();
    };

    /**
     * Iterates through pages' metas, parsing their property and content on first run,
     * on second run it returns the cached ones
     */
    this.parseMetas = function () {
      function parseMetas() {
        var $metas = [],
          $elements = document.querySelectorAll('meta');

        for (var i = 0, len = $elements.length; i < len;
          (function () {
            $metas.indexOf($elements[i].getAttribute('content')) == -1 ? $metas.push($elements[i].getAttribute('content')) : null;
            $metas.indexOf($elements[i].getAttribute('property')) == -1 ? $metas.push($elements[i].getAttribute('property')) : null;
          })(), i++);

        return ((self.storage.metas = $metas) && $metas);
      }

      return this.storage.metas || parseMetas();
    };

    /**
     * Iterates through pages' cookies, parsing their content on first run,
     * on second run it returns the cached ones
     */
    this.parseCookies = function () {
      function parseCookies() {
        var $cookies = [],
          $cookie = document.cookie.split(';');

        for (var i = 0, len = $cookie.length; i < len;
          (function () {
            $cookies.push($cookie[i]);
          })(), i++);

        return ((self.storage.cookies = $cookies) && $cookies);
      }

      return this.storage.cookies || parseCookies();
    };

    /**
     * Headers
     */
    this.parseHeaders = function() {
      try {
        function parseHeaders() {
          const client = new XMLHttpRequest();
          client.open("GET", "", true);
          client.send();
          client.onreadystatechange = function() {
            if(this.readyState == this.HEADERS_RECEIVED) {
              var $headers = [];
              $headers[0] = this.getAllResponseHeaders();
              return(self.storage.headers = $headers) && $headers;
            }
          }
        }
        return this.storage.headers || parseHeaders();
      } catch (error) {
        return '';
      }
    };

    /**
     * Iterates through page' elements and tries to parse html's
     * language
     */
    this.getDOMLang = function () {
      return this.storage.lang || ((this.storage.lang = document.documentElement.lang) && document.documentElement.lang)
    };

    /**
     * Returns an object containing parsed data
     */
    this.getSerpData = function () {
      return {
        title: this.getDOMTitle(),
        description: this.getDOMDescription()
      };
    };

    /**
     * Returns an object containing parsed data
     */
    this.getTechData = function () {
      return {
        classes: this.parseClasses(),
        scripts: this.parseScripts(),
        ldscripts: this.getLDJSON(),
        attrs: this.parseAttrs(),
        links: this.parseLinks(),
        comments: this.parseComments(),
        metas: this.parseMetas(),
        cookies: this.parseCookies(),
        headers: this.parseHeaders()
      };
    };

    /**
     * Returns an object containing parsed data
     */
    this.getMixedData = function () {
      return {
        scripts: this.parseScripts(),
        links: this.parseLinks(),
        srcs: this.parseSrcs()
      };
    };
  };

  /**
   * Class used to store data into DOM
   */
  var CONTAINER = function () {
    /**
     * Property to store data of class
     */
    this.storage = {
      name: false,
      data: {}
    };

    this.setContainerData = function ($data) {
      this.storage.data[$data.key] = $data.data;
    };

    this.getContainerData = function ($what) {
      return this.storage.data[$what] || false;
    };
  };

  /**
   * Classes initializations
   */
  var HELPER = new PARSER;
  var CONTAINER = new CONTAINER;

  /**
   * Communication between Extension and Helper script is made through messages.
   * Here we are creating the listener and returning the data on extension
   * request depending on $data.action argument
   */
  chrome.runtime.onMessage.addListener(function ($data, $sender, $response) {
    switch ($data.action) {
      case 'GET_SERP_DATA':
        {
          $response({
            action: 'SERP_DATA',
            serpData: HELPER.getSerpData()
          });
        }
        break;

      case 'GET_TECH_DATA':
        {
          $response({
            action: 'TECH_DATA',
            techData: HELPER.getTechData()
          });
        }
        break;

      case 'GET_MIXED_DATA':
        {
          $response({
            action: 'MIXED_DATA',
            mixedData: HELPER.getMixedData()
          });
        }
        break;

      case 'GET_DOM_LANG':
        {
          $response({
            action: 'DOM_LANG',
            domLang: HELPER.getDOMLang()
          });
        }
        break;

      case 'VERIFY_INJECTED':
        {
          $response({
            action: 'INJECTED',
            status: true
          });
        }
        break;

      case 'STORE_DATA':
        {
          CONTAINER.setContainerData($data.data);
        }
        break;

      case 'GET_DATA':
        {
          $response({
            data: CONTAINER.getContainerData($data.data)
          });
        }
        break;
    }
  });
})();
