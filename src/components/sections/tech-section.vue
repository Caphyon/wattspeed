<template>
    <section-container>
      <ul class="list-unstyled">
          <li v-for="item in techs">
            <img v-bind:src=" 'https://www.google.com/s2/favicons?domain=' + item.url " class="text--vcenter">
            <span class="text--vcenter">{{item.name}}</span>
          </li>
      </ul>
    </section-container>
</template>
<script>
const TECH_RULES = [
  /* Webservers */
  {
    name: "Apache",
    url: "https://httpd.apache.org/",
    rules: {
      headers: {
        score: 10,
        contains: ["*apache*"]
      }
    }
  },

  {
    name: "nginx",
    url: "http://nginx.org/",
    rules: {
      headers: {
        score: 10,
        contains: ["*nginx*"]
      }
    }
  },

  {
    name: "Express",
    url: "http://expressjs.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["*express*"]
      }
    }
  },

  {
    name: "Microsoft IIS",
    url: "https://www.iis.net/",
    rules: {
      headers: {
        score: 10,
        contains: ["*iis*"]
      }
    }
  },

  {
    name: "Varnish",
    url: "https://www.varnish-cache.org/",
    rules: {
      headers: {
        score: 10,
        contains: ["*varnish*"]
      }
    }
  },

  {
    name: "Phusion Passenger",
    url: "https://www.phusionpassenger.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["*Phusion Passenger*"]
      }
    }
  },

  {
    name: "LiteSpeed",
    url: "https://www.litespeedtech.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["*LiteSpeed*"]
      }
    }
  },

  {
    name: "Lighttpd",
    url: "https://www.lighttpd.net/",
    rules: {
      headers: {
        score: 10,
        contains: ["*lighttpd*"]
      }
    }
  },

  {
    name: "Oracle Application Server",
    url: "http://www.oracle.com/technetwork/middleware/ias/overview/index.html",
    rules: {
      headers: {
        score: 10,
        contains: ["*Oracle-Application-Server*"]
      }
    }
  },

  {
    name: "Jetty",
    url: "http://www.eclipse.org/jetty/",
    rules: {
      headers: {
        score: 10,
        contains: ["*jetty*"]
      }
    }
  },

  {
    name: "Resin",
    url: "http://caucho.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["*Resin*"]
      }
    }
  },

  {
    name: "Red Hat JBoss",
    url: "http://www.jboss.org/products/webserver/overview/",
    rules: {
      headers: {
        score: 10,
        contains: ["*jboss*"]
      }
    }
  },

  {
    name: "GlassFish",
    url: "https://glassfish.java.net/",
    rules: {
      headers: {
        score: 10,
        contains: ["*glassfish.java.net*"]
      }
    }
  },

  /* Hostings */

  {
    name: "GitHub Pages",
    url: "https://pages.github.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["*github.com*"]
      }
    }
  },

  {
    name: "Amazon Web Services",
    url: "https://aws.amazon.com/application-hosting/",
    rules: {
      headers: {
        score: 10,
        contains: ["*amazon*"]
      }
    }
  },

  {
    name: "Akamai Hosted",
    url: "https://www.akamai.com/us/en/resources/cloud-hosting.jsp",
    rules: {
      headers: {
        score: 10,
        contains: ["*x-akamai-transformed*"]
      },
      metas: {
        score: 10,
        contains: ["*akamai*"]
      }
    }
  },

  {
    name: "Cloudflare",
    url: "https://www.cloudflare.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["*cloudflare*"]
      }
    }
  },

  {
    name: "Rackspace",
    url: "ttps://www.rackspace.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["*rackspace*"]
      }
    }
  },

  /* Analytics */

  {
    name: "Google Analytics",
    url: "http://www.google.com/analytics/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "*google-analytics.com/ga.js",
          "*google-analytics.com/analytics.js"
        ]
      }
    }
  },

  {
    name: "Google Tag Manager",
    url: "https://www.google.com/analytics/tag-manager/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*googletagmanager.com/gtm.js"]
      }
    }
  },

  {
    name: "Mixpanel",
    url: "https://mixpanel.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*mxpnl.com*"]
      }
    }
  },

  {
    name: "Hotjar",
    url: "https://www.hotjar.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*hotjar.com*"]
      }
    }
  },

  {
    name: "Lytics",
    url: "https://www.getlytics.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*lytics.io*"]
      }
    }
  },

  {
    name: "Pingdom",
    url: "https://www.pingdom.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*pingdom.net*"]
      }
    }
  },

  {
    name: "Woopra",
    url: "https://www.woopra.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*woopra.com*"]
      }
    }
  },

  {
    name: "Clicky Analytics",
    url: "https://clicky.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*getclicky.com*"]
      }
    }
  },

  {
    name: "Quantcast Measure",
    url: "https://www.quantcast.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*quantserve.com*", "*aquant.js*"]
      }
    }
  },

  {
    name: "gaug.es",
    url: "http://get.gaug.es/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*gaug.es*"]
      }
    }
  },

  {
    name: "New Relic",
    url: "http://newrelic.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*newrelic.com*"]
      }
    }
  },

  {
    name: "MediaMath",
    url: "http://www.mediamath.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*mediamath.com*"]
      }
    }
  },

  {
    name: "Adobe Analytics",
    url:
      "http://www.adobe.com/marketing-cloud/web-analytics/marketing-analytics-capabilities.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["*omniture-static.com*"]
      }
    }
  },

  {
    name: "Crazy Egg",
    url: "http://www.crazyegg.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*crazyegg.com*", "*dnn506yrbagrg.cloudfront.net*"]
      }
    }
  },

  {
    name: "Hubspot Analytics",
    url: "http://www.hubspot.com/products/analytics",
    rules: {
      scripts: {
        score: 10,
        contains: ["*hs-analytics.net*"]
      }
    }
  },

  {
    name: "Interstate Analytics",
    url: "https://interstateanalytics.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*interstateanalytics.com*"]
      }
    }
  },

  {
    name: "Heap Analytics",
    url: "https://heapanalytics.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*heapanalytics.com*"]
      }
    }
  },

  {
    name: "Segment",
    url: "https://segment.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*segment.com*", "*segment.io*"]
      }
    }
  },

  {
    name: "WhoisVisiting",
    url: "https://www.whoisvisiting.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["*whoisvisiting.com*"]
      }
    }
  },

  /* Customers/Marketing */

  {
    name: "Kissmetrics",
    url: "https://kissmetrics.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*kissmetrics.com*"]
      }
    }
  },

  {
    name: "Chartbeat",
    url: "https://chartbeat.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*chartbeat.com*"]
      }
    }
  },

  {
    name: "GoSquared",
    url: "https://www.gosquared.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*gosquared.com*"]
      }
    }
  },

  {
    name: "Drip",
    url: "https://www.getdrip.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*getdrip.com*"]
      }
    }
  },

  {
    name: "Adobe Dynamic Tag Management",
    url:
      "http://www.adobe.com/solutions/digital-marketing/dynamic-tag-management.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["*adobedtm.com*"]
      }
    }
  },

  {
    name: "HitTail",
    url: "https://www.hittail.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*hittail.com*"]
      }
    }
  },

  {
    name: "Customer.io",
    url: "https://customer.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*customer.io*"]
      }
    }
  },

  {
    name: "AppCues",
    url: "http://appcues.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*appcues.com*"]
      }
    }
  },

  {
    name: "Route",
    url: "http://www.route.to/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*routecdn.com*"]
      }
    }
  },

  {
    name: "Visual Website Optimizer",
    url: "https://vwo.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*visualwebsiteoptimizer.com*", "*vwo.com*"]
      }
    }
  },

  {
    name: "Convert",
    url: "http://www.convert.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*convertexperiments.com*", "*convert.com*"]
      }
    }
  },

  {
    name: "Optimizely",
    url: "https://www.optimizely.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*optimizely.com*"]
      }
    }
  },

  {
    name: "Totango",
    url: "http://www.totango.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*totango.com*"]
      }
    }
  },

  {
    name: "Fullstory",
    url: "https://www.fullstory.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*fullstory.com*"]
      }
    }
  },

  {
    name: "Pardot",
    url: "http://www.pardot.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*pardot.com*"]
      }
    }
  },

  {
    name: "Wistia",
    url: "http://wistia.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*wistia.com*", "*wistia.net*"]
      }
    }
  },

  {
    name: "Perfect Audience",
    url: "http://www.perfectaudience.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*perfectaudience.com*"]
      }
    }
  },

  {
    name: "Marketo",
    url: "http://www.marketo.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*marketo.com*", "*marketo.net*"]
      }
    }
  },

  {
    name: "Inspectlet",
    url: "http://www.inspectlet.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*inspectlet.com*"]
      }
    }
  },

  {
    name: "Captora",
    url: "http://www.captora.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*captora.com*"]
      }
    }
  },

  /* Advertising */

  {
    name: "Marin Software",
    url: "http://www.marinsoftware.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*marinsm.com*"]
      }
    }
  },

  {
    name: "DoubleClick",
    url: "https://www.doubleclickbygoogle.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*doubleclick.net*"]
      }
    }
  },

  {
    name: "BuySellAds",
    url: "https://www.buysellads.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*buysellads.com*"]
      },
      links: {
        score: 10,
        contains: ["*buysellads.com*"]
      }
    }
  },

  {
    name: "AdPacks",
    url: "http://adpacks.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*adpacks.com*"]
      },
      links: {
        score: 10,
        contains: ["*adpacks.com*"]
      }
    }
  },

  {
    name: "CarbonAds",
    url: "http://carbonads.net/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*carbonads.com*"]
      },
      links: {
        score: 10,
        contains: ["*carbonads.com*"]
      }
    }
  },

  {
    name: "Stripe",
    url: "https://stripe.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*stripe.com*"]
      }
    }
  },

  /* Live Chat */

  {
    name: "zopim",
    url: "https://www.zopim.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["*zopim.com*"]
      }
    }
  },

  {
    name: "Olark",
    url: "https://www.olark.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*olark.com*"]
      }
    }
  },

  {
    name: "Intercom",
    url: "https://www.intercom.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*intercom.io*"]
      }
    }
  },

  {
    name: "tawk.to",
    url: "https://www.tawk.to/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*tawk.to*"]
      }
    }
  },

  {
    name: "LiveChat",
    url: "https://www.livechatinc.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*livechatinc.com*"]
      }
    }
  },

  /* Fonts / Typography */

  {
    name: "Typekit",
    url: "https://typekit.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*typekit.net*"]
      }
    }
  },

  {
    name: "Google Fonts",
    url: "https://www.google.com/fonts",
    rules: {
      links: {
        contains: ["*fonts.googleapis.com"],
        score: 10
      }
    }
  },

  /* CMSes */

  // forums
  {
    name: "vBulletin",
    url: "https://www.vbulletin.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["*vBulletin*"]
      },
      headers: {
        score: 10,
        contains: ["*vbulletin.com*"]
      }
    }
  },

  {
    name: "phpBB",
    url: "https://www.phpbb.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["*phpbb*", "*phpBB*"]
      },
      comments: {
        score: 2,
        contains: ["*phpbb*", "*phpBB*"]
      },
      classes: {
        score: 5,
        contains: ["phpbb*", "*phpBB*"]
      }
    }
  },

  // blogs
  {
    name: "Wordpress",
    url: "http://wordpress.org/",
    rules: {
      metas: {
        score: 10,
        contains: ["*wordpress", "*WordPress"]
      },
      links: {
        score: 3,
        contains: ["*/wp-content"]
      },
      scripts: {
        score: 1,
        contains: ["*/wp-content"]
      }
    }
  },

  {
    name: "WooCommerce",
    url: "https://www.woothemes.com/woocommerce/",
    rules: {
      metas: {
        score: 10,
        contains: ["*WooCommerce*"]
      },
      scripts: {
        score: 1,
        contains: ["*WooCommerce*"]
      }
    }
  },

  {
    name: "Magento",
    url: "https://magento.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["*magento*"]
      },
      scripts: {
        score: 1,
        contains: ["*magento*"]
      },
      cookies: {
        score: 10,
        contains: ["*frontend="]
      }
    }
  },

  {
    name: "Joomla!",
    url: "http://joomla.com/",
    rules: {
      metas: {
        score: 5,
        contains: ["*Joomla!*"]
      }
    }
  },

  {
    name: "Drupal",
    url: "https://www.drupal.org/",
    rules: {
      metas: {
        score: 1,
        contains: ["*Drupal*"]
      },
      scripts: {
        score: 10,
        contains: ["*Drupal*"]
      },
      headers: {
        score: 10,
        contains: ["*Drupal"]
      }
    }
  },

  {
    name: "Blogger",
    url: "http://blogger.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["*blogger"]
      },
      links: {
        score: 3,
        contains: ["*blogspot"]
      }
    }
  },

  /* CDNs */
  {
    name: "cdnjs",
    url: "https://cdnjs.com/",
    rules: {
      links: {
        score: 10,
        contains: ["*cdnjs.com*"]
      },
      scripts: {
        score: 10,
        contains: ["*cdnjs.com*"]
      }
    }
  },

  {
    name: "jsDelivr",
    url: "http://jsdelivr.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*cdn.jsdelivr.net*"]
      }
    }
  },

  /* Technologies */
  {
    name: "PHP",
    url: "http://php.net/",
    rules: {
      headers: {
        score: 10,
        contains: ["*php"]
      }
    }
  },

  {
    name: "WAI-ARIA",
    url: "http://www.w3.org/TR/wai-aria/",
    rules: {
      attrs: {
        score: 10,
        contains: ["*aria-"]
      }
    }
  },

  {
    name: "Schema.org",
    url: "http://schema.org/",
    rules: {
      attrs: {
        score: 10,
        contains: ["*itemscope", "*itemprop", "*itemtype"]
      }
    }
  },

  {
    name: "Open Graph protocol",
    url: "http://ogp.me/",
    rules: {
      metas: {
        score: 10,
        contains: ["og:*"]
      }
    }
  },

  {
    name: "SVG",
    url: "http://www.w3.org/Graphics/SVG/",
    rules: {
      attrs: {
        score: 5,
        contains: ["*viewbox", "*xmlns", "*xlink"]
      }
    }
  },

  {
    name: "Bootstrap",
    url: "http://getbootstrap.com/",
    rules: {
      links: {
        score: 10,
        contains: ["*/bootstrap.css", "*/bootstrap.min.css"]
      },
      classes: {
        score: 1,
        contains: ["row", "col-lg-", "col-md-", "col-sm-"]
      },
      scripts: {
        score: 10,
        contains: ["*/bootstrap.js", "*/bootstrap.min.js"]
      }
    }
  },

  {
    name: "Foundation",
    url: "http://foundation.zurb.com/",
    rules: {
      links: {
        score: 10,
        contains: ["*/foundation.css", "*/foundation.min.css"]
      },
      classes: {
        score: 1,
        contains: ["row", "medium-*", "columns", "small-*", "large-*"]
      },
      scripts: {
        score: 10,
        contains: ["*/foundation.js", "*/foundation.min.js"]
      }
    }
  },

  {
    name: "PureCSS",
    url: "http://purecss.io/",
    rules: {
      links: {
        score: 10,
        contains: ["*/pure-min.css", "*/pure.css"]
      },
      classes: {
        score: 1,
        contains: ["pure-g", "pure-u-*", "pure-u*"]
      }
    }
  },

  {
    name: "SKELETON",
    url: "http://getskeleton.com/",
    rules: {
      links: {
        score: 10,
        contains: ["*/skeleton.css", "*/skeleton-min.css"]
      }
    }
  },

  {
    name: "normalize.css",
    url: "https://necolas.github.io/normalize.css/",
    rules: {
      links: {
        score: 10,
        contains: ["*/normalize.css", "*/normalize-min.css"]
      }
    }
  },

  {
    name: "Metro UI",
    url: "https://metroui.org.ua/",
    rules: {
      links: {
        score: 10,
        contains: ["*/metro.min.css", "*/metro.css"]
      },
      classes: {
        score: 1,
        contains: ["mif-*"]
      },
      scripts: {
        score: 10,
        contains: ["*/metro.js", "*/metro.min.js"]
      }
    }
  },

  {
    name: "Semantic UI",
    url: "http://semantic-ui.com/",
    rules: {
      links: {
        score: 10,
        contains: ["*/semantic.css", "*/semantic.min.css"]
      },
      scripts: {
        score: 10,
        contains: ["*/semantic.js", "*/semantic.min.js"]
      }
    }
  },

  {
    name: "Disqus",
    url: "http://disqus.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*disqus"]
      }
    }
  },

  {
    name: "VueJS",
    url: "http://vuejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["*/vue.js", "*/vue.min.js"]
      },
      attrs: {
        score: 1,
        contains: ["v-*"]
      }
    }
  },

  {
    name: "AngularJS",
    url: "http://angular.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["*/angular.js", "*/angular.min.js"]
      },
      attrs: {
        score: 1,
        contains: ["ng-*"]
      }
    }
  },

  {
    name: "Socket.IO",
    url: "http://socket.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["*/socket.io.js", "*/socket.io.min.js"]
      }
    }
  },

  {
    name: "FontAwesome",
    url: "http://fortawesome.github.io/Font-Awesome/",
    rules: {
      links: {
        contains: ["*font-awesome"],
        score: 10
      },
      classes: {
        score: 1,
        contains: ["fa-*"]
      }
    }
  },

  {
    name: "jQuery",
    url: "https://jquery.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*jquery", "*jquery.min"]
      }
    }
  },

  {
    name: "CodePen",
    url: "https://codepen.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*codepen.io"]
      }
    }
  },

  {
    name: "Dojo",
    url: "http://dojotoolkit.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*dojo.js"]
      }
    }
  },

  {
    name: "jQuery Mobile",
    url: "http://jquerymobile.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*jquerymobile", "*jquery.mobile"]
      },
      links: {
        score: 10,
        contains: ["*jquerymobile", "*jquery.mobile"]
      }
    }
  },

  {
    name: "jQuery UI",
    url: "http://jqueryui.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*jqueryui"]
      },
      links: {
        score: 10,
        contains: ["*jqueryui"]
      }
    }
  },

  {
    name: "MooTools",
    url: "http://mootools.net/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*mootools"]
      }
    }
  },

  {
    name: "Prototype",
    url: "http://prototypejs.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*prototype.js"]
      }
    }
  },

  {
    name: "script.aculo.us",
    url: "http://script.aculo.us/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*scriptaculous.js"]
      }
    }
  },

  {
    name: "Modernizr ",
    url: "https://modernizr.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*modernizr", "*modernizr.js", "*modernizr.min.js"]
      }
    }
  },

  {
    name: "Backbone.js",
    url: "http://backbonejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["*backbone.js", "*backbone.min.js"]
      }
    }
  },

  {
    name: "Lo-Dash",
    url: "http://lodash.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*lodash.js", "*lodash.min.js"]
      }
    }
  },

  {
    name: "Raphaёl",
    url: "http://raphaeljs.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*raphael.js", "*raphael.min.js"]
      }
    }
  },

  {
    name: "React",
    url: "https://facebook.github.io/react/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*react.js", "*react.min.js"]
      },
      attrs: {
        score: 10,
        contains: ["*data-react"]
      }
    }
  },

  {
    name: "String.js",
    url: "http://stringjs.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*string.js*", "*string.min.js*"]
      }
    }
  },

  {
    name: "Underscore.js",
    url: "http://underscorejs.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["*underscore.js", "*underscore.min.js"]
      }
    }
  }
];

import Vue from "vue";
import BaseSection from "./base-section.vue";
import SectionContainer from "./section-container.vue";

Vue.component("section-container", SectionContainer);

export default {
  mixins: [BaseSection],
  data() {
    return {
      noDataMsg: "No technologies found.",
      title: "Technologies",
      panelName: "technology",
      techs: [],
      icon: "technologies"
    };
  },
  mounted() {
    chrome.tabs.sendMessage(
      this.tab.id,
      { action: "GET_TECH_DATA" },
      response => {
        this.getTechnologies(response.techData);
      }
    );
  },
  methods: {
    getTechnologies(parsedData) {
      let techs = [];
      TECH_RULES.forEach(rule => {
        if (this.hasTech(rule, parsedData))
          techs.push({
            name: rule.name,
            url: rule.url
          });
      });
      this.techs = techs;
      this.loading = false;
    },
    hasTech(rule, parsedData) {
      let score = 0;
      for (let category in rule.rules) {
        const data = parsedData[category];
        if (!data) continue;
        const currentRule = rule.rules[category];
        for (let i = 0, len = currentRule.contains.length; i < len; i++) {
          const content = currentRule.contains[i].toLowerCase();
          for (let j = 0, len = data.length; j < len; j++) {
            let match = data[j];
            if (!match) continue;
            match = match.toLowerCase();
            // *test will match 'whatever-test'
            if (content.startsWith("*")) {
              if (match.endsWith(content.substring(1)))
                score += currentRule.score;
            }

            // test* will match 'test-whatever'
            if (content.endsWith("*")) {
              if (match.startsWith(content.substring(0, content.length - 1)))
                score += currentRule.score;
            }

            // *test* will match 'whatever-test-whatever'
            if (content.startsWith("*") && content.endsWith("*")) {
              if (match.includes(content.substring(1, content.length - 1)))
                score += currentRule.score;
            }

            // test will match 'test'
            if (content == match) {
              score += currentRule.score;
            }

            if (score > 5) return true;
          }
        }
      }
      return false;
    }
  },
  computed: {
    hasData() {
      return this.techs.length > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
  ul {
    li {
      margin-bottom: .5rem;

      img {
        margin-right: .3rem;
      }
    }
  }
</style>
