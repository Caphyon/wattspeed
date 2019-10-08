<template>
    <section-container>
      <ul class="list-unstyled">
          <li v-for="(item, index) in techs" :key="index">
            <img v-bind:src=" 'https://www.google.com/s2/favicons?domain=' + item.url " class="text--vcenter"/>
            <span class="text--vcenter">{{ item.name }}</span>
          </li>
          <li v-if="JSON_LD_TYPE.length > 0">
            <img src="https://www.google.com/s2/favicons?domain=https://json-ld.org" alt = "json-ld favicon" class="text--vcenter"/>
            <span>
              JSON-LD:
              <template v-if="JSON_LD_TYPE.length > 1">[ {{JSON_LD_TYPE.join(', ')}} ]</template>
              <template v-else>{{JSON_LD_TYPE[0]}}</template>
            </span>
          </li>
      </ul>
    </section-container>
</template>
<script>
const TECH_RULES = [
  {
    name: "OS X Server",
    url: "https://www.apple.com/lae/osx/server/",
    rules: {
      headers: {
        score: 10,
        contains: ["(server)..(Apple)"]
      }
    }
  },
  {
    name: "1C-Bitrix",
    url: "http://www.1c-bitrix.ru",
    rules: {
      scripts: {
        score: 10,
        contains: ["1c-bitrix"]
      },
      headers: {
        score: 10,
        contains: ["BITRIX_", "Bitrix Site Manager"]
      }
    }
  },
  {
    name: "91App",
    url: "https://www.91app.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https\\:\\/\\/track\\.91app\\.io\\/track\\.js\\?"]
      }
    }
  },
  {
    name: "3dCart",
    url: "http://www.3dcart.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:twlh(?:track)?\\.asp|3d_upsell\\.js)"]
      },
      cookies: {
        score: 10,
        contains: ["3dvisit"]
      },
      headers: {
        score: 10,
        contains: ["3DCART"]
      }
    }
  },
  {
    name: "A-Frame",
    url: "https://aframe.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["/?([\\d.]+)?/aframe(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "AD EBiS",
    url: "http://www.ebis.ne.jp",
    rules: {
      comments: {
        score: 10,
        contains: ["<!-- EBiS contents tag"]
      }
    }
  },
  {
    name: "AOLserver",
    url: "http://aolserver.com",
    rules: {
      headers: {
        score: 10,
        contains: ["AOLserver/?([\\d.]+)?"]
      }
    }
  },
  {
    name: "AT Internet XiTi",
    url: "http://atinternet.com/en",
    rules: {
      scripts: {
        score: 10,
        contains: ["xiti\\.com/hit\\.xiti"]
      }
    }
  },
  {
    name: "AWStats",
    url: "http://awstats.sourceforge.net",
    rules: {
      metas: {
        score: 10,
        contains: ["AWStats ([\\d.]+(?: \\(build [\\d.]+\\))?)"]
      }
    }
  },
  {
    name: "AMP Plugin",
    url: "https://amp-wp.org",
    rules: {
      metas: {
        score: 10,
        contains: ["AMP Plugin*"]
      }
    }
  },
  {
    name: "Azure",
    url: "https://azure.microsoft.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["ARRAffinity", "TiPMix"]
      }
    }
  },
  {
    name: "Azure CDN",
    url: "https://azure.microsoft.com/en-us/services/cdn/",
    rules: {
      headers: {
        score: 10,
        contains: ["(?:ECAcc|ECS|ECD)"]
      }
    }
  },
  {
    name: "AdInfinity",
    url: "http://adinfinity.com.au",
    rules: {
      scripts: {
        score: 10,
        contains: ["adinfinity\\.com\\.au"]
      }
    }
  },
  {
    name: "AdOcean",
    url: "https://adocean-global.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "adocean\\.pl/files/js/ado\\.js",
          "adocean\\.pl\\;confidence:0.8"
        ]
      }
    }
  },
  {
    name: "AdRiver",
    url: "http://adriver.ru",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "(?:adriver\\.core\\.\\d\\.js|https?://(?:content|ad|masterh\\d)\\.adriver\\.ru/)"
        ]
      }
    }
  },
  {
    name: "AdRoll",
    url: "http://adroll.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:a|s)\\.adroll\\.com"]
      }
    }
  },
  {
    name: "Adcash",
    url: "http://adcash.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["adcash\\.com/(?:script|ad)/"]
      }
    }
  },
  {
    name: "AddShoppers",
    url: "http://www.addshoppers.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.shop\\.pe/widget/"]
      }
    }
  },
  {
    name: "AddThis",
    url: "http://www.addthis.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["addthis\\.com/js/"]
      }
    }
  },
  {
    name: "AddToAny",
    url: "http://www.addtoany.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["addtoany\\.com/menu/page\\.js"]
      }
    }
  },
  {
    name: "Adnegah",
    url: "https://Adnegah.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["[^a-z]adnegah.*\\.js$"]
      },
      headers: {
        score: 10,
        contains: ["adnegah\\.net"]
      }
    }
  },
  {
    name: "Adobe ColdFusion",
    url: "http://adobe.com/products/coldfusion-family.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["/cfajax/"]
      },
      headers: {
        score: 10,
        contains: ["CFTOKEN="]
      }
    }
  },
  {
    name: "Adobe DTM",
    url: "https://marketing.adobe.com/resources/help/en_US/dtm/c_overview.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["//assets.adobedtm.com/"]
      }
    }
  },
  {
    name: "Adobe Experience Manager",
    url: "https://www.adobe.com/marketing/experience-manager.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["/etc/designs/", "/etc/clientlibs/", "/etc.clientlibs/"]
      }
    }
  },
  {
    name: "Adobe GoLive",
    url: "http://www.adobe.com/products/golive",
    rules: {
      metas: {
        score: 10,
        contains: ["Adobe GoLive(?:\\s([\\d.]+))?"]
      }
    }
  },
  {
    name: "Adobe Muse",
    url: "http://muse.adobe.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Muse(?:$| ?/?(\\d[\\d.]+))"]
      }
    }
  },
  {
    name: "Adobe RoboHelp",
    url: "http://adobe.com/products/robohelp.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:wh(?:utils|ver|proxy|lang|topic|msg)|ehlpdhtm)\\.js"]
      },
      metas: {
        score: 10,
        contains: ["Adobe RoboHelp*"]
      }
    }
  },
  {
    name: "ADPLAN",
    url: "https://www.adplan7.com/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "adplan7\\.com/\\;version:7",
          "advg\\.jp/"
        ]
      }
    }
  },
  {
    name: "Advert Stream",
    url: "http://www.advertstream.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:ad\\.advertstream\\.com|adxcore\\.com)"]
      }
    }
  },
  {
    name: "Adverticum",
    url: "http://adverticum.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:ad\\.)?adverticum\\.net/g3\\.js"]
      }
    }
  },
  {
    name: "Adzerk",
    url: "http://adzerk.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["adzerk\\.net/ados\\.js"]
      }
    }
  },
  {
    name: "Aegea",
    url: "http://blogengine.ru",
    rules: {
      headers: {
        score: 10,
        contains: ["E2 Aegea*"]
      }
    }
  },
  {
    name: "Afosto",
    url: "http://afosto.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Afosto SaaS BV"]
      }
    }
  },
  {
    name: "AfterBuy",
    url: "http://www.afterbuy.de",
    rules: {
      scripts: {
        score: 10,
        contains: ["shop-static\\.afterbuy\\.de"]
      }
    }
  },
  {
    name: "Ahoy",
    url: "https://github.com/ankane/ahoy",
    rules: {
      cookies: {
        score: 10,
        contains: ["ahoy_track", "ahoy_visit", "ahoy_visitor"]
      }
    }
  },
  {
    name: "Aircall",
    url: "http://aircall.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["aircall\\.io/"]
      }
    }
  },
  {
    name: "Airee",
    url: "http://xn--80aqc2a.xn--p1ai",
    rules: {
      headers: {
        score: 10,
        contains: ["Airee"]
      }
    }
  },
  {
    name: "Akaunting",
    url: "https://akaunting.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Free Accounting Software"]
      },
      links: {
        score: 10,
        contains: ["<link[^>]+akaunting-green\\.css"]
      }
    }
  },
  {
    name: "Akka HTTP",
    url: "http://akka.io",
    rules: {
      headers: {
        score: 10,
        contains: ["akka-http(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Allegro RomPager",
    url: "http://allegrosoft.com/embedded-web-server-s2",
    rules: {
      headers: {
        score: 10,
        contains: ["Allegro-Software-RomPager(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "AlloyUI",
    url: "http://www.alloyui.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["alloyui\\.com/"]
      }
    }
  },
  {
    name: "Amaya",
    url: "http://www.w3.org/Amaya",
    rules: {
      metas: {
        score: 10,
        contains: ["Amaya(?: V?([\\d.]+[a-z]))?"]
      }
    }
  },
  {
    name: "Amazon Cloudfront",
    url: "http://aws.amazon.com/cloudfront/",
    rules: {
      headers: {
        score: 10,
        contains: ["(CloudFront*)"]
      }
    }
  },
  {
    name: "Amazon ECS",
    url: "https://aws.amazon.com/elasticloadbalancing/",
    rules: {
      headers: {
        score: 10,
        contains: ["ECS"]
      }
    }
  },
  {
    name: "Amazon ELB",
    url: "https://aws.amazon.com/elasticloadbalancing/",
    rules: {
      cookies: {
        score: 10,
        contains: ["AWSELB"]
      }
    }
  },
  {
    name: "Amazon S3",
    url: "http://aws.amazon.com/s3/",
    rules: {
      headers: {
        score: 10,
        contains: ["AmazonS3"]
      }
    }
  },
  {
    name: "Amber",
    url: "https://amberframework.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Amber"]
      }
    }
  },
  {
    name: "Ametys",
    url: "http://ametys.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["ametys\\.js"]
      },
      metas: {
        score: 10,
        contains: ["(?:Ametys|Anyware Technologies)"]
      }
    }
  },
  {
    name: "Amiro.CMS",
    url: "http://amirocms.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Amiro"]
      }
    }
  },
  {
    name: "Amplitude",
    url: "https://amplitude.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.amplitude\\.com"]
      }
    }
  },
  {
    name: "Analysys Ark",
    url: "https://ark.analysys.cn",
    rules: {
      scripts: {
        score: 10,
        contains: ["AnalysysFangzhou_JS_SDK\\.min\\.js\\?v=([\\d.]+)"]
      },
      cookies: {
        score: 10,
        contains: ["ARK_ID"]
      }
    }
  },
  {
    name: "Anetwork",
    url: "https://www.anetwork.ir",
    rules: {
      scripts: {
        score: 10,
        contains: ["static-cdn\\.anetwork\\.ir/"]
      }
    }
  },
  {
    name: "Angular Material",
    url: "https://material.angularjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/([\\d.rc-]+)?/angular-material(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "AngularJS",
    url: "https://angularjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "angular[.-]([\\d.]*\\d)[^/]*\\.js",
          "/([\\d.]+(?:-?rc[.\\d]*)*)/angular(?:\\.min)?\\.js",
          "angular.*\\.js"
        ]
      },
      attrs: {
        score: 1,
        contains: ["ng-"]
      }
    }
  },
  {
    name: "Apache",
    url: "http://apache.org",
    rules: {
      headers: {
        score: 10,
        contains: ["(?:Apache(?:$|/([\\d.]+)|[^/-])|(?:^|\\b)HTTPD)"]
      }
    }
  },
  {
    name: "Apache JSPWiki",
    url: "http://jspwiki.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["jspwiki"]
      }
    }
  },
  {
    name: "Apache Tomcat",
    url: "http://tomcat.apache.org",
    rules: {
      headers: {
        score: 10,
        contains: [
          "Apache-Coyote*",
          "\\bTomcat\\b(?:-([\\d.]+))?"
        ]
      }
    }
  },
  {
    name: "Apache Traffic Server",
    url: "http://trafficserver.apache.org/",
    rules: {
      headers: {
        score: 10,
        contains: ["ATS/?([\\d.]+)?"]
      }
    }
  },
  {
    name: "ApexPages",
    url:
      "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro.htm",
    rules: {
      headers: {
        score: 10,
        contains: ["Salesforce\\.com ApexPages"]
      }
    }
  },
  {
    name: "Apigee",
    url: "https://cloud.google.com/apigee/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/profiles/apigee"]
      }
    }
  },
  {
    name: "AppNexus",
    url: "http://appnexus.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["adnxs\\.(?:net|com)"]
      }
    }
  },
  {
    name: "Appcues",
    url: "https://appcues.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["fast\\.appcues.com*\\.js"]
      }
    }
  },
  {
    name: "Arastta",
    url: "http://arastta.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["arastta\\.js"]
      },
      headers: {
        score: 10,
        contains: ["Arastta"]
      }
    }
  },
  {
    name: "ArcGIS API for JavaScript",
    url: "https://developers.arcgis.com/javascript/",
    rules: {
      scripts: {
        score: 10,
        contains: ["js\\.arcgis\\.com", "basemaps\\.arcgis\\.com"]
      }
    }
  },
  {
    name: "Artifactory",
    url: "http://jfrog.com/open-source/#os-arti",
    rules: {
      scripts: {
        score: 10,
        contains: ["wicket/resource/org\\.artifactory\\."]
      }
    }
  },
  {
    name: "Artifactory Web Server",
    url: "http://jfrog.com/open-source/#os-arti",
    rules: {
      headers: {
        score: 10,
        contains: ["Artifactory(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "ArvanCloud",
    url: "http://www.ArvanCloud.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Arvan Cloud \\(arvancloud\\.com\\)"]
      }
    }
  },
  {
    name: "AsciiDoc",
    url: "http://www.methods.co.nz/asciidoc",
    rules: {
      metas: {
        score: 10,
        contains: ["AsciiDoc*"]
      }
    }
  },
  {
    name: "Asciinema",
    url: "https://asciinema.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["asciinema\\.org/"]
      }
    }
  },
  {
    name: "Atlassian Bitbucket",
    url: "http://www.atlassian.com/software/bitbucket/overview/",
    rules: {
      metas: {
        score: 10,
        contains: ["Bitbucket"]
      }
    }
  },
  {
    name: "Atlassian FishEye",
    url: "http://www.atlassian.com/software/fisheye/overview/",
    rules: {
      cookies: {
        score: 10,
        contains: ["FESESSIONID"]
      }
    }
  },
  {
    name: "Atlassian Jira",
    url: "http://www.atlassian.com/software/jira/overview/",
    rules: {
      metas: {
        score: 10,
        contains: ["JIRA"]
      }
    }
  },
  {
    name: "Atlassian Jira Issue Collector",
    url: "http://www.atlassian.com/software/jira/overview/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "jira-issue-collector-plugin",
          "atlassian\\.jira\\.collector\\.plugin"
        ]
      }
    }
  },
  {
    name: "Aurelia",
    url: "http://aurelia.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["aurelia(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Avangate",
    url: "http://avangate.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["avangate\\.net/"]
      }
    }
  },
  {
    name: "Avasize",
    url: "https://www.avasize.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["avasize\\.com/"]
      }
    }
  },
  {
    name: "Awesomplete",
    url: "https://leaverou.github.io/awesomplete/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/awesomplete\\.js(?:$|\\?)"]
      }
    }
  },
  {
    name: "BIGACE",
    url: "http://bigace.de",
    rules: {
      metas: {
        score: 10,
        contains: ["BIGACE ([\\d.]+)"]
      }
    }
  },
  {
    name: "Backbone.js",
    url: "http://backbonejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["backbone.*\\.js"]
      }
    }
  },
  {
    name: "Backdrop",
    url: "http://backdropcms.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Backdrop CMS(?: (\\d))?"]
      }
    }
  },
  {
    name: "Backpack",
    url: "https://backpackforlaravel.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["backpack_session="]
      }
    }
  },
  {
    name: "Backtory",
    url: "https://backtory.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Backtory"]
      }
    }
  },
  {
    name: "Banshee",
    url: "http://www.banshee-php.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Banshee PHP"]
      }
    }
  },
  {
    name: "BaseHTTP",
    url: "http://docs.python.org/2/library/basehttpserver.html",
    rules: {
      headers: {
        score: 10,
        contains: ["BaseHTTP\\/?([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "BigBangShop",
    url: "https://www.bigbangshop.com.br",
    rules: {
      headers: {
        score: 10,
        contains: ["BIGBANGSHOP"]
      }
    }
  },
  {
    name: "Bigcommerce",
    url: "http://www.bigcommerce.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\d+\\.bigcommerce\\.com/"]
      }
    }
  },
  {
    name: "Bigware",
    url: "http://bigware.de",
    rules: {
      cookies: {
        score: 10,
        contains: ["bigWAdminID", "bigwareCsid"]
      }
    }
  },
  {
    name: "BittAds",
    url: "http://bittads.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["bittads\\.com/js/bitt\\.js$"]
      }
    }
  },
  {
    name: "Blade",
    url: "https://lets-blade.com",
    rules: {
      headers: {
        score: 10,
        contains: ["blade-([\\w.]+)?"]
      }
    }
  },
  {
    name: "Blesta",
    url: "http://www.blesta.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["blesta_sid"]
      }
    }
  },
  {
    name: "Blogger",
    url: "http://www.blogger.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Blogger"]
      }
    }
  },
  {
    name: "Bluefish",
    url: "http://sourceforge.net/projects/bluefish",
    rules: {
      metas: {
        score: 10,
        contains: ["Bluefish(?:\\s([\\d.]+))?"]
      }
    }
  },
  {
    name: "Boa",
    url: "http://www.boa.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Boa\\/?([\\d\\.a-z]+)?"]
      }
    }
  },
  {
    name: "Boba.js",
    url: "http://boba.space150.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["boba(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Bold Chat",
    url: "https://www.boldchat.com/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "boldchat\\.com/aid/\\d{18}/bc\\.vms4/vms\\.js"
        ]
      }
    }
  },
  {
    name: "BoldGrid",
    url: "https://boldgrid.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/wp-content/plugins/post-and-page-builder"]
      },
      links: {
        score: 10,
        contains: [
          "<link rel=[\"']stylesheet[\"'] [^>]+boldgrid",
          "<link rel=[\"']stylesheet[\"'] [^>]+post-and-page-builder",
          "<link[^>]+s\\d+\\.boldgrid\\.com"
        ]
      }
    }
  },
  {
    name: "Bolt",
    url: "http://bolt.cm",
    rules: {
      metas: {
        score: 10,
        contains: ["Bolt"]
      }
    }
  },
  {
    name: "Bonfire",
    url: "http://cibonfire.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["bf_session"]
      }
    }
  },
  {
    name: "Bootstrap",
    url: "https://getbootstrap.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "twitter\\.github\\.com/bootstrap",
          "bootstrap[.-]([\\d.]*\\d)[^/]*\\.js",
          "(?:/([\\d.]+))?(?:/js)?/bootstrap(?:\\.min)?\\.js"
        ]
      },
      links: {
        score: 10,
        contains: ["/bootstrap.css", "/bootstrap.min.css"]
      },
      classes: {
        score: 1,
        contains: ["row", "col-lg-", "col-md-", "col-sm-"]
      }
    }
  },
  {
    name: "Bootstrap Table",
    url: "http://bootstrap-table.wenzhixin.net.cn/",
    rules: {
      scripts: {
        score: 10,
        contains: ["bootstrap-table(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "ClickFunnels",
    url: "https://www.clickfunnels.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["clickfunnels\\.com"]
      }
    }
  },
  {
    name: "Bounce Exchange",
    url: "http://www.bounceexchange.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["bounceexchange\\.com/"]
      }
    }
  },
  {
    name: "Brightspot",
    url: "https://www.brightspot.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Brightspot$"]
      }
    }
  },
  {
    name: "BrowserCMS",
    url: "http://browsercms.org",
    rules: {
      metas: {
        score: 10,
        contains: ["BrowserCMS ([\\d.]+)"]
      }
    }
  },
  {
    name: "BugSnag",
    url: "http://bugsnag.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/bugsnag.*\\.js"]
      }
    }
  },
  {
    name: "Bugzilla",
    url: "http://www.bugzilla.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["Bugzilla_login_request_cookie"]
      },
      metas: {
        score: 10,
        contains: ["Bugzilla ?([\\d.]+)?"]
      }
    }
  },
  {
    name: "Business Catalyst",
    url: "http://businesscatalyst.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["CatalystScripts"]
      }
    }
  },
  {
    name: "BuySellAds",
    url: "http://buysellads.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["buysellads\\.com/"]
      }
    }
  },
  {
    name: "CDN77",
    url: "https://www.cdn77.com",
    rules: {
      headers: {
        score: 10,
        contains: ["CDN77-Turbo$"]
      }
    }
  },
  {
    name: "CMS Made Simple",
    url: "http://cmsmadesimple.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["CMSSESSID"]
      },
      metas: {
        score: 10,
        contains: ["CMS Made Simple"]
      }
    }
  },
  {
    name: "CMSimple",
    url: "http://www.cmsimple.org/en",
    rules: {
      metas: {
        score: 10,
        contains: ["CMSimple( [\\d.]+)?"]
      }
    }
  },
  {
    name: "CPG Dragonfly",
    url: "http://dragonflycms.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Dragonfly CMS"]
      },
      metas: {
        score: 10,
        contains: ["CPG Dragonfly"]
      }
    }
  },
  {
    name: "CacheFly",
    url: "http://www.cachefly.com",
    rules: {
      headers: {
        score: 10,
        contains: ["CFS"]
      }
    }
  },
  {
    name: "Caddy",
    url: "http://caddyserver.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Caddy$"]
      }
    }
  },
  {
    name: "CakePHP",
    url: "http://cakephp.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["cakephp"]
      },
      metas: {
        score: 10,
        contains: ["CakePHP"]
      }
    }
  },
  {
    name: "Captch Me",
    url: "http://captchme.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://api\\.captchme\\.net/"]
      }
    }
  },
  {
    name: "Carbon Ads",
    url: "http://carbonads.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["//(?:engine|srv)\\.carbonads\\.com\\/"]
      }
    }
  },
  {
    name: "Cargo",
    url: "http://cargocollective.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/cargo\\."]
      }
    }
  },
  {
    name: "Catberry.js",
    url: "http://catberry.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Catberry"]
      }
    }
  },
  {
    name: "CentOS",
    url: "http://centos.org",
    rules: {
      headers: {
        score: 10,
        contains: ["CentOS"]
      }
    }
  },
  {
    name: "Chameleon",
    url: "http://chameleon-system.de",
    rules: {
      metas: {
        score: 10,
        contains: ["chameleon-cms"]
      }
    }
  },
  {
    name: "Chamilo",
    url: "http://www.chamilo.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Chamilo ([\\d.]+)"]
      },
      metas: {
        score: 10,
        contains: ["Chamilo ([\\d.]+)"]
      }
    }
  },
  {
    name: "Chart.js",
    url: "https://www.chartjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "/Chart(?:\\.bundle)?(?:\\.min)?\\.js\\;confidence:75",
          "chartjs\\.org/dist/([\\d.]+(?:-[^/]+)?|master|latest)/Chart.*\\.js",
          "cdnjs\\.cloudflare\\.com/ajax/libs/Chart\\.js/([\\d.]+(?:-[^/]+)?)/Chart.*\\.js",
          "cdn\\.jsdelivr\\.net/(?:npm|gh/chartjs)/chart\\.js@([\\d.]+(?:-[^/]+)?|latest)/dist/Chart.*\\.js"
        ]
      }
    }
  },
  {
    name: "Chartbeat",
    url: "http://chartbeat.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["chartbeat\\.js"]
      }
    }
  },
  {
    name: "Cherokee",
    url: "http://www.cherokee-project.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Cherokee*"]
      }
    }
  },
  {
    name: "CherryPy",
    url: "http://www.cherrypy.org",
    rules: {
      headers: {
        score: 10,
        contains: ["CherryPy\\/?([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "Chevereto",
    url: "https://chevereto.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/chevereto\\.js"]
      },
      metas: {
        score: 10,
        contains: ["Chevereto*"]
      }
    }
  },
  {
    name: "Chitika",
    url: "http://chitika.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["scripts\\.chitika\\.net/"]
      }
    }
  },
  {
    name: "Ckan",
    url: "http://ckan.org/",
    rules: {
      headers: {
        score: 10,
        contains: ["X-CKAN-API-KEY", "<http://ckan\\.org/>; rel=shortlink"]
      },
      metas: {
        score: 10,
        contains: ["ckan*"]
      }
    }
  },
  {
    name: "Clarity",
    url: "https://clarity.design/",
    rules: {
      scripts: {
        score: 10,
        contains: ["clr-angular(?:\\.umd)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "ClickHeat",
    url: "http://www.labsmedia.com/clickheat/index.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["clickheat.*\\.js"]
      }
    }
  },
  {
    name: "Clicky",
    url: "http://getclicky.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["static\\.getclicky\\.com"]
      }
    }
  },
  {
    name: "Clipboard.js",
    url: "https://clipboardjs.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["clipboard(?:-([\\d.]+))?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "CloudCart",
    url: "http://cloudcart.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/cloudcart-(?:assets|storage)/"]
      },
      metas: {
        score: 10,
        contains: ["CloudCart LLC$"]
      }
    }
  },
  {
    name: "CloudFlare",
    url: "http://www.cloudflare.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["__cfduid"]
      },
      headers: {
        score: 10,
        contains: ["cloudflare"]
      }
    }
  },
  {
    name: "Cloudcoins",
    url: "https://cloudcoins.co",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "https?://cdn\\.cloudcoins\\.co/javascript/cloudcoins\\.min\\.js"
        ]
      }
    }
  },
  {
    name: "Cloudera",
    url: "http://www.cloudera.com",
    rules: {
      headers: {
        score: 10,
        contains: ["cloudera"]
      }
    }
  },
  {
    name: "Coaster CMS",
    url: "https://www.coastercms.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Coaster CMS"]
      }
    }
  },
  {
    name: "CodeIgniter",
    url: "http://codeigniter.com",
    rules: {
      cookies: {
        score: 10,
        contains: [
          "ci_csrf_token",
          "ci_session",
          "exp_last_activity",
          "exp_tracker"
        ]
      }
    }
  },
  {
    name: "CoinHive",
    url: "https://coinhive.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "\\/(?:coinhive|(authedmine))(?:\\.min)?\\.js?opt-in: ",
          "coinhive\\.com/lib"
        ]
      }
    }
  },
  {
    name: "CoinHive Captcha",
    url: "https://coinhive.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://authedmine\\.com/(?:lib/captcha|captcha)"]
      }
    }
  },
  {
    name: "Coinhave",
    url: "https://coin-have.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://coin-have\\.com/c/[0-9a-zA-Z]{4}\\.js"]
      }
    }
  },
  {
    name: "Coinimp",
    url: "https://www.coinimp.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://www\\.hashing\\.win/scripts/min\\.js"]
      }
    }
  },
  {
    name: "Coinlab",
    url: "https://coinlab.biz/en",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://coinlab\\.biz/lib/coinlab\\.js\\?id="]
      }
    }
  },
  {
    name: "CompaqHTTPServer",
    url: "http://www.hp.com",
    rules: {
      headers: {
        score: 10,
        contains: ["CompaqHTTPServer\\/?([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "Concrete5",
    url: "https://concrete5.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/concrete/js/"]
      },
      cookies: {
        score: 10,
        contains: ["CONCRETE5"]
      },
      metas: {
        score: 10,
        contains: ["concrete5*"]
      }
    }
  },
  {
    name: "Connect",
    url: "http://www.senchalabs.org/connect",
    rules: {
      headers: {
        score: 10,
        contains: ["Connect"]
      }
    }
  },
  {
    name: "Contao",
    url: "http://contao.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Contao Open Source CMS$"]
      },
      comments: {
        score: 10,
        contains: ["<!--[^>]+powered by (?:TYPOlight|Contao)[^>]*-->"]
      }
    }
  },
  {
    name: "Contenido",
    url: "http://contenido.org/en",
    rules: {
      metas: {
        score: 10,
        contains: ["Contenido ([\\d.]+)"]
      }
    }
  },
  {
    name: "Contensis",
    url: "https://zengenti.com/en-gb/products/contensis",
    rules: {
      metas: {
        score: 10,
        contains: ["Contensis CMS Version ([\\d.]+)"]
      }
    }
  },
  {
    name: "ContentBox",
    url: "http://www.gocontentbox.org",
    rules: {
      metas: {
        score: 10,
        contains: ["ContentBox powered by ColdBox"]
      }
    }
  },
  {
    name: "ConversionLab",
    url: "http://www.trackset.it/conversionlab",
    rules: {
      scripts: {
        score: 10,
        contains: ["conversionlab\\.trackset\\.com/track/tsend\\.js"]
      }
    }
  },
  {
    name: "Cosmoshop",
    url: "http://cosmoshop.de",
    rules: {
      scripts: {
        score: 10,
        contains: ["cosmoshop_functions\\.js"]
      }
    }
  },
  {
    name: "Cotonti",
    url: "http://www.cotonti.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Cotonti"]
      }
    }
  },
  {
    name: "CouchDB",
    url: "http://couchdb.apache.org",
    rules: {
      headers: {
        score: 10,
        contains: ["CouchDB/([\\d.]+)"]
      }
    }
  },
  {
    name: "Cowboy",
    url: "http://ninenines.eu",
    rules: {
      headers: {
        score: 10,
        contains: ["Cowboy"]
      }
    }
  },
  {
    name: "CppCMS",
    url: "http://cppcms.com",
    rules: {
      headers: {
        score: 10,
        contains: ["CppCMS*"]
      }
    }
  },
  {
    name: "Craft CMS",
    url: "https://craftcms.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["CraftSessionId"]
      },
      headers: {
        score: 10,
        contains: ["\\bCraft CMS\\b"]
      }
    }
  },
  {
    name: "Craft Commerce",
    url: "https://craftcommerce.com",
    rules: {
      headers: {
        score: 10,
        contains: ["\\bCraft Commerce\\b"]
      }
    }
  },
  {
    name: "Criteo",
    url: "http://criteo.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "//(?:cas\\.criteo\\.com|(?: [^/]\\.)?criteo\\.net)/",
          "//static.criteo.net/js/ld/ld.js"
        ]
      }
    }
  },
  {
    name: "Cross Pixel",
    url: "http://datadesk.crsspxl.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["tag\\.crsspxl\\.com/s1\\.js"]
      }
    }
  },
  {
    name: "Crypto-Loot",
    url: "https://crypto-loot.com/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "^/crypto-loot\\.com/lib/",
          "^/webmine\\.pro/",
          "^/cryptoloot\\.pro/",
          "/crlt\\.js\\;confidence:75"
        ]
      }
    }
  },
  {
    name: "CubeCart",
    url: "http://www.cubecart.com",
    rules: {
      metas: {
        score: 10,
        contains: ["cubecart"]
      }
    }
  },
  {
    name: "Cufon",
    url: "http://cufon.shoqolate.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cufon-yui\\.js"]
      }
    }
  },
  {
    name: "D3",
    url: "http://d3js.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/d3(?:\\. v\\d+)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "DHTMLX",
    url: "http://dhtmlx.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["dhtmlxcommon\\.js"]
      }
    }
  },
  {
    name: "DERAK.CLOUD",
    url: "https://derak.cloud/",
    rules: {
      cookies: {
        score: 10,
        contains: ["__derak_auth", "__derak_user"]
      },
      headers: {
        score: 10,
        contains: ["DERAK.CLOUD$"]
      }
    }
  },
  {
    name: "DNN",
    url: "http://dnnsoftware.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/js/dnncore\\.js", "/js/dnn\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["DotNetNukeAnonymous"]
      },
      headers: {
        score: 10,
        contains: ["dnn_IsMobile=", "DotNetNuke"]
      },
      metas: {
        score: 10,
        contains: ["DotNetNuke"]
      },
      comments: {
        score: 10,
        contains: ["<!-- by DotNetNuke Corporation"]
      }
    }
  },
  {
    name: "Dancer",
    url: "http://perldancer.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Perl Dancer ([\\d.]+)", "Perl Dancer ([\\d.]+)"]
      }
    }
  },
  {
    name: "Danneo CMS",
    url: "http://danneo.com",
    rules: {
      headers: {
        score: 10,
        contains: ["CMS Danneo ([\\d.]+)"]
      },
      metas: {
        score: 10,
        contains: ["Danneo CMS ([\\d.]+)"]
      }
    }
  },
  {
    name: "Dart",
    url: "https://www.dartlang.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/(?:\\.)?(?:dart)(?:\\.js)?/", "packages/browser/dart\\.js"]
      }
    }
  },
  {
    name: "Darwin",
    url: "https://opensource.apple.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Darwin", "Darwin"]
      }
    }
  },
  {
    name: "Datadome",
    url: "https://datadome.co/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https://ct\\.datadome\\.co/[a-z]\\.js$"]
      },
      cookies: {
        score: 10,
        contains: ["datadome"]
      },
      headers: {
        score: 10,
        contains: ["DataDome$"]
      }
    }
  },
  {
    name: "DataLife Engine",
    url: "https://dle-news.ru",
    rules: {
      metas: {
        score: 10,
        contains: ["DataLife Engine"]
      }
    }
  },
  {
    name: "DataTables",
    url: "http://datatables.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["dataTables.*\\.js"]
      }
    }
  },
  {
    name: "Debian",
    url: "https://debian.org",
    rules: {
      headers: {
        score: 10,
        contains: [
          "Debian",
          "(?:Debian|dotdeb|(potato|woody|sarge|etch|lenny|squeeze|wheezy|jessie|stretch|buster|sid))"
        ]
      }
    }
  },
  {
    name: "DedeCMS",
    url: "http://dedecms.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["dedeajax"]
      }
    }
  },
  {
    name: "DirectAdmin",
    url: "https://www.directadmin.com",
    rules: {
      headers: {
        score: 10,
        contains: ["DirectAdmin Daemon v([\\d.]+)"]
      }
    }
  },
  {
    name: "Discourse",
    url: "https://discourse.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Discourse(?: ?/?([\\d.]+\\d))?"]
      }
    }
  },
  {
    name: "Discuz! X",
    url: "http://www.discuz.net",
    rules: {
      metas: {
        score: 10,
        contains: ["Discuz! X([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "Docusaurus",
    url: "https://docusaurus.io/",
    rules: {
      metas: {
        score: 10,
        contains: ["Docusaurus$"]
      }
    }
  },
  {
    name: "Dojo",
    url: "https://dojotoolkit.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["([\\d.]+)/dojo/dojo(?:\\.xd)?\\.js"]
      }
    }
  },
  {
    name: "Dokeos",
    url: "https://dokeos.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Dokeos"]
      },
      metas: {
        score: 10,
        contains: ["Dokeos"]
      }
    }
  },
  {
    name: "DokuWiki",
    url: "https://www.dokuwiki.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["DokuWiki"]
      },
      metas: {
        score: 10,
        contains: ["DokuWiki( Release [\\d-]+)?"]
      }
    }
  },
  {
    name: "DoubleClick Ad Exchange (AdX)",
    url:
      "http://www.doubleclickbygoogle.com/solutions/digital-marketing/ad-exchange/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "googlesyndication\\.com/pagead/show_ads\\.js",
          "tpc\\.googlesyndication\\.com/safeframe",
          "googlesyndication\\.com.*abg\\.js"
        ]
      }
    }
  },
  {
    name: "DoubleClick Campaign Manager (DCM)",
    url:
      "http://www.doubleclickbygoogle.com/solutions/digital-marketing/campaign-manager/",
    rules: {
      scripts: {
        score: 10,
        contains: ["2mdn\\.net"]
      }
    }
  },
  {
    name: "DoubleClick Floodlight",
    url: "http://support.google.com/ds/answer/6029713?hl=en",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://fls\\.doubleclick\\.net"]
      }
    }
  },
  {
    name: "DoubleClick for Publishers (DFP)",
    url: "http://www.google.com/dfp",
    rules: {
      scripts: {
        score: 10,
        contains: ["googletagservices\\.com/tag/js/gpt(?:_mobile)?\\.js"]
      }
    }
  },
  {
    name: "DovetailWRP",
    url: "http://www.dovetailinternet.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\/DovetailWRP\\/"]
      }
    }
  },
  {
    name: "Doxygen",
    url: "http://www.doxygen.nl/",
    rules: {
      metas: {
        score: 10,
        contains: ["Doxygen ([\\d.]+)"]
      }
    }
  },
  {
    name: "Drupal",
    url: "https://drupal.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["drupal\\.js"]
      },
      headers: {
        score: 10,
        contains: ["19 Nov 1978", "Drupal*"]
      },
      metas: {
        score: 10,
        contains: ["Drupal*"]
      }
    }
  },
  {
    name: "Dynamicweb",
    url: "http://www.dynamicweb.dk",
    rules: {
      cookies: {
        score: 10,
        contains: ["Dynamicweb"]
      },
      metas: {
        score: 10,
        contains: ["Dynamicweb ([\\d.]+)"]
      }
    }
  },
  {
    name: "Dynatrace",
    url: "http://dynatrace.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["dtagent.*\\.js"]
      }
    }
  },
  {
    name: "EasyEngine",
    url: "https://easyengine.io",
    rules: {
      headers: {
        score: 10,
        contains: ["EasyEngine*"]
      }
    }
  },
  {
    name: "EC-CUBE",
    url: "http://www.ec-cube.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["eccube\\.js", "win_op\\.js"]
      }
    }
  },
  {
    name: "Elementor",
    url: "https://elementor.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["elementor/assets/js/[^/]+\\.js\\?ver=([\\d.]+)$"]
      }
    }
  },
  {
    name: "ELOG HTTP",
    url: "http://midas.psi.ch/elog",
    rules: {
      headers: {
        score: 10,
        contains: ["ELOG HTTP ?([\\d.-]+)?"]
      }
    }
  },
  {
    name: "EPages",
    url: "http://www.epages.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["epages 6"]
      }
    }
  },
  {
    name: "EPiServer",
    url: "http://episerver.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["EPiServer", "EPiTrace"]
      },
      metas: {
        score: 10,
        contains: ["EPiServer"]
      }
    }
  },
  {
    name: "EPrints",
    url: "http://www.eprints.org",
    rules: {
      metas: {
        score: 10,
        contains: ["EPrints ([\\d.]+)"]
      }
    }
  },
  {
    name: "EdgeCast",
    url: "http://www.edgecast.com",
    rules: {
      headers: {
        score: 10,
        contains: ["ECD\\s\\(\\S+\\)"]
      }
    }
  },
  {
    name: "Eleanor CMS",
    url: "http://eleanor-cms.ru",
    rules: {
      metas: {
        score: 10,
        contains: ["Eleanor"]
      }
    }
  },
  {
    name: "Eloqua",
    url: "http://eloqua.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["elqCfg\\.js"]
      }
    }
  },
  {
    name: "EmbedThis Appweb",
    url: "http://embedthis.com/appweb",
    rules: {
      headers: {
        score: 10,
        contains: ["Mbedthis-Appweb(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Ensighten",
    url: "https://success.ensighten.com/hc/en-us",
    rules: {
      scripts: {
        score: 10,
        contains: ["//nexus\\.ensighten\\.com/"]
      }
    }
  },
  {
    name: "Envoy",
    url: "https://www.envoyproxy.io/",
    rules: {
      headers: {
        score: 10,
        contains: ["envoy$"]
      }
    }
  },
  {
    name: "Enyo",
    url: "http://enyojs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["enyo\\.js"]
      }
    }
  },
  {
    name: "Epoch",
    url: "https://fastly.github.io/epoch",
    rules: {
      scripts: {
        score: 10,
        contains: ["epoch(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Erlang",
    url: "http://www.erlang.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Erlang( OTP/(?: [\\d.ABR-]+))?"]
      }
    }
  },
  {
    name: "Etherpad",
    url: "https://etherpad.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/ep_etherpad-lite/"]
      },
      headers: {
        score: 10,
        contains: ["Etherpad"]
      }
    }
  },
  {
    name: "Exhibit",
    url: "http://simile-widgets.org/exhibit/",
    rules: {
      scripts: {
        score: 10,
        contains: ["exhibit.*\\.js"]
      }
    }
  },
  {
    name: "Express",
    url: "http://expressjs.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Express$"]
      }
    }
  },
  {
    name: "ExpressionEngine",
    url: "http://expressionengine.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["exp_csrf_token", "exp_last_activity", "exp_tracker"]
      }
    }
  },
  {
    name: "ExtJS",
    url: "https://www.sencha.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["ext-base\\.js"]
      }
    }
  },
  {
    name: "F5 BigIP",
    url: "https://www.f5.com/products/big-ip-services",
    rules: {
      cookies: {
        score: 10,
        contains: [
          "F5_ST",
          "MRHSHint",
          "F5_HT_shrinked",
          "F5_fullWT",
          "MRHSequence",
          "MRHSession",
          "LastMRH_Session",
          "TIN"
        ]
      },
      headers: {
        score: 10,
        contains: ["big-?ip$"]
      }
    }
  },
  {
    name: "FWP",
    url: "http://fwpshop.org",
    rules: {
      metas: {
        score: 10,
        contains: ["FWP Shop"]
      }
    }
  },
  {
    name: "Facebook",
    url: "http://facebook.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["//connect\\.facebook\\.net/[^/]*/[a-z]*\\.js"]
      }
    }
  },
  {
    name: "Fact Finder",
    url: "http://fact-finder.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["Suggest\\.ff"]
      }
    }
  },
  {
    name: "FancyBox",
    url: "http://fancyapps.com/fancybox",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "jquery\\.fancybox(?:\\.pack|\\.min)?\\.js(?:\\?v=([\\d.]+))?$"
        ]
      }
    }
  },
  {
    name: "Fastcommerce",
    url: "https://www.fastcommerce.com.br",
    rules: {
      metas: {
        score: 10,
        contains: ["Fastcommerce"]
      }
    }
  },
  {
    name: "Fastly",
    url: "https://www.fastly.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Fastly-SSL"]
      }
    }
  },
  {
    name: "Fat-Free Framework",
    url: "http://fatfreeframework.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Fat-Free Framework$"]
      }
    }
  },
  {
    name: "Fedora",
    url: "http://fedoraproject.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Fedora"]
      }
    }
  },
  {
    name: "Fingerprintjs",
    url: "https://valve.github.io/fingerprintjs2/",
    rules: {
      scripts: {
        score: 10,
        contains: ["fingerprint(\\d)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Firebase",
    url: "https://firebase.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/(?:([\\d.]+)/)?firebase(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Flask",
    url: "http://flask.pocoo.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Werkzeug/?([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "FlexCMP",
    url: "http://www.flexcmp.com/cms/home",
    rules: {
      headers: {
        score: 10,
        contains: ["FlexCMP.+\\[v\\. ([\\d.]+)"]
      },
      metas: {
        score: 10,
        contains: ["FlexCMP"]
      }
    }
  },
  {
    name: "FlexSlider",
    url: "https://woocommerce.com/flexslider/",
    rules: {
      scripts: {
        score: 10,
        contains: ["jquery\\.flexslider(?:\\.min)?\\.js$"]
      }
    }
  },
  {
    name: "Flickity",
    url: "https://flickity.metafizzy.co/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/flickity(?:\\.pkgd)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Flyspray",
    url: "http://flyspray.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["flyspray_project"]
      }
    }
  },
  {
    name: "Font Awesome",
    url: "http://fontawesome.io",
    rules: {
      links: {
        score: 10,
        contains: [
          "<link[^>]* href=[^>]+(?:([\\d.]+)/)?(?:css/)?font-awesome(?:\\.min)?\\.css",
          '<link[^>]* href="https://use\\.fontawesome\\.com/releases/v([^>]+)/css/'
        ]
      },
      classes: {
        score: 1,
        contains: ["fa-"]
      }
    }
  },
  {
    name: "Fork CMS",
    url: "http://www.fork-cms.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["Fork CMS"]
      }
    }
  },
  {
    name: "Fortune3",
    url: "http://fortune3.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cartjs\\.php\\?(?:.*&)?s=[^&]*myfortune3cart\\.com"]
      }
    }
  },
  {
    name: "Foswiki",
    url: "http://foswiki.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["FOSWIKISTRIKEONE", "SFOSWIKISID"]
      }
    }
  },
  {
    name: "Lift",
    url: "http://liftweb.net",
    rules: {
      headers: {
        score: 10,
        contains: ["(x-lift-version)"]
      }
    }
  },
  {
    name: "Jenkins",
    url: "https://jenkins.io/",
    rules: {
      headers: {
        score: 10,
        contains: ["(x-jenkins)"]
      }
    }
  },
  {
    name: "Liferay",
    url: "https://www.liferay.com",
    rules: {
      headers: {
        score: 10,
        contains: ["(liferay-portal)"]
      }
    }
  },
  {
    name: "RainLoop",
    url: "https://www.rainloop.net/",
    rules: {
      scripts: {
        score: 10,
        contains: ["rainloop*"]
      },
      headers: {
        score: 10,
        contains: ["RainLoop"]
      },
      metas: {
        score: 10,
        contains: ["rlAppVersion"]
      },
      links: {
        score: 10,
        contains: [
          '<link[^>]href="rainloop/v/([0-9.]+)/static/apple-touch-icon\\.png/>'
        ]
      }
    }
  },
  {
    name: "Fireblade",
    url: "http://fireblade.com",
    rules: {
      headers: {
        score: 10,
        contains: ["fbs"]
      }
    }
  },
  {
    name: "Disqus",
    url: "https://disqus.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["disqus"]
      }
    }
  },
  {
    name: "Webflow",
    url: "https://webflow.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Webflow"]
      }
    }
  },
  {
    name: "Acquia Cloud",
    url: "https://www.acquia.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["(x-ah-environment)"]
      }
    }
  },
  {
    name: "HTTP/2",
    url: "https://http2.github.io",
    rules: {
      headers: {
        score: 10,
        contains: ["HTTP/2"]
      }
    }
  },
  {
    name: "Shopify",
    url: "http://shopify.com",
    rules: {
      headers: {
        score: 10,
        contains: ["x-shopid", "x-shopify-stage"]
      },
      links: {
        score: 10,
        contains: ["<link[^>]+=['\"]//cdn\\.shopify\\.com"]
      }
    }
  },
  {
    name: "FreeBSD",
    url: "http://freebsd.org",
    rules: {
      headers: {
        score: 10,
        contains: ["FreeBSD(?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "Freespee",
    url: "https://www.freespee.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["analytics\\.freespee\\.com/js/external/fs\\.(?:min\\.)?js"]
      }
    }
  },
  {
    name: "Freshchat",
    url: "https://www.freshworks.com/live-chat-software/",
    rules: {
      scripts: {
        score: 10,
        contains: ["wchat\\.freshchat\\.com/js/widget\\.js"]
      }
    }
  },
  {
    name: "Freshmarketer",
    url:
      "https://www.freshworks.com/marketing-automation/conversion-rate-optimization/",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.freshmarketer\\.com"]
      }
    }
  },
  {
    name: "FrontPage",
    url: "http://office.microsoft.com/frontpage",
    rules: {
      metas: {
        score: 10,
        contains: [
          "^FrontPage\\.",
          "Microsoft FrontPage(?:\\s((?:Express )?[\\d.]+))?"
        ]
      }
    }
  },
  {
    name: "Fusion Ads",
    url: "http://fusionads.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["fusionads\\.net/(?:api/([\\d.]+)/)?"]
      }
    }
  },
  {
    name: "Future Shop",
    url: "https://www.future-shop.jp",
    rules: {
      scripts: {
        score: 10,
        contains: ["future-shop.*\\.js"]
      }
    }
  },
  {
    name: "G-WAN",
    url: "http://gwan.com",
    rules: {
      headers: {
        score: 10,
        contains: ["G-WAN"]
      }
    }
  },
  {
    name: "GX WebManager",
    url: "http://www.gxsoftware.com/en/products/web-content-management.htm",
    rules: {
      metas: {
        score: 10,
        contains: ["GX WebManager(?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "Gambio",
    url: "http://gambio.de",
    rules: {
      scripts: {
        score: 10,
        contains: ["gm_javascript\\.js\\.php"]
      }
    }
  },
  {
    name: "Gatsby",
    url: "https://www.gatsbyjs.org/",
    rules: {
      metas: {
        score: 10,
        contains: ["Gatsby*"]
      }
    }
  },
  {
    name: "Gauges",
    url: "https://get.gaug.es",
    rules: {
      cookies: {
        score: 10,
        contains: ["_gauges_"]
      }
    }
  },
  {
    name: "Gemius",
    url: "https://www.gemius.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "hit\\.gemius\\.pl/xgemius\\.js",
          "hit\\.gemius\\.pl\\;confidence:0.8",
          "xgemius\\.js\\;confidence:0.3"
        ]
      }
    }
  },
  {
    name: "Gentoo",
    url: "http://www.gentoo.org",
    rules: {
      headers: {
        score: 10,
        contains: ["gentoo"]
      }
    }
  },
  {
    name: "Gerrit",
    url: "http://www.gerritcodereview.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["gerrit_ui/gerrit_ui"]
      },
      metas: {
        score: 10,
        contains: ["Gerrit Code Review$"]
      }
    }
  },
  {
    name: "GetSimple CMS",
    url: "http://get-simple.info",
    rules: {
      metas: {
        score: 10,
        contains: ["GetSimple"]
      }
    }
  },
  {
    name: "Ghost",
    url: "http://ghost.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Ghost(?:\\s([\\d.]+))?"]
      }
    }
  },
  {
    name: "GitBook",
    url: "https://www.gitbook.com",
    rules: {
      metas: {
        score: 10,
        contains: ["GitBook(?:.([\\d.]+))?"]
      }
    }
  },
  {
    name: "GitHub Pages",
    url: "https://pages.github.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["GitHub\\.com$"]
      }
    }
  },
  {
    name: "GitLab",
    url: "https://about.gitlab.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["_gitlab_session"]
      },
      metas: {
        score: 10,
        contains: ["GitLab$"]
      }
    }
  },
  {
    name: "GitLab CI",
    url: "http://about.gitlab.com/gitlab-ci",
    rules: {
      metas: {
        score: 10,
        contains: ["GitLab Continuous Integration"]
      }
    }
  },
  {
    name: "Gitea",
    url: "https://gitea.io",
    rules: {
      cookies: {
        score: 10,
        contains: ["i_like_gitea"]
      },
      metas: {
        score: 10,
        contains: ["go,git,self-hosted,gitea$"]
      }
    }
  },
  {
    name: "GlassFish",
    url: "http://glassfish.java.net",
    rules: {
      headers: {
        score: 10,
        contains: [
          "GlassFish(?: Server)?(?: Open Source Edition)?(?: ?/?([\\d.]+))?"
        ]
      }
    }
  },
  {
    name: "GoAhead",
    url: "http://embedthis.com/products/goahead/index.html",
    rules: {
      headers: {
        score: 10,
        contains: ["GoAhead"]
      }
    }
  },
  {
    name: "Gogs",
    url: "http://gogs.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["js/gogs\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["i_like_gogits"]
      },
      metas: {
        score: 10,
        contains: ["go, git, self-hosted, gogs"]
      }
    }
  },
  {
    name: "Google AdSense",
    url: "https://www.google.fr/adsense/start/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "googlesyndication\\.com/",
          "ad\\.ca\\.doubleclick\\.net",
          "2mdn\\.net",
          "ad\\.ca\\.doubleclick\\.net"
        ]
      }
    }
  },
  {
    name: "Google Analytics",
    url: "http://google.com/analytics",
    rules: {
      scripts: {
        score: 10,
        contains: ["google-analytics\\.com\\/(?:ga|urchin|analytics)\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["__utma", "_ga", "_gat"]
      }
    }
  },
  {
    name: "Google Analytics Enhanced eCommerce",
    url:
      "https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "google-analytics\\.com\\/plugins\\/ua\\/(?:ec|ecommerce)\\.js"
        ]
      }
    }
  },
  {
    name: "Google App Engine",
    url: "http://code.google.com/appengine",
    rules: {
      headers: {
        score: 10,
        contains: ["Google Frontend"]
      }
    }
  },
  {
    name: "Google Cloud",
    url: "https://cloud.google.com",
    rules: {
      headers: {
        score: 10,
        contains: ["1\\.1 google$"]
      }
    }
  },
  {
    name: "Google Font API",
    url: "http://google.com/fonts",
    rules: {
      scripts: {
        score: 10,
        contains: ["googleapis\\.com/.+webfont"]
      }
    }
  },
  {
    name: "Google Maps",
    url: "http://maps.google.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "(?:maps\\.google\\.com/maps\\?file=api(?:&v=([\\d.]+))?|maps\\.google\\.com/maps/api/staticmap)\\;version\\:API v\\1",
          "//maps\\.googleapis\\.com/maps/api/js"
        ]
      }
    }
  },
  {
    name: "Google Plus",
    url: "http://plus.google.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["apis\\.google\\.com/js/[a-z]*\\.js"]
      }
    }
  },
  {
    name: "Google Wallet",
    url: "http://wallet.google.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["checkout\\.google\\.com", "wallet\\.google\\.com"]
      }
    }
  },
  {
    name: "Google Web Server",
    url: "http://en.wikipedia.org/wiki/Google_Web_Server",
    rules: {
      headers: {
        score: 10,
        contains: ["gws"]
      }
    }
  },
  {
    name: "Graffiti CMS",
    url: "http://graffiticms.codeplex.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/graffiti\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["graffitibot"]
      },
      metas: {
        score: 10,
        contains: ["Graffiti CMS"]
      }
    }
  },
  {
    name: "Grav",
    url: "http://getgrav.org",
    rules: {
      metas: {
        score: 10,
        contains: ["GravCMS(?:\\s([\\d.]+))?"]
      }
    }
  },
  {
    name: "Gravity Forms",
    url: "http://gravityforms.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "/wp-content/plugins/gravityforms/js/[^/]+\\.js\\?ver=([\\d.]+)$"
        ]
      }
    }
  },
  {
    name: "Green Valley CMS",
    url: "http://www.greenvalley.nl/Public/Producten/Content_Management/CMS",
    rules: {
      metas: {
        score: 10,
        contains: ["/content\\.jsp\\?objectid="]
      }
    }
  },
  {
    name: "Gridsome",
    url: "https://gridsome.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Gridsome*"]
      }
    }
  },
  {
    name: "GrowingIO",
    url: "https://www.growingio.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["assets\\.growingio\\.com/([\\d.]+)/gio.js"]
      },
      cookies: {
        score: 10,
        contains: ["grwng_uid", "gr_user_id"]
      }
    }
  },
  {
    name: "HERE",
    url: "http://developer.here.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://js\\.cit\\.api\\.here\\.com/se/([\\d.]+)\\/"]
      }
    }
  },
  {
    name: "HHVM",
    url: "http://hhvm.com",
    rules: {
      headers: {
        score: 10,
        contains: ["HHVM/?([\\d.]+)?"]
      }
    }
  },
  {
    name: "HP ChaiServer",
    url: "http://hp.com",
    rules: {
      headers: {
        score: 10,
        contains: ["HP-Chai(?:Server|SOE)(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "HP Compact Server",
    url: "http://hp.com",
    rules: {
      headers: {
        score: 10,
        contains: ["HP_Compact_Server(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "HP System Management",
    url: "http://hp.com",
    rules: {
      headers: {
        score: 10,
        contains: ["HP System Management"]
      }
    }
  },
  {
    name: "HP iLO",
    url: "http://hp.com",
    rules: {
      headers: {
        score: 10,
        contains: ["HP-iLO-Server(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Haddock",
    url: "http://www.haskell.org/haddock/",
    rules: {
      scripts: {
        score: 10,
        contains: ["haddock-util\\.js"]
      }
    }
  },
  {
    name: "Hammer.js",
    url: "https://hammerjs.github.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["hammer(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Handlebars",
    url: "http://handlebarsjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["handlebars(?:\\.runtime)?(?:-v([\\d.]+?))?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Haravan",
    url: "https://www.haravan.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["haravan.*\\.js"]
      }
    }
  },
  {
    name: "HeadJS",
    url: "http://headjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["head\\.(?:core|load)(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Heap",
    url: "http://heapanalytics.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["heap-\\d+\\.js"]
      }
    }
  },
  {
    name: "Hello Bar",
    url: "http://hellobar.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["hellobar\\.js"]
      }
    }
  },
  {
    name: "Hexo",
    url: "https://hexo.io",
    rules: {
      metas: {
        score: 10,
        contains: ["Hexo(?: v?([\\d.]+))?"]
      }
    }
  },
  {
    name: "Hiawatha",
    url: "http://hiawatha-webserver.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Hiawatha v([\\d.]+)"]
      }
    }
  },
  {
    name: "Highcharts",
    url: "https://www.highcharts.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["highcharts.*\\.js"]
      }
    }
  },
  {
    name: "Highlight.js",
    url: "https://highlightjs.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/(?:([\\d.])+/)?highlight(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Highstock",
    url: "http://highcharts.com/products/highstock",
    rules: {
      scripts: {
        score: 10,
        contains: ["highstock[.-]?([\\d\\.]*\\d).*\\.js"]
      }
    }
  },
  {
    name: "Hinza Advanced CMS",
    url: "http://hinzaco.com",
    rules: {
      metas: {
        score: 10,
        contains: ["hinzacms"]
      }
    }
  },
  {
    name: "Hogan.js",
    url: "https://twitter.github.io/hogan.js/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "hogan-[.-]([\\d.]*\\d)[^/]*\\.js",
          "([\\d.]+)/hogan(?:\\.min)?\\.js"
        ]
      }
    }
  },
  {
    name: "Homeland",
    url: "https://gethomeland.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["_homeland_"]
      }
    }
  },
  {
    name: "Hotaru CMS",
    url: "http://hotarucms.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["hotaru_mobile"]
      },
      metas: {
        score: 10,
        contains: ["Hotaru CMS"]
      }
    }
  },
  {
    name: "Hotjar",
    url: "https://www.hotjar.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["//static\\.hotjar\\.com/c/hotjar-"]
      }
    }
  },
  {
    name: "Hugo",
    url: "http://gohugo.io",
    rules: {
      metas: {
        score: 10,
        contains: ["Hugo ([\\d.]+)?"]
      }
    }
  },
  {
    name: "Hybris",
    url: "https://hybris.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["_hybris"]
      }
    }
  },
  {
    name: "IBM Coremetrics",
    url: "http://ibm.com/software/marketing-solutions/coremetrics",
    rules: {
      scripts: {
        score: 10,
        contains: ["cmdatatagutils\\.js"]
      }
    }
  },
  {
    name: "IBM HTTP Server",
    url: "http://ibm.com/software/webservers/httpservers",
    rules: {
      headers: {
        score: 10,
        contains: ["IBM_HTTP_Server(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "IBM Tivoli Storage Manager",
    url: "http://ibm.com",
    rules: {
      headers: {
        score: 10,
        contains: ["TSM_HTTP(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "IIS",
    url: "http://www.iis.net",
    rules: {
      headers: {
        score: 10,
        contains: ["(?:Microsoft-)?IIS(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "INFOnline",
    url: "https://www.infonline.de",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://(?: [^/]+\\.)?i(?:oam|v)wbox\\.de/"]
      }
    }
  },
  {
    name: "IPB",
    url: "https://invisioncommunity.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["jscripts/ips_"]
      },
      cookies: {
        score: 10,
        contains: ["ipbWWLmodpids", "ipbWWLsession_id"]
      }
    }
  },
  {
    name: "Ideasoft",
    url: "https://www.ideasoft.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\.myideasoft\\.com/"]
      }
    }
  },
  {
    name: "Immutable.js",
    url: "https://facebook.github.io/immutable-js/",
    rules: {
      scripts: {
        score: 10,
        contains: ["immutable\\.(?:min\\.)?js$"]
      }
    }
  },
  {
    name: "ImpressCMS",
    url: "http://www.impresscms.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["include/linkexternal\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["ICMSSession", "ImpressCMS"]
      },
      metas: {
        score: 10,
        contains: ["ImpressCMS"]
      }
    }
  },
  {
    name: "ImpressPages",
    url: "http://impresspages.org",
    rules: {
      metas: {
        score: 10,
        contains: ["ImpressPages(?: CMS)?( [\\d.]*)?"]
      }
    }
  },
  {
    name: "InProces",
    url: "http://www.brein.nl/oplossing/product/website",
    rules: {
      scripts: {
        score: 10,
        contains: ["brein/inproces/website/websitefuncties\\.js"]
      }
    }
  },
  {
    name: "Incapsula",
    url: "http://www.incapsula.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Incapsula"]
      }
    }
  },
  {
    name: "PageCDN",
    url: "https://pagecdn.com",
    rules: {
      headers: {
        score: 10,
        contains: ["PageCDN"]
      }
    }
  },
  {
    name: "Indexhibit",
    url: "http://www.indexhibit.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Indexhibit"]
      }
    }
  },
  {
    name: "Indico",
    url: "http://indico-software.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["MAKACSESSION"]
      }
    }
  },
  {
    name: "Indy",
    url: "http://indyproject.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Indy(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Inspectlet",
    url: "https://www.inspectlet.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.inspectlet\\.com"]
      },
      comments: {
        score: 10,
        contains: ["<!-- (?:Begin|End) Inspectlet Embed Code -->"]
      }
    }
  },
  {
    name: "Instabot",
    url: "https://instabot.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/rokoInstabot\\.js"]
      }
    }
  },
  {
    name: "InstantCMS",
    url: "http://www.instantcms.ru",
    rules: {
      cookies: {
        score: 10,
        contains: ["InstantCMS[logdate]"]
      },
      metas: {
        score: 10,
        contains: ["InstantCMS"]
      }
    }
  },
  {
    name: "Intel Active Management Technology",
    url: "http://intel.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Intel\\(R\\) Active Management Technology(?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "IntenseDebate",
    url: "http://intensedebate.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["intensedebate\\.com"]
      }
    }
  },
  {
    name: "Intercom",
    url: "https://www.intercom.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "(?:api\\.intercom\\.io/api|static\\.intercomcdn\\.com/intercom\\.v1)"
        ]
      }
    }
  },
  {
    name: "Intershop",
    url: "http://intershop.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:is-bin|INTERSHOP)"]
      }
    }
  },
  {
    name: "Invenio",
    url: "http://invenio-software.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["INVENIOSESSION"]
      }
    }
  },
  {
    name: "Inwemo",
    url: "https://inwemo.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://cdn\\.inwemo\\.com/inwemo\\.min\\.js"]
      }
    }
  },
  {
    name: "JAlbum",
    url: "http://jalbum.net/en",
    rules: {
      metas: {
        score: 10,
        contains: ["JAlbum( [\\d.]+)?"]
      }
    }
  },
  {
    name: "JBoss Application Server",
    url: "http://jboss.org/jbossas.html",
    rules: {
      headers: {
        score: 10,
        contains: ["JBoss(?:-([\\d.]+))?"]
      }
    }
  },
  {
    name: "JET Enterprise",
    url: "http://www.jetecommerce.com.br/",
    rules: {
      headers: {
        score: 10,
        contains: ["jet-enterprise"]
      }
    }
  },
  {
    name: "JS Charts",
    url: "http://www.jscharts.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["jscharts.*\\.js"]
      }
    }
  },
  {
    name: "JSEcoin",
    url: "https://jsecoin.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:https):?//load\\.jsecoin\\.com/load/"]
      }
    }
  },
  {
    name: "JTL Shop",
    url: "http://www.jtl-software.de/produkte/jtl-shop3",
    rules: {
      cookies: {
        score: 10,
        contains: ["JTLSHOP"]
      }
    }
  },
  {
    name: "Jalios",
    url: "http://www.jalios.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Jalios"]
      }
    }
  },
  {
    name: "Java",
    url: "http://java.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["JSESSIONID"]
      }
    }
  },
  {
    name: "Java Servlet",
    url: "http://www.oracle.com/technetwork/java/index-jsp-135475.html",
    rules: {
      headers: {
        score: 10,
        contains: ["Servlet(?:.([\\d.]+))?"]
      }
    }
  },
  {
    name: "JavaScript Infovis Toolkit",
    url: "https://philogb.github.io/jit/",
    rules: {
      scripts: {
        score: 10,
        contains: ["jit(?:-yc)?\\.js"]
      }
    }
  },
  {
    name: "JavaServer Faces",
    url: "http://javaserverfaces.java.net",
    rules: {
      headers: {
        score: 10,
        contains: ["JSF(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "JavaServer Pages",
    url: "http://www.oracle.com/technetwork/java/javaee/jsp/index.html",
    rules: {
      headers: {
        score: 10,
        contains: ["JSP(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Jekyll",
    url: "http://jekyllrb.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Jekyll (v[\\d.]+)?"]
      }
    }
  },
  {
    name: "Jetty",
    url: "http://www.eclipse.org/jetty",
    rules: {
      headers: {
        score: 10,
        contains: ["Jetty(?:\\(([\\d\\.]*\\d+))?"]
      }
    }
  },
  {
    name: "Jirafe",
    url: "https://docs.jirafe.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/jirafe\\.js"]
      }
    }
  },
  {
    name: "JobberBase",
    url: "http://www.jobberbase.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Jobberbase"]
      }
    }
  },
  {
    name: "Joomla",
    url: "https://www.joomla.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Joomla! ([\\d.]+)"]
      },
      metas: {
        score: 10,
        contains: ["Joomla!(?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "Kajabi",
    url: "https://newkajabi.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["_kjb_session"]
      }
    }
  },
  {
    name: "Kampyle",
    url: "http://www.kampyle.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cf\\.kampyle\\.com/k_button\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["k_visit"]
      }
    }
  },
  {
    name: "Kamva",
    url: "https://kamva.ir",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.mykamva\\.ir"]
      },
      metas: {
        score: 10,
        contains: ["[CK]amva"]
      }
    }
  },
  {
    name: "Kemal",
    url: "http://kemalcr.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Kemal"]
      }
    }
  },
  {
    name: "Kentico CMS",
    url: "http://www.kentico.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["CMSPreferredCulture"]
      },
      metas: {
        score: 10,
        contains: ["Kentico CMS ([\\d.R]+ \\(build [\\d.]+\\))"]
      }
    }
  },
  {
    name: "Kestrel",
    url:
      "https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel",
    rules: {
      headers: {
        score: 10,
        contains: ["Kestrel"]
      }
    }
  },
  {
    name: "KeyCDN",
    url: "http://www.keycdn.com",
    rules: {
      headers: {
        score: 10,
        contains: ["keycdn-engine$"]
      }
    }
  },
  {
    name: "Kibana",
    url: "http://www.elastic.co/products/kibana",
    rules: {
      headers: {
        score: 10,
        contains: ["kibana", "^([\\d.]+)$"]
      }
    }
  },
  {
    name: "KineticJS",
    url: "https://github.com/ericdrowell/KineticJS/",
    rules: {
      scripts: {
        score: 10,
        contains: ["kinetic(?:-v?([\\d.]+))?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Koa",
    url: "http://koajs.com",
    rules: {
      headers: {
        score: 10,
        contains: ["koa"]
      }
    }
  },
  {
    name: "Koala Framework",
    url: "http://koala-framework.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Koala Web Framework CMS"]
      }
    }
  },
  {
    name: "Koha",
    url: "https://koha-community.org/",
    rules: {
      metas: {
        score: 10,
        contains: ["Koha*"]
      }
    }
  },
  {
    name: "Kohana",
    url: "http://kohanaframework.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["kohanasession"]
      },
      headers: {
        score: 10,
        contains: ["Kohana Framework ([\\d.]+)"]
      }
    }
  },
  {
    name: "Koken",
    url: "http://koken.me",
    rules: {
      scripts: {
        score: 10,
        contains: ["koken(?:\\.js\\?([\\d.]+)|/storage)"]
      },
      cookies: {
        score: 10,
        contains: ["koken_referrer"]
      },
      metas: {
        score: 10,
        contains: ["Koken ([\\d.]+)"]
      }
    }
  },
  {
    name: "Kolibri CMS",
    url: "http://alias.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Kolibri"]
      },
      metas: {
        score: 10,
        contains: ["Kolibri"]
      }
    }
  },
  {
    name: "Komodo CMS",
    url: "http://www.komodocms.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Komodo CMS"]
      }
    }
  },
  {
    name: "Kontaktify",
    url: "https://www.kontaktify.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["//(?:www\\.)?kontaktify\\.com/embed\\.js"]
      }
    }
  },
  {
    name: "Koobi",
    url: "http://dream4.de/cms",
    rules: {
      metas: {
        score: 10,
        contains: ["Koobi"]
      }
    }
  },
  {
    name: "Kotisivukone",
    url: "http://www.kotisivukone.fi",
    rules: {
      scripts: {
        score: 10,
        contains: ["kotisivukone(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "LEPTON",
    url: "http://www.lepton-cms.org",
    rules: {
      metas: {
        score: 10,
        contains: ["LEPTON"]
      }
    }
  },
  {
    name: "LabVIEW",
    url: "http://ni.com/labview",
    rules: {
      headers: {
        score: 10,
        contains: ["LabVIEW(?:/([\\d\\.]+))?"]
      }
    }
  },
  {
    name: "Laravel",
    url: "https://laravel.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["laravel_session"]
      }
    }
  },
  {
    name: "Laterpay",
    url: "https://www.laterpay.net/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "https?://connectormwi\\.laterpay\\.net/([0-9.]+)[a-zA-z-]*/live/[\\w-]+\\.js"
        ]
      },
      metas: {
        score: 10,
        contains: ["deobfuscateText"]
      }
    }
  },
  {
    name: "Lazy.js",
    url: "http://danieltao.com/lazy.js",
    rules: {
      scripts: {
        score: 10,
        contains: ["lazy(?:\\.browser)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Leaflet",
    url: "http://leafletjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["leaflet.*\\.js"]
      }
    }
  },
  {
    name: "LightMon Engine",
    url: "http://lightmon.ru",
    rules: {
      cookies: {
        score: 10,
        contains: ["lm_online"]
      },
      metas: {
        score: 10,
        contains: ["LightMon Engine"]
      }
    }
  },
  {
    name: "Lightbox",
    url: "http://lokeshdhakar.com/projects/lightbox2/",
    rules: {
      scripts: {
        score: 10,
        contains: ["lightbox.*\\.js"]
      }
    }
  },
  {
    name: "Lightspeed eCom",
    url: "http://www.lightspeedhq.com/products/ecommerce/",
    rules: {
      scripts: {
        score: 10,
        contains: ["http://assets\\.webshopapp\\.com"]
      }
    }
  },
  {
    name: "Lighty",
    url: "https://gitlab.com/lighty/framework",
    rules: {
      cookies: {
        score: 10,
        contains: ["lighty_version"]
      }
    }
  },
  {
    name: "LimeSurvey",
    url: "http://limesurvey.org/",
    rules: {
      headers: {
        score: 10,
        contains: ["LimeSurvey"]
      }
    }
  },
  {
    name: "LinkSmart",
    url: "http://linksmart.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "^https?://cdn\\.linksmart\\.com/linksmart_([\\d.]+?)(?:\\.min)?\\.js"
        ]
      }
    }
  },
  {
    name: "Linkedin",
    url: "http://linkedin.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["//platform\\.linkedin\\.com/in\\.js"]
      }
    }
  },
  {
    name: "List.js",
    url: "http://listjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["list\\.(?:min\\.)?js$"]
      }
    }
  },
  {
    name: "LiteSpeed",
    url: "http://litespeedtech.com",
    rules: {
      headers: {
        score: 10,
        contains: ["LiteSpeed$"]
      }
    }
  },
  {
    name: "Lithium",
    url: "https://www.lithium.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["LithiumVisitor"]
      }
    }
  },
  {
    name: "LiveChat",
    url: "http://livechatinc.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.livechatinc\\.com/.*tracking\\.js"]
      }
    }
  },
  {
    name: "LivePerson",
    url: "https://www.liveperson.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://lptag\\.liveperson\\.net/tag/tag\\.js"]
      }
    }
  },
  {
    name: "LiveStreet CMS",
    url: "http://livestreetcms.com",
    rules: {
      headers: {
        score: 10,
        contains: ["LiveStreet CMS"]
      }
    }
  },
  {
    name: "Livefyre",
    url: "http://livefyre.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["livefyre_init\\.js"]
      }
    }
  },
  {
    name: "Liveinternet",
    url: "http://liveinternet.ru/rating/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/js/al/common\\.js\\?[0-9_]+"]
      }
    }
  },
  {
    name: "Lodash",
    url: "http://www.lodash.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["lodash.*\\.js"]
      }
    }
  },
  {
    name: "Logitech Media Server",
    url: "http://www.mysqueezebox.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Logitech Media Server(?: \\(([\\d\\.]+))?"]
      }
    }
  },
  {
    name: "Lotus Domino",
    url: "http://www-01.ibm.com/software/lotus/products/domino",
    rules: {
      headers: {
        score: 10,
        contains: ["Lotus-Domino"]
      }
    }
  },
  {
    name: "LOU",
    url: "https://www.louassist.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.louassist\\.com*"]
      }
    }
  },
  {
    name: "Lua",
    url: "http://www.lua.org",
    rules: {
      headers: {
        score: 10,
        contains: ["\\bLua(?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "M.R. Inc Webserver",
    url: "http://mrincworld.com",
    rules: {
      headers: {
        score: 10,
        contains: ["M\\.R\\. Inc Webserver"]
      }
    }
  },
  {
    name: "MODX",
    url: "http://modx.com",
    rules: {
      headers: {
        score: 10,
        contains: ["MODX"]
      },
      metas: {
        score: 10,
        contains: ["MODX[^\\d.]*([\\d.]+)?"]
      }
    }
  },
  {
    name: "MYPAGE Platform",
    url: "https://www.mypage.vn",
    rules: {
      cookies: {
        score: 10,
        contains: ["mypage_session"]
      }
    }
  },
  {
    name: "Botble CMS",
    url: "https://botble.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["botble_session"]
      }
    }
  },
  {
    name: "MadAdsMedia",
    url: "http://madadsmedia.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://(?:ads-by|pixel)\\.madadsmedia\\.com/"]
      }
    }
  },
  {
    name: "Magento",
    url: "https://magento.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "js/mage",
          "skin/frontend/(?:default|(enterprise))?Enterprise:Community",
          "static/_requirejs\\;confidence:50\\;version:2"
        ]
      },
      cookies: {
        score: 10,
        contains: ["frontend"]
      }
    }
  },
  {
    name: "MailChimp",
    url: "http://mailchimp.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "s3\\.amazonaws\\.com/downloads\\.mailchimp\\.com/js/mc-validate\\.js",
          "cdn-images\\.mailchimp\\.com/[^>]*\\.css"
        ]
      }
    }
  },
  {
    name: "Mambo",
    url: "http://mambo-foundation.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Mambo"]
      }
    }
  },
  {
    name: "ManyContacts",
    url: "http://www.manycontacts.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\/assets\\/js\\/manycontacts\\.min\\.js"]
      }
    }
  },
  {
    name: "Marionette.js",
    url: "https://marionettejs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["backbone\\.marionette.*\\.js"]
      }
    }
  },
  {
    name: "Marked",
    url: "https://marked.js.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/marked(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Marketo",
    url: "https://www.marketo.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["munchkin\\.marketo\\.net/munchkin\\.js"]
      }
    }
  },
  {
    name: "Material Design Lite",
    url: "https://getmdl.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:/([\\d.]+))?/material(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Materialize CSS",
    url: "http://materializecss.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["materialize(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "MathJax",
    url: "https://www.mathjax.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["([\\d.]+)?/mathjax\\.js"]
      }
    }
  },
  {
    name: "Matomo",
    url: "https://matomo.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["piwik\\.js|piwik\\.php"]
      },
      cookies: {
        score: 10,
        contains: ["PIWIK_SESSID"]
      },
      metas: {
        score: 10,
        contains: [
          "app-id=737216887",
          "(?:Matomo|Piwik) - Open Source Web Analytics",
          "app-id=org\\.piwik\\.mobile2"
        ]
      }
    }
  },
  {
    name: "Mautic",
    url: "https://www.mautic.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["[^a-z]mtc.*\\.js"]
      }
    }
  },
  {
    name: "MaxCDN",
    url: "http://www.maxcdn.com",
    rules: {
      headers: {
        score: 10,
        contains: ["NetDNA", "^maxcdn$"]
      }
    }
  },
  {
    name: "MaxSite CMS",
    url: "http://max-3000.com",
    rules: {
      metas: {
        score: 10,
        contains: ["MaxSite CMS"]
      }
    }
  },
  {
    name: "Mean.io",
    url: "http://mean.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Mean\\.io"]
      }
    }
  },
  {
    name: "MediaTomb",
    url: "http://mediatomb.cc",
    rules: {
      headers: {
        score: 10,
        contains: ["MediaTomb(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "MediaWiki",
    url: "https://www.mediawiki.org",
    rules: {
      metas: {
        score: 10,
        contains: ["MediaWiki*"]
      }
    }
  },
  {
    name: "Medium",
    url: "https://medium.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["medium\\.com"]
      },
      headers: {
        score: 10,
        contains: ["Medium$"]
      }
    }
  },
  {
    name: "Melis CMS V2",
    url: "http://www.melistechnology.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["Melis CMS"]
      }
    }
  },
  {
    name: "Melis CMS V2",
    url: "http://www.melistechnology.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["Melis CMS"]
      }
    }
  },
  {
    name: "MemberStack",
    url: "https://www.memberstack.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["memberstack\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["memberstack"]
      }
    }
  },
  {
    name: "Mermaid",
    url: "https://mermaidjs.github.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/mermaid(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Microsoft ASP.NET",
    url: "https://www.asp.net",
    rules: {
      cookies: {
        score: 10,
        contains: ["ASP.NET_SessionId", "ASPSESSION"]
      },
      headers: {
        score: 10,
        contains: ["ASP\\.NET"]
      }
    }
  },
  {
    name: "Microsoft Excel",
    url: "https://office.microsoft.com/excel",
    rules: {
      metas: {
        score: 10,
        contains: ["Excel\\.", "Microsoft Excel( [\\d.]+)?"]
      }
    }
  },
  {
    name: "Microsoft HTTPAPI",
    url: "http://microsoft.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Microsoft-HTTPAPI(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Microsoft PowerPoint",
    url: "https://office.microsoft.com/powerpoint",
    rules: {
      metas: {
        score: 10,
        contains: ["PowerPoint\\.", "Microsoft PowerPoint ( [\\d.]+)?"]
      }
    }
  },
  {
    name: "Microsoft Publisher",
    url: "https://office.microsoft.com/publisher",
    rules: {
      metas: {
        score: 10,
        contains: ["Publisher\\.", "Microsoft Publisher( [\\d.]+)?"]
      }
    }
  },
  {
    name: "Microsoft Word",
    url: "https://office.microsoft.com/word",
    rules: {
      metas: {
        score: 10,
        contains: ["Word\\.", "Microsoft Word( [\\d.]+)?"]
      }
    }
  },
  {
    name: "Mietshop",
    url: "http://www.mietshop.de/",
    rules: {
      metas: {
        score: 10,
        contains: ["Mietshop"]
      }
    }
  },
  {
    name: "Milligram",
    url: "https://milligram.github.io",
    rules: {
      links: {
        score: 10,
        contains: ['<link[^>]+?href="[^"]+milligram(?:\\.min)?\\.css']
      }
    }
  },
  {
    name: "Minero.cc",
    url: "http://minero.cc/",
    rules: {
      scripts: {
        score: 10,
        contains: ["//minero\\.cc/lib/minero(?:-miner|-hidden)?\\.min\\.js"]
      }
    }
  },
  {
    name: "MiniServ",
    url: "http://sourceforge.net/projects/miniserv",
    rules: {
      headers: {
        score: 10,
        contains: ["MiniServ\\/?([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "Mint",
    url: "https://haveamint.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["mint/\\?js"]
      }
    }
  },
  {
    name: "Mithril",
    url: "https://mithril.js.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["mithril/\\?js"]
      }
    }
  },
  {
    name: "Mixpanel",
    url: "https://mixpanel.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["api\\.mixpanel\\.com/track"]
      }
    }
  },
  {
    name: "MkDocs",
    url: "http://www.mkdocs.org/",
    rules: {
      metas: {
        score: 10,
        contains: ["mkdocs-([\\d.]+)"]
      }
    }
  },
  {
    name: "Mobify",
    url: "https://www.mobify.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["//cdn\\.mobify\\.com/"]
      }
    }
  },
  {
    name: "Mobirise",
    url: "https://mobirise.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Mobirise*"]
      },
      comments: {
        score: 10,
        contains: ["<!-- Site made with Mobirise Website Builder v([\\d.]+)"]
      }
    }
  },
  {
    name: "MochiKit",
    url: "https://mochi.github.io/mochikit/",
    rules: {
      scripts: {
        score: 10,
        contains: ["MochiKit(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "MochiWeb",
    url: "https://github.com/mochi/mochiweb",
    rules: {
      headers: {
        score: 10,
        contains: ["MochiWeb(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Modernizr",
    url: "https://modernizr.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["([\\d.]+)?/modernizr(?:.([\\d.]+))?.*\\.js?\\1:\\2"]
      }
    }
  },
  {
    name: "Modified",
    url: "http://www.modified-shop.org/",
    rules: {
      metas: {
        score: 10,
        contains: [
          "\\(c\\) by modified eCommerce Shopsoftware ------ http://www\\.modified-shop\\.org"
        ]
      }
    }
  },
  {
    name: "Moguta.CMS",
    url: "https://moguta.ru",
    rules: {
      scripts: {
        score: 10,
        contains: ["mg-(?:core|plugins|templates)/"]
      }
    }
  },
  {
    name: "MoinMoin",
    url: "https://moinmo.in",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "moin(?:_static(\\d)(\\d)(\\d)|.+)/common/js/common\\.js.\\2.\\3"
        ]
      },
      cookies: {
        score: 10,
        contains: ["MOIN_SESSION"]
      }
    }
  },
  {
    name: "Mojolicious",
    url: "http://mojolicio.us",
    rules: {
      headers: {
        score: 10,
        contains: ["mojolicious", "mojolicious"]
      }
    }
  },
  {
    name: "Mollom",
    url: "http://mollom.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["mollom(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Moment Timezone",
    url: "http://momentjs.com/timezone/",
    rules: {
      scripts: {
        score: 10,
        contains: ["moment-timezone(?:-data)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Moment.js",
    url: "https://momentjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["moment(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Mondo Media",
    url: "http://mondo-media.de",
    rules: {
      metas: {
        score: 10,
        contains: ["Mondo Shop"]
      }
    }
  },
  {
    name: "Mongrel",
    url: "http://mongrel2.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Mongrel"]
      }
    }
  },
  {
    name: "Monkey HTTP Server",
    url: "http://monkey-project.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Monkey/?([\\d.]+)?"]
      }
    }
  },
  {
    name: "Mono",
    url: "http://mono-project.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Mono"]
      }
    }
  },
  {
    name: "Mono.net",
    url: "https://www.mono.net/en",
    rules: {
      scripts: {
        score: 10,
        contains: ["monotracker(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "MooTools",
    url: "https://mootools.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["mootools.*\\.js"]
      }
    }
  },
  {
    name: "Moodle",
    url: "http://moodle.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["MOODLEID_", "MoodleSession"]
      },
      metas: {
        score: 10,
        contains: ["moodle"]
      }
    }
  },
  {
    name: "Moon",
    url: "https://kbrsh.github.io/moon/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/moon(?:\\.min)?\\.js$"]
      }
    }
  },
  {
    name: "MotoCMS",
    url: "http://motocms.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/mt-includes/js/website(?:assets)?\\.(?:min)?\\.js"]
      }
    }
  },
  {
    name: "Mouse Flow",
    url: "https://mouseflow.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.mouseflow\\.com"]
      }
    }
  },
  {
    name: "Movable Type",
    url: "http://movabletype.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Movable Type"]
      }
    }
  },
  {
    name: "Mozard Suite",
    url: "http://mozard.nl",
    rules: {
      metas: {
        score: 10,
        contains: ["Mozard"]
      }
    }
  },
  {
    name: "Mura CMS",
    url: "http://www.getmura.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Mura CMS ([\\d]+)"]
      }
    }
  },
  {
    name: "Mustache",
    url: "https://mustache.github.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["mustache(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "MyBlogLog",
    url: "http://www.mybloglog.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["pub\\.mybloglog\\.com"]
      }
    }
  },
  {
    name: "Mynetcap",
    url: "http://www.netcap-creation.fr",
    rules: {
      metas: {
        score: 10,
        contains: ["Mynetcap"]
      }
    }
  },
  {
    name: "NEO - Omnichannel Commerce Platform",
    url: "http://www.jetecommerce.com.br/",
    rules: {
      headers: {
        score: 10,
        contains: ["jet-neo"]
      }
    }
  },
  {
    name: "NVD3",
    url: "http://nvd3.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["nv\\.d3(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Navegg",
    url: "https://www.navegg.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["tag\\.navdmp\\.com"]
      }
    }
  },
  {
    name: "Neos Flow",
    url: "https://flow.neos.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Flow/?(.+)?$"]
      }
    }
  },
  {
    name: "Nepso",
    url: "http://nepso.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Nepso"]
      }
    }
  },
  {
    name: "Netlify",
    url: "https://www.netlify.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["Netlify"]
      }
    }
  },
  {
    name: "Neto",
    url: "https://www.neto.com.au",
    rules: {
      scripts: {
        score: 10,
        contains: ["jquery\\.neto.*\\.js"]
      }
    }
  },
  {
    name: "Netsuite",
    url: "http://netsuite.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["NS_VER"]
      }
    }
  },
  {
    name: "Nette Framework",
    url: "https://nette.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["nette-browser"]
      },
      headers: {
        score: 10,
        contains: ["Nette Framework"]
      }
    }
  },
  {
    name: "Next.js",
    url: "https://github.com/zeit/next.js",
    rules: {
      headers: {
        score: 10,
        contains: ["Next\\.js ?([0-9.]+)?"]
      }
    }
  },
  {
    name: "NextGEN Gallery",
    url: "https://www.imagely.com/wordpress-gallery-plugin",
    rules: {
      scripts: {
        score: 10,
        contains: ["/nextgen-gallery/js/"]
      },
      comments: {
        score: 10,
        contains: ['<!-- <meta name="NextGEN" version="([\\d.]+)" /> -->']
      }
    }
  },
  {
    name: "Nginx",
    url: "http://nginx.org/en",
    rules: {
      headers: {
        score: 10,
        contains: ["nginx(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "NodeBB",
    url: "https://nodebb.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/nodebb\\.min\\.js\\?"]
      },
      headers: {
        score: 10,
        contains: ["NodeBB$"]
      }
    }
  },
  {
    name: "Now",
    url: "https://zeit.co/now",
    rules: {
      headers: {
        score: 10,
        contains: ["now$"]
      }
    }
  },
  {
    name: "OWL Carousel",
    url: "https://owlcarousel2.github.io/OwlCarousel2/",
    rules: {
      scripts: {
        score: 10,
        contains: ["owl\\.carousel.*\\.js"]
      }
    }
  },
  {
    name: "October CMS",
    url: "http://octobercms.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["october_session="]
      }
    }
  },
  {
    name: "Octopress",
    url: "http://octopress.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/octopress\\.js"]
      },
      metas: {
        score: 10,
        contains: ["Octopress"]
      }
    }
  },
  {
    name: "Odoo",
    url: "http://odoo.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "/web/js/(?:web\\.assets_common/|website\\.assets_frontend/)\\;confidence:25"
        ]
      },
      metas: {
        score: 10,
        contains: ["Odoo"]
      }
    }
  },
  {
    name: "Olark",
    url: "https://www.olark.com/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "^https?:\\/\\/static\\.olark\\.com\\/jsclient\\/loader1\\.js"
        ]
      }
    }
  },
  {
    name: "Open Classifieds",
    url: "http://open-classifieds.com",
    rules: {
      metas: {
        score: 10,
        contains: ["open-classifieds\\.com", "Open Classifieds ?([0-9.]+)?"]
      }
    }
  },
  {
    name: "Open Journal Systems",
    url: "http://pkp.sfu.ca/ojs",
    rules: {
      cookies: {
        score: 10,
        contains: ["OJSSID"]
      },
      metas: {
        score: 10,
        contains: ["Open Journal Systems(?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "Open eShop",
    url: "http://open-eshop.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["open-eshop\\.com", "Open eShop ?([0-9.]+)?"]
      }
    }
  },
  {
    name: "OpenBSD httpd",
    url: "https://man.openbsd.org/httpd.8",
    rules: {
      headers: {
        score: 10,
        contains: ["OpenBSD httpd"]
      }
    }
  },
  {
    name: "OpenCart",
    url: "http://www.opencart.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["OCSESSID"]
      }
    }
  },
  {
    name: "OpenCms",
    url: "http://www.opencms.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["opencms"]
      },
      headers: {
        score: 10,
        contains: ["OpenCms"]
      }
    }
  },
  {
    name: "OpenGSE",
    url: "http://code.google.com/p/opengse",
    rules: {
      headers: {
        score: 10,
        contains: ["GSE"]
      }
    }
  },
  {
    name: "OpenGrok",
    url: "http://hub.opensolaris.org/bin/view/Project+opengrok/WebHome",
    rules: {
      cookies: {
        score: 10,
        contains: ["OpenGrok"]
      },
      metas: {
        score: 10,
        contains: ["OpenGrok(?: v?([\\d.]+))?"]
      }
    }
  },
  {
    name: "OpenLayers",
    url: "https://openlayers.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["openlayers"]
      }
    }
  },
  {
    name: "OpenNemas",
    url: "http://www.opennemas.com",
    rules: {
      headers: {
        score: 10,
        contains: ["OpenNemas"]
      },
      metas: {
        score: 10,
        contains: ["OpenNemas"]
      }
    }
  },
  {
    name: "OpenResty",
    url: "http://openresty.org",
    rules: {
      headers: {
        score: 10,
        contains: ["openresty(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "OpenSSL",
    url: "http://openssl.org",
    rules: {
      headers: {
        score: 10,
        contains: ["OpenSSL(?:/([\\d.]+[a-z]?))?"]
      }
    }
  },
  {
    name: "OpenUI5",
    url: "http://openui5.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["sap-ui-core\\.js"]
      }
    }
  },
  {
    name: "OpenX",
    url: "http://openx.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "https?://[^/]*\\.openx\\.net",
          "https?://[^/]*\\.servedbyopenx\\.com"
        ]
      }
    }
  },
  {
    name: "Ophal",
    url: "http://ophal.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["ophal\\.js"]
      },
      headers: {
        score: 10,
        contains: ["Ophal(?: (.+))? \\(ophal\\.org\\)"]
      },
      metas: {
        score: 10,
        contains: ["Ophal(?: (.+))? \\(ophal\\.org\\)"]
      }
    }
  },
  {
    name: "Optimizely",
    url: "https://www.optimizely.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["optimizely\\.com.*\\.js"]
      }
    }
  },
  {
    name: "Oracle Application Server",
    url: "http://www.oracle.com/technetwork/middleware/ias/overview/index.html",
    rules: {
      headers: {
        score: 10,
        contains: [
          "Oracle[- ]Application[- ]Server(?: Containers for J2EE)?(?: [- ](\\d[\\da-z./]+))?"
        ]
      }
    }
  },
  {
    name: "Oracle Commerce",
    url:
      "http://www.oracle.com/applications/customer-experience/commerce/products/commerce-platform/index.html",
    rules: {
      headers: {
        score: 10,
        contains: ["(ATGPlatform)"]
      }
    }
  },
  {
    name: "Oracle HTTP Server",
    url: "http://oracle.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Oracle-HTTP-Server(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Oracle Recommendations On Demand",
    url:
      "http://www.oracle.com/us/products/applications/commerce/recommendations-on-demand/index.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["atgsvcs.+atgsvcs\\.js"]
      }
    }
  },
  {
    name: "Oracle Web Cache",
    url: "http://oracle.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Oracle(?:AS)?[- ]Web[- ]Cache(?: [- /]([\\da-z./]+))?"]
      }
    }
  },
  {
    name: "Orchard CMS",
    url: "http://orchardproject.net",
    rules: {
      metas: {
        score: 10,
        contains: ["Orchard"]
      }
    }
  },
  {
    name: "OroCommerce",
    url: "https://oroinc.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["oro\\.min\\.js\\?version=([\\d.]+)"]
      }
    }
  },
  {
    name: "Outbrain",
    url: "https://www.outbrain.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["widgets\\.outbrain\\.com/outbrain\\.js"]
      }
    }
  },
  {
    name: "PANSITE",
    url: "http://panvision.de/Produkte/Content_Management/index.asp",
    rules: {
      metas: {
        score: 10,
        contains: ["PANSITE"]
      }
    }
  },
  {
    name: "PHP",
    url: "http://php.net",
    rules: {
      cookies: {
        score: 10,
        contains: ["PHPSESSID"]
      },
      headers: {
        score: 10,
        contains: ["php/?([\\d.]+)?", "^php/?([\\d.]+)?"]
      }
    }
  },
  {
    name: "PHP-Fusion",
    url: "https://www.php-fusion.co.uk",
    rules: {
      headers: {
        score: 10,
        contains: ["PHP-Fusion (.+)$"]
      }
    }
  },
  {
    name: "PHP-Nuke",
    url: "http://phpnuke.org",
    rules: {
      metas: {
        score: 10,
        contains: ["PHP-Nuke"]
      }
    }
  },
  {
    name: "PHPDebugBar",
    url: "http://phpdebugbar.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["debugbar.*\\.js"]
      }
    }
  },
  {
    name: "Cecil",
    url: "https://cecil.app",
    rules: {
      metas: {
        score: 10,
        contains: ["Cecil|PHPoole$"]
      }
    }
  },
  {
    name: "Pagekit",
    url: "http://pagekit.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Pagekit"]
      }
    }
  },
  {
    name: "Pagevamp",
    url: "https://www.pagevamp.com",
    rules: {
      headers: {
        score: 10,
        contains: ["pagevamp"]
      }
    }
  },
  {
    name: "Pantheon",
    url: "https://pantheon.io/",
    rules: {
      headers: {
        score: 10,
        contains: ["Pantheon"]
      }
    }
  },
  {
    name: "Pars Elecom Portal",
    url: "http://parselecom.net",
    rules: {
      headers: {
        score: 10,
        contains: ["Pars Elecom Portal"]
      },
      metas: {
        score: 10,
        contains: ["Pars Elecom Portal"]
      }
    }
  },
  {
    name: "Paths.js",
    url: "https://github.com/andreaferretti/paths-js",
    rules: {
      scripts: {
        score: 10,
        contains: ["paths(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "PayPal",
    url: "https://paypal.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["paypalobjects\\.com/js"]
      }
    }
  },
  {
    name: "PencilBlue",
    url: "http://pencilblue.org",
    rules: {
      headers: {
        score: 10,
        contains: ["PencilBlue"]
      }
    }
  },
  {
    name: "Pendo",
    url: "https://pendo.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.pendo\\.io*\\.js"]
      }
    }
  },
  {
    name: "Percussion",
    url: "http://percussion.com",
    rules: {
      metas: {
        score: 10,
        contains: ["(?:Percussion|Rhythmyx)"]
      }
    }
  },
  {
    name: "Perl",
    url: "http://perl.org",
    rules: {
      headers: {
        score: 10,
        contains: ["\\bPerl\\b(?: ?/?v?([\\d.]+))?"]
      }
    }
  },
  {
    name: "Phabricator",
    url: "http://phacility.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/phabricator/[a-f0-9]{8}/rsrc/js/phui/[a-z-]+\\.js$"]
      },
      cookies: {
        score: 10,
        contains: ["phsid"]
      }
    }
  },
  {
    name: "Phenomic",
    url: "https://phenomic.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/phenomic\\.browser\\.[a-f0-9]+\\.js"]
      }
    }
  },
  {
    name: "Phusion Passenger",
    url: "https://phusionpassenger.com",
    rules: {
      headers: {
        score: 10,
        contains: [
          "Phusion Passenger ([\\d.]+)",
          "Phusion Passenger ?([\\d.]+)?"
        ]
      }
    }
  },
  {
    name: "Pimcore",
    url: "http://pimcore.org",
    rules: {
      headers: {
        score: 10,
        contains: ["pimcore$"]
      }
    }
  },
  {
    name: "Pingoteam",
    url: "https://www.pingoteam.ir/",
    rules: {
      metas: {
        score: 10,
        contains: ["Pingoteam"]
      }
    }
  },
  {
    name: "Pinterest",
    url: "http://pinterest.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["//assets\\.pinterest\\.com/js/pinit\\.js"]
      }
    }
  },
  {
    name: "Planet",
    url: "http://planetplanet.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Planet*"]
      }
    }
  },
  {
    name: "PlatformOS",
    url: "https://www.platform-os.com",
    rules: {
      headers: {
        score: 10,
        contains: ["platformOS$"]
      }
    }
  },
  {
    name: "Play",
    url: "https://www.playframework.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["PLAY_SESSION"]
      }
    }
  },
  {
    name: "Plentymarkets",
    url: "http://plentymarkets.eu",
    rules: {
      metas: {
        score: 10,
        contains: ["plentymarkets"]
      }
    }
  },
  {
    name: "Plesk",
    url: "https://www.plesk.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["common\\.js\\?plesk"]
      },
      headers: {
        score: 10,
        contains: ["Plesk(?:L|W)in", "Plesk"]
      }
    }
  },
  {
    name: "Pligg",
    url: "http://pligg.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Pligg"]
      }
    }
  },
  {
    name: "Plone",
    url: "http://plone.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Plone"]
      }
    }
  },
  {
    name: "Plotly",
    url: "https://plot.ly/javascript/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://cdn\\.plot\\.ly/plotly"]
      }
    }
  },
  {
    name: "Polyfill",
    url: "https://polyfill.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["polyfill\\.io/", "/polyfill\\.min\\.js"]
      }
    }
  },
  {
    name: "Polymer",
    url: "http://polymer-project.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["polymer\\.js"]
      }
    }
  },
  {
    name: "Prebid",
    url: "http://prebid.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/prebid\\.js", 'adnxs\\.com/[^"]*(?:prebid|/pb\\.js)']
      }
    }
  },
  {
    name: "Prefix-Free",
    url: "https://leaverou.github.io/prefixfree/",
    rules: {
      scripts: {
        score: 10,
        contains: ["prefixfree\\.js"]
      }
    }
  },
  {
    name: "PrestaShop",
    url: "http://www.prestashop.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["PrestaShop"]
      },
      headers: {
        score: 10,
        contains: ["Prestashop$"]
      },
      metas: {
        score: 10,
        contains: ["PrestaShop"]
      }
    }
  },
  {
    name: "Prism",
    url: "http://prismjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["prism\\.js"]
      }
    }
  },
  {
    name: "Project Wonderful",
    url: "http://projectwonderful.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "^https?://(?:www\\.)?projectwonderful\\.com/(?:pwa\\.js|gen\\.php)"
        ]
      }
    }
  },
  {
    name: "ProjectPoi",
    url: "https://ppoi.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:https):?//ppoi\\.org/lib/"]
      }
    }
  },
  {
    name: "Projesoft",
    url: "https://www.projesoft.com.tr",
    rules: {
      scripts: {
        score: 10,
        contains: ["projesoft\\.js"]
      }
    }
  },
  {
    name: "Prototype",
    url: "http://www.prototypejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:prototype|protoaculous)(?:-([\\d.]*[\\d]))?.*\\.js"]
      }
    }
  },
  {
    name: "Protovis",
    url: "http://mbostock.github.io/protovis",
    rules: {
      scripts: {
        score: 10,
        contains: ["protovis.*\\.js"]
      }
    }
  },
  {
    name: "Proximis Omnichannel",
    url: "https://www.proximis.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Proximis Omnichannel"]
      }
    }
  },
  {
    name: "Proximis Web to Store",
    url: "https://www.proximis.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["widget-commerce(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "PubMatic",
    url: "http://www.pubmatic.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://[^/]*\\.pubmatic\\.com"]
      }
    }
  },
  {
    name: "Pure CSS",
    url: "http://purecss.io",
    rules: {
      links: {
        score: 10,
        contains: ["<link[^>]+(?:([\\d.])+/)?pure(?:-min)?\\.css"]
      },
      classes: {
        score: 1,
        contains: ["pure-g", "pure-u-", "pure-u"]
      }
    }
  },
  {
    name: "PyroCMS",
    url: "http://pyrocms.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["pyrocms"]
      },
      headers: {
        score: 10,
        contains: ["PyroCMS"]
      }
    }
  },
  {
    name: "Python",
    url: "http://python.org",
    rules: {
      headers: {
        score: 10,
        contains: ["(?:^|\\s)Python(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Quantcast",
    url: "http://www.quantcast.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\.quantserve\\.com/quant\\.js"]
      }
    }
  },
  {
    name: "Question2Answer",
    url: "http://www.question2answer.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\./qa-content/qa-page\\.js\\?([0-9.]+)"]
      }
    }
  },
  {
    name: "Quick.CMS",
    url: "http://opensolution.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Quick\\.CMS(?: v([\\d.]+))?"]
      }
    }
  },
  {
    name: "Quick.Cart",
    url: "http://opensolution.org",
    rules: {
      metas: {
        score: 10,
        contains: ["Quick\\.Cart(?: v([\\d.]+))?"]
      }
    }
  },
  {
    name: "RBS Change",
    url: "http://www.rbschange.fr",
    rules: {
      metas: {
        score: 10,
        contains: ["RBS Change"]
      }
    }
  },
  {
    name: "RCMS",
    url: "http://www.rcms.fi",
    rules: {
      metas: {
        score: 10,
        contains: ["(?:RCMS|ReallyCMS)"]
      }
    }
  },
  {
    name: "RD Station",
    url: "http://rdstation.com.br",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "d335luupugsy2\\.cloudfront\\.net/js/loader-scripts/.*-loader\\.js"
        ]
      }
    }
  },
  {
    name: "RDoc",
    url: "https://github.com/RDoc/RDoc",
    rules: {
      links: {
        score: 10,
        contains: ['<link[^>]+href="[^"]*rdoc-style\\.css']
      }
    }
  },
  {
    name: "Rakuten DBCore",
    url: "http://ecservice.rakuten.com.br",
    rules: {
      metas: {
        score: 10,
        contains: ["Rakuten DBCore", "http://ecservice\\.rakuten\\.com\\.br"]
      }
    }
  },
  {
    name: "Ramda",
    url: "http://ramdajs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["ramda.*\\.js"]
      }
    }
  },
  {
    name: "Raphael",
    url: "https://dmitrybaranovskiy.github.io/raphael/",
    rules: {
      scripts: {
        score: 10,
        contains: ["raphael(?:-([\\d.]+))?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Raspbian",
    url: "https://www.raspbian.org/",
    rules: {
      headers: {
        score: 10,
        contains: ["Raspbian", "Raspbian"]
      }
    }
  },
  {
    name: "Raychat",
    url: "https://raychat.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["app\\.raychat\\.io/scripts/js"]
      }
    }
  },
  {
    name: "Rayo",
    url: "http://www.rayo.ir",
    rules: {
      metas: {
        score: 10,
        contains: ["Rayo"]
      }
    }
  },
  {
    name: "ReDoc",
    url: "https://github.com/Rebilly/ReDoc",
    rules: {
      scripts: {
        score: 10,
        contains: ["/redoc\\.(?:min\\.)?js"]
      }
    }
  },
  {
    name: "React",
    url: "https://reactjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "react(?:-with-addons)?[.-]([\\d.]*\\d)[^/]*\\.js",
          "/([\\d.]+)/react(?:\\.min)?\\.js",
          "react.*\\.js"
        ]
      },
      attrs: {
        score: 10,
        contains: ["data-react"]
      }
    }
  },
  {
    name: "Red Hat",
    url: "http://redhat.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Red Hat", "Red Hat"]
      }
    }
  },
  {
    name: "Redmine",
    url: "http://www.redmine.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["_redmine_session"]
      },
      metas: {
        score: 10,
        contains: ["Redmine"]
      }
    }
  },
  {
    name: "RequireJS",
    url: "http://requirejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["require.*\\.js"]
      }
    }
  },
  {
    name: "Resin",
    url: "http://caucho.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Resin*"]
      }
    }
  },
  {
    name: "Reveal.js",
    url: "http://lab.hakim.se/reveal-js",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:^|/)reveal(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Revel",
    url: "https://revel.github.io",
    rules: {
      cookies: {
        score: 10,
        contains: ["REVEL_FLASH", "REVEL_SESSION"]
      }
    }
  },
  {
    name: "Revslider",
    url: "https://revolution.themepunch.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/revslider/[/\\w-]+/js"]
      },
      links: {
        score: 10,
        contains: [
          "<link[^>]* href=[\\'\"][^']+revslider[/\\w-]+\\.css\\?ver=([0-9.]+)[\\'\"]"
        ]
      }
    }
  },
  {
    name: "Rickshaw",
    url: "http://code.shutterstock.com/rickshaw/",
    rules: {
      scripts: {
        score: 10,
        contains: ["rickshaw(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "RightJS",
    url: "http://rightjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["right\\.js"]
      }
    }
  },
  {
    name: "Riot",
    url: "https://riot.js.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["riot(?:\\+compiler)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "RiteCMS",
    url: "http://ritecms.com",
    rules: {
      metas: {
        score: 10,
        contains: ["RiteCMS*"]
      }
    }
  },
  {
    name: "Roadiz CMS",
    url: "https://www.roadiz.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Roadiz CMS"]
      },
      metas: {
        score: 10,
        contains: ["Roadiz ?(?:master|develop)? v?([0-9\\.]+)"]
      }
    }
  },
  {
    name: "RockRMS",
    url: "http://www.rockrms.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Rock*"]
      }
    }
  },
  {
    name: "Rubicon Project",
    url: "http://rubiconproject.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://[^/]*\\.rubiconproject\\.com"]
      }
    }
  },
  {
    name: "Ruby",
    url: "http://ruby-lang.org",
    rules: {
      headers: {
        score: 10,
        contains: ["(?:Mongrel|WEBrick|Ruby)"]
      }
    }
  },
  {
    name: "Ruby on Rails",
    url: "https://rubyonrails.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/assets/application-[a-z\\d]{32}/\\.js\\;confidence:50"]
      },
      cookies: {
        score: 10,
        contains: ["_session_id"]
      },
      headers: {
        score: 10,
        contains: ["mod_(?:rails|rack)", "mod_(?:rails|rack)"]
      },
      metas: {
        score: 10,
        contains: ["authenticity_token$\\;confidence:50"]
      }
    }
  },
  {
    name: "Ruxit",
    url: "http://ruxit.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["ruxitagentjs"]
      }
    }
  },
  {
    name: "RxJS",
    url: "http://reactivex.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["rx(?:\\.\\w+)?(?:\\.compat|\\.global)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "S.Builder",
    url: "http://www.sbuilder.ru",
    rules: {
      metas: {
        score: 10,
        contains: ["S\\.Builder"]
      }
    }
  },
  {
    name: "SAP",
    url: "http://sap.com",
    rules: {
      headers: {
        score: 10,
        contains: ["SAP NetWeaver Application Server"]
      }
    }
  },
  {
    name: "Scenari",
    url: "https://demo.scenari.site",
    rules: {
      metas: {
        score: 10,
        contains: [
          "^Roadiz ?(?:master|develop)? v?[0-9\\.]+ - Scenari v?([0-9\\.]+)"
        ]
      }
    }
  },
  {
    name: "Sensors Data",
    url: "https://www.sensorsdata.cn",
    rules: {
      scripts: {
        score: 10,
        contains: ["sensorsdata"]
      },
      cookies: {
        score: 10,
        contains: ["sensorsdata2015session", "sensorsdata2015jssdkcross"]
      }
    }
  },
  {
    name: "SIMsite",
    url: "http://simgroep.nl/internet/portfolio-contentbeheer_41623/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/sim(?:site|core)/js"]
      }
    }
  },
  {
    name: "SPIP",
    url: "http://www.spip.net",
    rules: {
      headers: {
        score: 10,
        contains: ["SPIP ([\\d.]+) @"]
      },
      metas: {
        score: 10,
        contains: ["(?:^|\\s)SPIP(?:\\s([\\d.]+(?:\\s\\[\\d+\\])?))?"]
      }
    }
  },
  {
    name: "SUSE",
    url: "http://suse.com",
    rules: {
      headers: {
        score: 10,
        contains: ["SUSE(?:/?\\s?-?([\\d.]+))?", "SUSE(?:/?\\s?-?([\\d.]+))?"]
      }
    }
  },
  {
    name: "SWFObject",
    url: "https://github.com/swfobject/swfobject",
    rules: {
      scripts: {
        score: 10,
        contains: ["swfobject.*\\.js"]
      }
    }
  },
  {
    name: "Saia PCD",
    url: "http://saia-pcd.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Saia PCD(?:([/a-z\\d.]+))?"]
      }
    }
  },
  {
    name: "Sails.js",
    url: "http://sailsjs.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["sails.sid"]
      },
      headers: {
        score: 10,
        contains: ["Sails(?:$|[^a-z0-9])"]
      }
    }
  },
  {
    name: "Salesforce",
    url: "https://www.salesforce.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["com.salesforce"]
      }
    }
  },
  {
    name: "Salesforce Commerce Cloud",
    url: "http://demandware.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/demandware\\.static/"]
      },
      headers: {
        score: 10,
        contains: ["Demandware eCommerce Server"]
      }
    }
  },
  {
    name: "Sarka-SPIP",
    url: "http://sarka-spip.net",
    rules: {
      metas: {
        score: 10,
        contains: ["Sarka-SPIP(?:\\s([\\d.]+))?"]
      }
    }
  },
  {
    name: "Sazito",
    url: "http://sazito.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Sazito"]
      }
    }
  },
  {
    name: "Scientific Linux",
    url: "http://scientificlinux.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Scientific Linux", "Scientific Linux"]
      }
    }
  },
  {
    name: "SeamlessCMS",
    url: "http://www.seamlesscms.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Seamless\\.?CMS"]
      }
    }
  },
  {
    name: "Segment",
    url: "https://segment.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.segment\\.com/analytics\\.js"]
      }
    }
  },
  {
    name: "Select2",
    url: "https://select2.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["select2(?:\\.min|\\.full)?\\.js"]
      }
    }
  },
  {
    name: "Semantic-ui",
    url: "https://semantic-ui.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/semantic(?:-([\\d.]+))?(?:\\.min)?\\.js"]
      },
      links: {
        score: 10,
        contains: ["<link[^>]+semantic(?:\\.min)\\.css"]
      }
    }
  },
  {
    name: "Sencha Touch",
    url: "http://sencha.com/products/touch",
    rules: {
      scripts: {
        score: 10,
        contains: ["sencha-touch.*\\.js"]
      }
    }
  },
  {
    name: "Serendipity",
    url: "http://s9y.org",
    rules: {
      metas: {
        score: 10,
        contains: [
          "Serendipity v\\.([\\d.]+)",
          "Serendipity(?: v\\.([\\d.]+))?"
        ]
      }
    }
  },
  {
    name: "Shadow",
    url: "http://shadow-technologies.co.uk",
    rules: {
      headers: {
        score: 10,
        contains: ["ShadowFramework"]
      }
    }
  },
  {
    name: "Shapecss",
    url: "https://shapecss.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "shapecss[-.]([\\d.]*\\d)[^/]*\\.js",
          "/([\\d.]+)/shapecss(?:\\.min)?\\.js",
          "shapecss.*\\.js"
        ]
      }
    }
  },
  {
    name: "ShareThis",
    url: "http://sharethis.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["w\\.sharethis\\.com/"]
      }
    }
  },
  {
    name: "ShinyStat",
    url: "http://shinystat.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "^https?://codice(?:business|ssl|pro|isp)?\\.shinystat\\.com/cgi-bin/getcod\\.cgi"
        ]
      }
    }
  },
  {
    name: "Shopatron",
    url: "http://ecommerce.shopatron.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["mediacdn\\.shopatron\\.com"]
      },
      metas: {
        score: 10,
        contains: ["Shopatron"]
      }
    }
  },
  {
    name: "Shopfa",
    url: "https://shopfa.com",
    rules: {
      headers: {
        score: 10,
        contains: ["ShopFA*"]
      },
      metas: {
        score: 10,
        contains: ["ShopFA*"]
      }
    }
  },
  {
    name: "Shopline",
    url: "https://shoplineapp.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["https\\:\\/\\/img\\.shoplineapp\\.com"]
      }
    }
  },
  {
    name: "Shoptet",
    url: "http://www.shoptet.cz",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://cdn\\.myshoptet\\.com/"]
      },
      metas: {
        score: 10,
        contains: ["Shoptet"]
      }
    }
  },
  {
    name: "Shopware",
    url: "http://shopware.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "(?:(shopware)|/web/cache/[0-9]{10}_.+)\\.js?4:5",
          "/jquery\\.shopware\\.min\\.js",
          "/engine/Shopware/"
        ]
      },
      metas: {
        score: 10,
        contains: ["Shopware"]
      }
    }
  },
  {
    name: "Signal",
    url: "https://www.signal.co/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "//s\\.btstatic\\.com/tag\\.js",
          "//s\\.thebrighttag\\.com/iframe\\?"
        ]
      }
    }
  },
  {
    name: "Silva",
    url: "http://silvacms.org",
    rules: {
      headers: {
        score: 10,
        contains: ["SilvaCMS"]
      }
    }
  },
  {
    name: "SilverStripe",
    url: "https://www.silverstripe.org",
    rules: {
      metas: {
        score: 10,
        contains: ["SilverStripe"]
      }
    }
  },
  {
    name: "SimpleHTTP",
    url: "http://example.com",
    rules: {
      headers: {
        score: 10,
        contains: ["SimpleHTTP(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Simplébo",
    url: "https://www.simplebo.fr",
    rules: {
      headers: {
        score: 10,
        contains: ["simplebo"]
      }
    }
  },
  {
    name: "Site Meter",
    url: "http://www.sitemeter.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["sitemeter\\.com/js/counter\\.js\\?site="]
      }
    }
  },
  {
    name: "SiteCatalyst",
    url: "http://www.adobe.com/solutions/digital-marketing.html",
    rules: {
      scripts: {
        score: 10,
        contains: ["/s[_-]code.*\\.js"]
      }
    }
  },
  {
    name: "SiteEdit",
    url: "http://www.siteedit.ru",
    rules: {
      metas: {
        score: 10,
        contains: ["SiteEdit"]
      }
    }
  },
  {
    name: "Sitecore",
    url: "http://sitecore.net",
    rules: {
      cookies: {
        score: 10,
        contains: ["SC_ANALYTICS_GLOBAL_COOKIE"]
      }
    }
  },
  {
    name: "Sitefinity",
    url: "http://www.sitefinity.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Sitefinity*"]
      }
    }
  },
  {
    name: "Sivuviidakko",
    url: "http://sivuviidakko.fi",
    rules: {
      metas: {
        score: 10,
        contains: ["Sivuviidakko"]
      }
    }
  },
  {
    name: "Sizmek",
    url: "http://sizmek.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["serving-sys\\.com/"]
      }
    }
  },
  {
    name: "Slick",
    url: "https://kenwheeler.github.io/slick",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:/([\\d.]+))?/slick(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Slimbox",
    url: "http://www.digitalia.be/software/slimbox",
    rules: {
      scripts: {
        score: 10,
        contains: ["slimbox\\.js"]
      }
    }
  },
  {
    name: "Slimbox 2",
    url: "http://www.digitalia.be/software/slimbox2",
    rules: {
      scripts: {
        score: 10,
        contains: ["slimbox2\\.js"]
      }
    }
  },
  {
    name: "SmartSite",
    url: "http://www.seneca.nl/pub/Smartsite/Smartsite-Smartsite-iXperion",
    rules: {
      metas: {
        score: 10,
        contains: ["Redacteur SmartInstant"]
      }
    }
  },
  {
    name: "Smartstore",
    url: "http://smartstore.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["smjslib\\.js"]
      }
    }
  },
  {
    name: "Snap",
    url: "http://snapframework.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Snap/([.\\d]+)"]
      }
    }
  },
  {
    name: "Snap.svg",
    url: "http://snapsvg.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["snap\\.svg(?:-min)?\\.js"]
      }
    }
  },
  {
    name: "Snoobi",
    url: "http://www.snoobi.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["snoobi\\.com/snoop\\.php"]
      }
    }
  },
  {
    name: "Socket.io",
    url: "https://socket.io",
    rules: {
      scripts: {
        score: 10,
        contains: ["socket\\.io.*\\.js"]
      }
    }
  },
  {
    name: "SoftTr",
    url: "http://www.softtr.com",
    rules: {
      metas: {
        score: 10,
        contains: ["SoftTr E-Ticaret Sitesi Yazılımı"]
      }
    }
  },
  {
    name: "Solusquare OmniCommerce Cloud",
    url: "https://www.solusquare.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["_solusquare"]
      },
      metas: {
        score: 10,
        contains: ["Solusquare$"]
      }
    }
  },
  {
    name: "Solve Media",
    url: "http://solvemedia.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://api\\.solvemedia\\.com/"]
      }
    }
  },
  {
    name: "SonarQubes",
    url: "https://www.sonarqube.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/js/bundles/sonar\\.js?v=([\\d.]+)$"]
      },
      metas: {
        score: 10,
        contains: ["SonarQubes$"]
      },
      links: {
        score: 10,
        contains: ['<link href="/css/sonar\\.css\\?v=([\\d.]+)']
      }
    }
  },
  {
    name: "SpiderControl iniNet",
    url: "http://spidercontrol.net/ininet",
    rules: {
      metas: {
        score: 10,
        contains: ["iniNet SpiderControl"]
      }
    }
  },
  {
    name: "SpinCMS",
    url: "http://www.spin.cw",
    rules: {
      cookies: {
        score: 10,
        contains: ["spincms_session"]
      }
    }
  },
  {
    name: "Splunk",
    url: "http://splunk.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Splunk Inc\\;confidence:50"]
      }
    }
  },
  {
    name: "Sqreen",
    url: "https://sqreen.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Sqreen$"]
      }
    }
  },
  {
    name: "Squarespace",
    url: "http://www.squarespace.com",
    rules: {
      headers: {
        score: 10,
        contains: ["squarespace"]
      }
    }
  },
  {
    name: "Squiz Matrix",
    url: "http://squiz.net",
    rules: {
      headers: {
        score: 10,
        contains: ["Squiz Matrix"]
      },
      metas: {
        score: 10,
        contains: ["Squiz Matrix"]
      }
    }
  },
  {
    name: "Stackla",
    url: "http://stackla.com/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "assetscdn\\.stackla\\.com\\/media\\/js\\/widget\\/(?: [a-zA-Z0-9.]+)?\\.js"
        ]
      }
    }
  },
  {
    name: "Starlet",
    url: "http://metacpan.org/pod/Starlet",
    rules: {
      headers: {
        score: 10,
        contains: ["Plack::Handler::Starlet"]
      }
    }
  },
  {
    name: "Statcounter",
    url: "http://www.statcounter.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["statcounter\\.com/counter/counter"]
      }
    }
  },
  {
    name: "Storeden",
    url: "https://www.storeden.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Storeden"]
      }
    }
  },
  {
    name: "Storyblok",
    url: "https://www.storyblok.com",
    rules: {
      metas: {
        score: 10,
        contains: ["storyblok"]
      }
    }
  },
  {
    name: "Strapdown.js",
    url: "http://strapdownjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["strapdown\\.js"]
      }
    }
  },
  {
    name: "Strapi",
    url: "https://strapi.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Strapi"]
      }
    }
  },
  {
    name: "Stripe",
    url: "http://stripe.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["js\\.stripe\\.com"]
      }
    }
  },
  {
    name: "SublimeVideo",
    url: "http://sublimevideo.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.sublimevideo\\.net/js/[a-z\\d]+\\.js"]
      }
    }
  },
  {
    name: "Subrion",
    url: "http://subrion.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Subrion CMS"]
      },
      metas: {
        score: 10,
        contains: ["Subrion"]
      }
    }
  },
  {
    name: "Sulu",
    url: "http://sulu.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Sulu/?(.+)?$"]
      }
    }
  },
  {
    name: "SumoMe",
    url: "http://sumome.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["load\\.sumome\\.com"]
      }
    }
  },
  {
    name: "SunOS",
    url: "http://oracle.com/solaris",
    rules: {
      headers: {
        score: 10,
        contains: ["SunOS( [\\d\\.]+)?", "SunOS( [\\d\\.]+)?"]
      }
    }
  },
  {
    name: "Supersized",
    url: "http://buildinternet.com/project/supersized",
    rules: {
      scripts: {
        score: 10,
        contains: ["supersized(?:\\.([\\d.]*[\\d]))?.*\\.js"]
      }
    }
  },
  {
    name: "Svbtle",
    url: "https://www.svbtle.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Svbtle\\.com$"]
      }
    }
  },
  {
    name: "SweetAlert",
    url: "https://t4t5.github.io/sweetalert/",
    rules: {
      scripts: {
        score: 10,
        contains: ["sweet-alert(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "SweetAlert2",
    url: "https://sweetalert2.github.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["sweetalert2(?:\\.all)?(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Swiftlet",
    url: "http://swiftlet.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Swiftlet", "Swiftlet"]
      },
      metas: {
        score: 10,
        contains: ["Swiftlet"]
      }
    }
  },
  {
    name: "Swiftype",
    url: "http://swiftype.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["swiftype\\.com/embed\\.js$"]
      }
    }
  },
  {
    name: "Sympa",
    url: "https://www.sympa.org/",
    rules: {
      metas: {
        score: 10,
        contains: ["Sympa$"]
      }
    }
  },
  {
    name: "Synology DiskStation",
    url: "http://synology.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "webapi/entry\\.cgi\\?api=SYNO\\.(?:Core|Filestation)\\.Desktop\\."
        ]
      },
      metas: {
        score: 10,
        contains: [
          "Synology DiskStation",
          "^DiskStation provides a full-featured network attached storage"
        ]
      }
    }
  },
  {
    name: "TWiki",
    url: "http://twiki.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:TWikiJavascripts|twikilib(?:\\.min)?\\.js)"]
      },
      cookies: {
        score: 10,
        contains: ["TWIKISID"]
      }
    }
  },
  {
    name: "TYPO3 CMS",
    url: "https://typo3.org/",
    rules: {
      scripts: {
        score: 10,
        contains: ["typo3(?:conf|temp)/"]
      },
      metas: {
        score: 10,
        contains: ["TYPO3\\s+(?:CMS\\s+)?([\\d.]+)?(?:\\s+CMS)?"]
      },
      links: {
        score: 10,
        contains: ['<link[^>]+ href="typo3(?:conf|temp)/']
      }
    }
  },
  {
    name: "Tawk.to",
    url: "http://tawk.to",
    rules: {
      scripts: {
        score: 10,
        contains: ["//embed\\.tawk\\.to"]
      }
    }
  },
  {
    name: "Tealium",
    url: "http://tealium.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:https?:)?//tags\\.tiqcdn\\.com/", "/tealium/utag\\.js$"]
      }
    }
  },
  {
    name: "TeamCity",
    url: "https://www.jetbrains.com/teamcity/",
    rules: {
      metas: {
        score: 10,
        contains: ["TeamCity"]
      }
    }
  },
  {
    name: "TN Express Web",
    url: "https://www.tessituranetwork.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["TNEW"]
      }
    }
  },
  {
    name: "Tengine",
    url: "http://tengine.taobao.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Tengine"]
      }
    }
  },
  {
    name: "Textalk",
    url: "https://www.textalk.se",
    rules: {
      metas: {
        score: 10,
        contains: ["Textalk Webshop"]
      }
    }
  },
  {
    name: "Textpattern CMS",
    url: "http://textpattern.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Textpattern"]
      }
    }
  },
  {
    name: "ThinkPHP",
    url: "http://www.thinkphp.cn",
    rules: {
      headers: {
        score: 10,
        contains: ["ThinkPHP"]
      }
    }
  },
  {
    name: "Ticimax",
    url: "https://www.ticimax.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.ticimax\\.com/"]
      }
    }
  },
  {
    name: "TiddlyWiki",
    url: "http://tiddlywiki.com",
    rules: {
      metas: {
        score: 10,
        contains: [
          "^TiddlyWiki$",
          "^TiddlyWiki created by Jeremy Ruston",
          "^TiddlyWiki$"
        ]
      }
    }
  },
  {
    name: "Tiki Wiki CMS Groupware",
    url: "http://tiki.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:/|_)tiki"]
      },
      metas: {
        score: 10,
        contains: ["Tiki"]
      }
    }
  },
  {
    name: "Tilda",
    url: "https://tilda.cc",
    rules: {
      scripts: {
        score: 10,
        contains: ["tilda(?:cdn|\\.ws|-blocks)"]
      }
    }
  },
  {
    name: "Timeplot",
    url: "http://www.simile-widgets.org/timeplot/",
    rules: {
      scripts: {
        score: 10,
        contains: ["timeplot.*\\.js"]
      }
    }
  },
  {
    name: "TinyMCE",
    url: "http://tinymce.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/tiny_?mce(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "TomatoCart",
    url: "http://tomatocart.com",
    rules: {
      metas: {
        score: 10,
        contains: ["TomatoCart"]
      }
    }
  },
  {
    name: "TornadoServer",
    url: "http://tornadoweb.org",
    rules: {
      headers: {
        score: 10,
        contains: ["TornadoServer(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "TotalCode",
    url: "http://www.totalcode.com",
    rules: {
      headers: {
        score: 10,
        contains: ["TotalCode$"]
      }
    }
  },
  {
    name: "TrackJs",
    url: "http://trackjs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["tracker\\.js"]
      }
    }
  },
  {
    name: "Translucide",
    url: "http://www.translucide.net",
    rules: {
      scripts: {
        score: 10,
        contains: ["lucide\\.init(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Tray",
    url: "https://www.tray.com.br",
    rules: {
      scripts: {
        score: 10,
        contains: ["tcdn\\.com\\.br"]
      }
    }
  },
  {
    name: "TweenMax",
    url: "http://greensock.com/tweenmax",
    rules: {
      scripts: {
        score: 10,
        contains: ["TweenMax(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Twilight CMS",
    url: "http://www.twilightcms.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Twilight CMS"]
      }
    }
  },
  {
    name: "TwistPHP",
    url: "http://twistphp.com",
    rules: {
      headers: {
        score: 10,
        contains: ["TwistPHP"]
      }
    }
  },
  {
    name: "TwistedWeb",
    url: "http://twistedmatrix.com/trac/wiki/TwistedWeb",
    rules: {
      headers: {
        score: 10,
        contains: ["TwistedWeb(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Twitter",
    url: "http://twitter.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["//platform\\.twitter\\.com/widgets\\.js"]
      }
    }
  },
  {
    name: "Twitter Emoji (Twemoji)",
    url: "https://twitter.github.io/twemoji/",
    rules: {
      scripts: {
        score: 10,
        contains: ["twemoji(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "Twitter typeahead.js",
    url: "https://twitter.github.io/typeahead.js",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "(?:typeahead|bloodhound)\\.(?:jquery|bundle)?(?:\\.min)?\\.js"
        ]
      }
    }
  },
  {
    name: "TypePad",
    url: "http://www.typepad.com",
    rules: {
      metas: {
        score: 10,
        contains: ["typepad"]
      }
    }
  },
  {
    name: "Typecho",
    url: "http://typecho.org/",
    rules: {
      metas: {
        score: 10,
        contains: ["Typecho( [\\d.]+)?"]
      }
    }
  },
  {
    name: "Typekit",
    url: "http://typekit.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["use\\.typekit\\.com"]
      }
    }
  },
  {
    name: "UIKit",
    url: "https://getuikit.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["uikit.*\\.js"]
      }
    }
  },
  {
    name: "UMI.CMS",
    url: "https://www.umi-cms.ru",
    rules: {
      headers: {
        score: 10,
        contains: ["UMI\\.CMS"]
      }
    }
  },
  {
    name: "UNIX",
    url: "http://unix.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Unix"]
      }
    }
  },
  {
    name: "Ubercart",
    url: "http://www.ubercart.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["uc_cart/uc_cart_block\\.js"]
      }
    }
  },
  {
    name: "Ubuntu",
    url: "http://www.ubuntu.com/server",
    rules: {
      headers: {
        score: 10,
        contains: ["Ubuntu", "Ubuntu"]
      }
    }
  },
  {
    name: "UltraCart",
    url: "http://ultracart.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cgi-bin\\/UCJavaScript\\?"]
      }
    }
  },
  {
    name: "Umbraco",
    url: "http://umbraco.com",
    rules: {
      headers: {
        score: 10,
        contains: ["(x-umbraco-version*)"]
      },
      metas: {
        score: 10,
        contains: ["umbraco"]
      }
    }
  },
  {
    name: "Unbounce",
    url: "http://unbounce.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["ubembed\\.com"]
      }
    }
  },
  {
    name: "Underscore.js",
    url: "http://underscorejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["underscore.*\\.js(?:\\?ver=([\\d.]+))?"]
      }
    }
  },
  {
    name: "UserGuiding",
    url: "https://userguiding.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["static\\.userguiding*\\.js"]
      }
    }
  },
  {
    name: "UserLike",
    url: "http://userlike.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["userlike\\.min\\.js", "userlikelib\\.min\\.js"]
      }
    }
  },
  {
    name: "Ushahidi",
    url: "http://www.ushahidi.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/js/ushahidi\\.js$"]
      },
      cookies: {
        score: 10,
        contains: ["ushahidi"]
      }
    }
  },
  {
    name: "VIVVO",
    url: "http://vivvo.net",
    rules: {
      cookies: {
        score: 10,
        contains: ["VivvoSessionId"]
      }
    }
  },
  {
    name: "VP-ASP",
    url: "http://www.vpasp.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["vs350\\.js"]
      }
    }
  },
  {
    name: "VTEX",
    url: "https://vtex.com/",
    rules: {
      cookies: {
        score: 10,
        contains: ["VtexWorkspace", "VtexFingerPrint", "vtex_session"]
      },
      headers: {
        score: 10,
        contains: ["VTEX IO$", "vtex"]
      }
    }
  },
  {
    name: "VTEX Integrated Store",
    url: "http://lojaintegrada.com.br",
    rules: {
      headers: {
        score: 10,
        contains: ["vtex-integrated-store"]
      }
    }
  },
  {
    name: "Vaadin",
    url: "https://vaadin.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["vaadinBootstrap\\.js(?:\\?v=([\\d.]+))?"]
      }
    }
  },
  {
    name: "Vanilla",
    url: "http://vanillaforums.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Vanilla"]
      }
    }
  },
  {
    name: "Varnish",
    url: "http://www.varnish-cache.org",
    rules: {
      headers: {
        score: 10,
        contains: ["varnish(?: \\(Varnish/([\\d.]+)\\))?"]
      }
    }
  },
  {
    name: "Veoxa",
    url: "http://veoxa.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["tracking\\.veoxa\\.com"]
      }
    }
  },
  {
    name: "VideoJS",
    url: "http://videojs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["zencdn\\.net/c/video\\.js"]
      }
    }
  },
  {
    name: "VigLink",
    url: "http://viglink.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:^[^/]*//[^/]*viglink\\.com/api/|vglnk\\.js)"]
      }
    }
  },
  {
    name: "Vigbo",
    url: "https://vigbo.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:\\.vigbo\\.com|\\.gophotoweb\\.com)"]
      },
      cookies: {
        score: 10,
        contains: ["_gphw_mode"]
      }
    }
  },
  {
    name: "Virtuoso",
    url: "https://virtuoso.openlinksw.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["Virtuoso/?([0-9.]+)?"]
      },
      metas: {
        score: 10,
        contains: [
          "^Copyright &copy; \\d{4} OpenLink Software",
          "^OpenLink Virtuoso Sparql"
        ]
      }
    }
  },
  {
    name: "Visual WebGUI",
    url: "http://www.gizmox.com/products/visual-web-gui/",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\.js\\.wgx$"]
      },
      metas: {
        score: 10,
        contains: ["Visual WebGUI"]
      }
    }
  },
  {
    name: "Visual Website Optimizer",
    url: "https://vwo.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["dev\\.visualwebsiteoptimizer\\.com"]
      },
      comments: {
        score: 10,
        contains: [
          "<!-- (?:Start|End) Visual Website Optimizer A?Synchronous Code -->"
        ]
      }
    }
  },
  {
    name: "VisualPath",
    url: "http://www.trackset.com/web-analytics-software/visualpath",
    rules: {
      scripts: {
        score: 10,
        contains: ["visualpath[^/]*\\.trackset\\.it/[^/]+/track/include\\.js"]
      }
    }
  },
  {
    name: "Volusion (V1)",
    url: "https://www.volusion.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/volusion\\.js(?:\\?([\\d.]*))?"]
      }
    }
  },
  {
    name: "Vue.js",
    url: "http://vuejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "vue[.-]([\\d.]*\\d)[^/]*\\.js",
          "(?:/([\\d.]+))?/vue(?:\\.min)?\\.js"
        ]
      },
      attrs: {
        score: 1,
        contains: ["v-"]
      }
    }
  },
  {
    name: "Nuxt.js",
    url: "https://nuxtjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/_nuxt/"]
      }
    }
  },
  {
    name: "W3 Total Cache",
    url: "http://www.w3-edge.com/wordpress-plugins/w3-total-cache",
    rules: {
      headers: {
        score: 10,
        contains: ["W3 Total Cache(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "W3Counter",
    url: "http://www.w3counter.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["w3counter\\.com/tracker\\.js"]
      }
    }
  },
  {
    name: "WHMCS",
    url: "http://www.whmcs.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["WHMCS"]
      }
    }
  },
  {
    name: "WP Rocket",
    url: "http://wp-rocket.me",
    rules: {
      headers: {
        score: 10,
        contains: ["WP Rocket(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Warp",
    url: "http://www.stackage.org/package/warp",
    rules: {
      headers: {
        score: 10,
        contains: ["Warp/(\\d+(?:\\.\\d+)+)?$"]
      }
    }
  },
  {
    name: "Web2py",
    url: "http://web2py.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["web2py\\.js"]
      },
      headers: {
        score: 10,
        contains: ["web2py"]
      },
      metas: {
        score: 10,
        contains: ["Web2py"]
      }
    }
  },
  {
    name: "WebGUI",
    url: "http://www.webgui.org",
    rules: {
      cookies: {
        score: 10,
        contains: ["wgSession"]
      },
      metas: {
        score: 10,
        contains: ["WebGUI*"]
      }
    }
  },
  {
    name: "WebPublisher",
    url: "http://scannet.dk",
    rules: {
      metas: {
        score: 10,
        contains: ["WEB\\|Publisher"]
      }
    }
  },
  {
    name: "WebSite X5",
    url: "http://websitex5.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Incomedia WebSite X5 (\\w+ [\\d.]+)"]
      }
    }
  },
  {
    name: "Webdev",
    url: "https://www.windev.com/webdev/index.html",
    rules: {
      metas: {
        score: 10,
        contains: ["WEBDEV$"]
      }
    }
  },
  {
    name: "Webix",
    url: "http://webix.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\bwebix\\.js"]
      }
    }
  },
  {
    name: "Webs",
    url: "http://webs.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Webs\\.com/?([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "Websocket",
    url: "https://en.wikipedia.org/wiki/WebSocket",
    rules: {
      links: {
        score: 10,
        contains: ["<link[^>]+rel=[\"']web-socket[\"']"]
      }
    }
  },
  {
    name: "WebsPlanet",
    url: "http://websplanet.com",
    rules: {
      metas: {
        score: 10,
        contains: ["WebsPlanet"]
      }
    }
  },
  {
    name: "Website Creator",
    url: "https://www.hosttech.ch/websitecreator",
    rules: {
      metas: {
        score: 10,
        contains: ["Website Creator by hosttech"]
      }
    }
  },
  {
    name: "WebsiteBaker",
    url: "http://websitebaker2.org/en/home.php",
    rules: {
      metas: {
        score: 10,
        contains: ["WebsiteBaker"]
      }
    }
  },
  {
    name: "Weebly",
    url: "https://www.weebly.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\d+\\.editmysite\\.com"]
      }
    }
  },
  {
    name: "Weglot",
    url: "https://www.weglot.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.weglot\\.com", "wp-content/plugins/weglot"]
      }
    }
  },
  {
    name: "Webzi",
    url: "https://webzi.ir",
    rules: {
      scripts: {
        score: 10,
        contains: ["cdn\\.6th\\.ir"]
      },
      metas: {
        score: 10,
        contains: ["Webzi"]
      }
    }
  },
  {
    name: "Wikinggruppen",
    url: "https://wikinggruppen.se/",
    rules: {
      comments: {
        score: 10,
        contains: ["<!-- WIKINGGRUPPEN"]
      }
    }
  },
  {
    name: "WikkaWiki",
    url: "http://wikkawiki.org",
    rules: {
      metas: {
        score: 10,
        contains: ["WikkaWiki"]
      }
    }
  },
  {
    name: "Windows CE",
    url: "http://microsoft.com",
    rules: {
      headers: {
        score: 10,
        contains: ["\\bWinCE\\b"]
      }
    }
  },
  {
    name: "Windows Server",
    url: "http://microsoft.com/windowsserver",
    rules: {
      headers: {
        score: 10,
        contains: ["Win32|Win64"]
      }
    }
  },
  {
    name: "Wink",
    url: "http://winktoolkit.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:_base/js/base|wink).*\\.js"]
      }
    }
  },
  {
    name: "Winstone Servlet Container",
    url: "http://winstone.sourceforge.net",
    rules: {
      headers: {
        score: 10,
        contains: [
          "Winstone Servlet (?:Container|Engine) v?([\\d.]+)?",
          "Winstone(?:.([\\d.]+))?"
        ]
      }
    }
  },
  {
    name: "Wix",
    url: "https://www.wix.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["static\\.parastorage\\.com"]
      },
      cookies: {
        score: 10,
        contains: ["Domain"]
      },
      metas: {
        score: 10,
        contains: ["Wix\\.com Website Builder"]
      }
    }
  },
  {
    name: "Woltlab Community Framework",
    url: "http://www.woltlab.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["WCF\\..*\\.js"]
      }
    }
  },
  {
    name: "WooCommerce",
    url: "http://www.woothemes.com/woocommerce",
    rules: {
      scripts: {
        score: 10,
        contains: ["/woocommerce(?:\\.min)?\\.js(?:\\?ver=([0-9.]+))?"]
      },
      metas: {
        score: 10,
        contains: ["WooCommerce ([\\d.]+)"]
      },
      comments: {
        score: 10,
        contains: ["<!-- WooCommerce"]
      }
    }
  },
  {
    name: "Woopra",
    url: "http://www.woopra.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["static\\.woopra\\.com"]
      }
    }
  },
  {
    name: "Woosa",
    url: "https://woosa.nl",
    rules: {
      metas: {
        score: 10,
        contains: ["Woosa$"]
      }
    }
  },
  {
    name: "WordPress",
    url: "https://wordpress.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/wp-(?:content|includes)/"]
      },
      headers: {
        score: 10,
        contains: ["rel=https://api\\.w\\.org/"]
      },
      metas: {
        score: 10,
        contains: ["WordPress ?([\\d.]+)?"]
      },
      links: {
        score: 10,
        contains: [
          "<link rel=[\"']stylesheet[\"'] [^>]+/wp-(?:content|includes)/",
          "<link[^>]+s\\d+\\.wp\\.com"
        ]
      }
    }
  },
  {
    name: "X-Cart",
    url: "http://x-cart.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/skin/common_files/modules/Product_Options/func\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["xid"]
      },
      metas: {
        score: 10,
        contains: ["X-Cart(?: (\\d+))?"]
      }
    }
  },
  {
    name: "XAMPP",
    url: "http://www.apachefriends.org/en/xampp.html",
    rules: {
      metas: {
        score: 10,
        contains: ["Kai Oswald Seidler\\;confidence:10"]
      }
    }
  },
  {
    name: "XOOPS",
    url: "http://xoops.org",
    rules: {
      metas: {
        score: 10,
        contains: ["XOOPS"]
      }
    }
  },
  {
    name: "XRegExp",
    url: "http://xregexp.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "xregexp[.-]([\\d.]*\\d)[^/]*\\.js",
          "/([\\d.]+)/xregexp(?:\\.min)?\\.js",
          "xregexp.*\\.js"
        ]
      }
    }
  },
  {
    name: "XWiki",
    url: "http://www.xwiki.org",
    rules: {
      metas: {
        score: 10,
        contains: ["xwiki"]
      }
    }
  },
  {
    name: "Xajax",
    url: "http://xajax-project.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["xajax_core.*\\.js"]
      }
    }
  },
  {
    name: "Xanario",
    url: "http://xanario.de",
    rules: {
      metas: {
        score: 10,
        contains: ["xanario shopsoftware"]
      }
    }
  },
  {
    name: "XenForo",
    url: "http://xenforo.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["xf_csrf", "xf_session"]
      }
    }
  },
  {
    name: "Xeora",
    url: "http://www.xeora.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/_bi_sps_v.+\\.js"]
      },
      headers: {
        score: 10,
        contains: ["XeoraEngine", "XeoraCube"]
      }
    }
  },
  {
    name: "Xitami",
    url: "http://xitami.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Xitami(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "Xonic",
    url: "http://www.xonic-solutions.de",
    rules: {
      scripts: {
        score: 10,
        contains: ["core/jslib/jquery\\.xonic\\.js\\.php"]
      },
      metas: {
        score: 10,
        contains: ["xonic-solutions"]
      }
    }
  },
  {
    name: "XpressEngine",
    url: "http://www.xpressengine.com/",
    rules: {
      metas: {
        score: 10,
        contains: ["XpressEngine"]
      }
    }
  },
  {
    name: "YUI",
    url: "http://yuilibrary.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["(?:/yui/|yui\\.yahooapis\\.com)"]
      }
    }
  },
  {
    name: "Yahoo Advertising",
    url: "http://advertising.yahoo.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["adinterax\\.com"]
      }
    }
  },
  {
    name: "Yahoo! Ecommerce",
    url: "http://smallbusiness.yahoo.com/ecommerce",
    rules: {
      headers: {
        score: 10,
        contains: ["/ystore/"]
      }
    }
  },
  {
    name: "Yahoo! Tag Manager",
    url: "https://tagmanager.yahoo.co.jp/",
    rules: {
      scripts: {
        score: 10,
        contains: ["b\\.yjtag\\.jp/iframe"]
      }
    }
  },
  {
    name: "Yahoo! Web Analytics",
    url: "http://web.analytics.yahoo.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["d\\.yimg\\.com/mi/ywa\\.js"]
      }
    }
  },
  {
    name: "Yandex.Direct",
    url: "http://partner.yandex.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://an\\.yandex\\.ru/"]
      }
    }
  },
  {
    name: "Yandex.Metrika",
    url: "http://metrika.yandex.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "mc\\.yandex\\.ru\\/metrika\\/watch\\.js",
          "cdn\\.jsdelivr\\.net\\/npm\\/yandex-metrica-watch\\/watch\\.js"
        ]
      }
    }
  },
  {
    name: "Yaws",
    url: "http://yaws.hyber.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Yaws(?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "Yieldlab",
    url: "http://yieldlab.de",
    rules: {
      scripts: {
        score: 10,
        contains: ["https?://(?: [^/]+\\.)?yieldlab\\.net/"]
      }
    }
  },
  {
    name: "Yii",
    url: "https://www.yiiframework.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "/assets/[a-zA-Z0-9]{8}\\/yii\\.js$",
          "/yii\\.(?:validation|activeForm)\\.js"
        ]
      },
      cookies: {
        score: 10,
        contains: ["YII_CSRF_TOKEN"]
      }
    }
  },
  {
    name: "Yoast SEO",
    url: "http://yoast.com",
    rules: {
      comments: {
        score: 10,
        contains: [
          "<!-- This site is optimized with the Yoast (?:WordPress )?SEO plugin v([\\d.]+) -"
        ]
      }
    }
  },
  {
    name: "WP-Statistics",
    url: "https://wp-statistics.com",
    rules: {
      comments: {
        score: 10,
        contains: ["<!-- Analytics by WP-Statistics v([\\d.]+) -"]
      }
    }
  },
  {
    name: "iEXExchanger",
    url: "https://exchanger.iexbase.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["iexexchanger_session"]
      },
      metas: {
        score: 10,
        contains: ["iEXExchanger"]
      }
    }
  },
  {
    name: "ZK",
    url: "http://zkoss.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["zkau/"]
      }
    }
  },
  {
    name: "ZURB Foundation",
    url: "http://foundation.zurb.com",
    rules: {
      links: {
        score: 10,
        contains: ['<link[^>]+foundation[^>"]+css']
      },
      classes: {
        score: 1,
        contains: ["row", "medium-", "columns", "small-", "large-"]
      },
      scripts: {
        score: 10,
        contains: ["/foundation.js", "/foundation.min.js"]
      }
    }
  },
  {
    name: "Zabbix",
    url: "http://zabbix.com",
    rules: {
      metas: {
        score: 10,
        contains: ["ZABBIX SIA\\;confidence:70"]
      }
    }
  },
  {
    name: "Zanox",
    url: "http://zanox.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["zanox\\.com/scripts/zanox\\.js$"]
      }
    }
  },
  {
    name: "Zen Cart",
    url: "http://www.zen-cart.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Zen Cart"]
      }
    }
  },
  {
    name: "Zend",
    url: "http://zend.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["ZENDSERVERSESSID"]
      },
      headers: {
        score: 10,
        contains: ["Zend(?:Server)?(?: [\\s/]?([0-9.]+))?"]
      }
    }
  },
  {
    name: "Zendesk Chat",
    url: "http://zopim.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["v2\\.zopim\\.com"]
      }
    }
  },
  {
    name: "Zepto",
    url: "http://zeptojs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["zepto.*\\.js"]
      }
    }
  },
  {
    name: "Zinnia",
    url: "http://django-blog-zinnia.com",
    rules: {
      metas: {
        score: 10,
        contains: ["Zinnia"]
      }
    }
  },
  {
    name: "Zope",
    url: "http://zope.org",
    rules: {
      headers: {
        score: 10,
        contains: ["Zope/"]
      }
    }
  },
  {
    name: "a-blog cms",
    url: "http://www.a-blogcms.jp",
    rules: {
      metas: {
        score: 10,
        contains: ["a-blog cms"]
      }
    }
  },
  {
    name: "actionhero.js",
    url: "http://www.actionherojs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["actionheroClient\\.js"]
      },
      headers: {
        score: 10,
        contains: ["actionhero API"]
      }
    }
  },
  {
    name: "amCharts",
    url: "http://amcharts.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["amcharts.*\\.js"]
      }
    }
  },
  {
    name: "animate.css",
    url: "https://daneden.github.io/animate.css/",
    rules: {
      links: {
        score: 10,
        contains: ["<link [^>]+(?:/([\\d.]+)/)?animate\\.(?:min\\.)?css"]
      }
    }
  },
  {
    name: "basket.js",
    url: "https://addyosmani.github.io/basket.js/",
    rules: {
      scripts: {
        score: 10,
        contains: ["basket.*\\.js\\;confidence:10"]
      }
    }
  },
  {
    name: "cPanel",
    url: "http://www.cpanel.net",
    rules: {
      cookies: {
        score: 10,
        contains: ["cpsession", "cprelogin"]
      },
      headers: {
        score: 10,
        contains: ["cpsrvd/([\\d.]+)"]
      }
    }
  },
  {
    name: "cgit",
    url: "http://git.zx2c4.com/cgit",
    rules: {
      metas: {
        score: 10,
        contains: ["cgit v([\\d.a-z-]+)$"]
      }
    }
  },
  {
    name: "comScore",
    url: "http://comscore.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["\\.scorecardresearch\\.com/beacon\\.js|COMSCORE\\.beacon"]
      }
    }
  },
  {
    name: "debut",
    url: "http://www.brother.com",
    rules: {
      headers: {
        score: 10,
        contains: ["debut\\/?([\\d\\.]+)?"]
      }
    }
  },
  {
    name: "deepMiner",
    url: "https://github.com/deepwn/deepMiner",
    rules: {
      scripts: {
        score: 10,
        contains: ["deepMiner\\.js"]
      }
    }
  },
  {
    name: "e107",
    url: "http://e107.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["[^a-z\\d]e107\\.js"]
      },
      cookies: {
        score: 10,
        contains: ["e107_tz"]
      },
      headers: {
        score: 10,
        contains: ["e107"]
      }
    }
  },
  {
    name: "eSyndiCat",
    url: "http://esyndicat.com",
    rules: {
      headers: {
        score: 10,
        contains: ["eSyndiCat"]
      },
      metas: {
        score: 10,
        contains: ["eSyndiCat"]
      }
    }
  },
  {
    name: "eZ Publish",
    url: "http://ez.no",
    rules: {
      cookies: {
        score: 10,
        contains: ["eZSESSID"]
      },
      headers: {
        score: 10,
        contains: ["eZ Publish"]
      },
      metas: {
        score: 10,
        contains: ["eZ Publish"]
      }
    }
  },
  {
    name: "ef.js",
    url: "http://ef.js.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["/ef(?:-core)?(?:\\.min|\\.dev)?\\.js"]
      }
    }
  },
  {
    name: "enduro.js",
    url: "http://endurojs.com",
    rules: {
      headers: {
        score: 10,
        contains: ["enduro\\.js$"]
      }
    }
  },
  {
    name: "git",
    url: "http://git-scm.com",
    rules: {
      metas: {
        score: 10,
        contains: ["\\bgit/([\\d.]+\\d)"]
      }
    }
  },
  {
    name: "gitweb",
    url: "http://git-scm.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["static/gitweb\\.js$"]
      },
      metas: {
        score: 10,
        contains: ["gitweb(?:/([\\d.]+\\d))?"]
      }
    }
  },
  {
    name: "govCMS",
    url: "https://www.govcms.gov.au",
    rules: {
      metas: {
        score: 10,
        contains: ["Drupal ([\\d]+) \\(http:\\/\\/drupal\\.org\\) \\+ govCMS"]
      }
    }
  },
  {
    name: "gunicorn",
    url: "http://gunicorn.org",
    rules: {
      headers: {
        score: 10,
        contains: ["gunicorn(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "iPresta",
    url: "http://ipresta.ir",
    rules: {
      metas: {
        score: 10,
        contains: ["iPresta"]
      }
    }
  },
  {
    name: "iWeb",
    url: "http://apple.com/ilife/iweb",
    rules: {
      metas: {
        score: 10,
        contains: ["iWeb( [\\d.]+)?"]
      }
    }
  },
  {
    name: "ikiwiki",
    url: "http://ikiwiki.info",
    rules: {
      links: {
        score: 10,
        contains: [
          '<link rel="alternate" type="application/x-wiki" title="Edit this page" href="[^"]*/ikiwiki\\.cgi'
        ]
      }
    }
  },
  {
    name: "imperia CMS",
    url:
      "https://www.pirobase-imperia.com/de/produkte/produktuebersicht/imperia-cms",
    rules: {
      metas: {
        score: 10,
        contains: ["IMPERIA"]
      }
    }
  },
  {
    name: "io4 CMS",
    url: "http://notenbomer.nl/Producten/Content_management/io4_|_cms",
    rules: {
      metas: {
        score: 10,
        contains: ["GO[ |]+CMS Enterprise"]
      }
    }
  },
  {
    name: "ip-label",
    url: "http://www.ip-label.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["clobs\\.js"]
      }
    }
  },
  {
    name: "jQTouch",
    url: "http://jqtouch.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["jqtouch.*\\.js"]
      }
    }
  },
  {
    name: "jQuery",
    url: "https://jquery.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "jquery[.-]([\\d.]*\\d)[^/]*\\.js",
          "/([\\d.]+)/jquery(?:\\.min)?\\.js",
          "jquery.*\\.js(?:\\?ver(?:sion)?=([\\d.]+))?"
        ]
      }
    }
  },
  {
    name: "jQuery Migrate",
    url: "https://github.com/jquery/jquery-migrate",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "jquery[.-]migrate(?:-([\\d.]+))?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))??\\1:\\2"
        ]
      }
    }
  },
  {
    name: "jQuery Mobile",
    url: "https://jquerymobile.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "jquery[.-]mobile(?:-([\\d.]))?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))??\\1:\\2"
        ]
      }
    }
  },
  {
    name: "jQuery-pjax",
    url: "https://github.com/defunkt/jquery-pjax",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "jquery[.-]pjax(?:-([\\d.]))?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))??\\1:\\2"
        ]
      }
    }
  },
  {
    name: "jQuery Sparklines",
    url: "http://omnipotent.net/jquery.sparkline/",
    rules: {
      scripts: {
        score: 10,
        contains: ["jquery\\.sparkline.*\\.js"]
      }
    }
  },
  {
    name: "jQuery UI",
    url: "http://jqueryui.com",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "jquery-ui[.-]([\\d.]*\\d)[^/]*\\.js",
          "([\\d.]+)/jquery-ui(?:\\.min)?\\.js",
          "jquery-ui.*\\.js"
        ]
      }
    }
  },
  {
    name: "jqPlot",
    url: "http://www.jqplot.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["jqplot.*\\.js"]
      }
    }
  },
  {
    name: "libwww-perl-daemon",
    url: "http://metacpan.org/pod/HTTP::Daemon",
    rules: {
      headers: {
        score: 10,
        contains: ["libwww-perl-daemon(?:/([\\d\\.]+))?"]
      }
    }
  },
  {
    name: "lighttpd",
    url: "http://www.lighttpd.net",
    rules: {
      headers: {
        score: 10,
        contains: ["lighttpd(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "math.js",
    url: "http://mathjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["math(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "mini_httpd",
    url: "http://acme.com/software/mini_httpd",
    rules: {
      headers: {
        score: 10,
        contains: ["mini_httpd(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "mod_auth_pam",
    url: "http://pam.sourceforge.net/mod_auth_pam",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_auth_pam(?:/([\\d\\.]+))?"]
      }
    }
  },
  {
    name: "mod_dav",
    url: "http://webdav.org/mod_dav",
    rules: {
      headers: {
        score: 10,
        contains: ["\\b(?:mod_)?DAV\\b(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "mod_fastcgi",
    url: "http://www.fastcgi.com/mod_fastcgi/docs/mod_fastcgi.html",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_fastcgi(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "mod_jk",
    url: "http://tomcat.apache.org/tomcat-3.3-doc/mod_jk-howto.html",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_jk(?:/([\\d\\.]+))?"]
      }
    }
  },
  {
    name: "mod_perl",
    url: "http://perl.apache.org",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_perl(?:/([\\d\\.]+))?"]
      }
    }
  },
  {
    name: "mod_python",
    url: "http://www.modpython.org",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_python(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "mod_rack",
    url: "http://phusionpassenger.com",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_rack(?:/([\\d.]+))?", "mod_rack(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "mod_rails",
    url: "http://phusionpassenger.com",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_rails(?:/([\\d.]+))?", "mod_rails(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "mod_ssl",
    url: "http://modssl.org",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_ssl(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "mod_wsgi",
    url: "https://code.google.com/p/modwsgi",
    rules: {
      headers: {
        score: 10,
        contains: ["mod_wsgi(?:/([\\d.]+))?", "mod_wsgi(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "nopCommerce",
    url: "http://www.nopcommerce.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["Nop.customer"]
      },
      metas: {
        score: 10,
        contains: ["nopCommerce$"]
      }
    }
  },
  {
    name: "osCommerce",
    url: "https://www.oscommerce.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["osCsid"]
      }
    }
  },
  {
    name: "osTicket",
    url: "http://osticket.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["OSTSESSID"]
      }
    }
  },
  {
    name: "otrs",
    url: "https://www.otrs.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/otrs-web/js/"]
      }
    }
  },
  {
    name: "ownCloud",
    url: "https://owncloud.org",
    rules: {
      metas: {
        score: 10,
        contains: ["app-id=543672169"]
      }
    }
  },
  {
    name: "particles.js",
    url: "https://vincentgarreau.com/particles.js/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/particles(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "PhotoShelter",
    url: "https://www.photoshelter.com",
    rules: {
      comments: {
        score: 10,
        contains: ["<!--\\s+#+ Powered by the PhotoShelter Beam platform"]
      }
    }
  },
  {
    name: "phpBB",
    url: "https://phpbb.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["phpbb"]
      },
      metas: {
        score: 10,
        contains: ["phpBB Group"]
      },
      classes: {
        score: 5,
        contains: ["phpbb", "phpBB"]
      }
    }
  },
  {
    name: "phpSQLiteCMS",
    url: "http://phpsqlitecms.net",
    rules: {
      metas: {
        score: 10,
        contains: ["phpSQLiteCMS(?: (.+))?$"]
      }
    }
  },
  {
    name: "phpwind",
    url: "https://www.phpwind.net",
    rules: {
      metas: {
        score: 10,
        contains: ["phpwind(?: v([0-9-]+))?"]
      }
    }
  },
  {
    name: "prettyPhoto",
    url:
      "http://no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/",
    rules: {
      scripts: {
        score: 10,
        contains: ["jquery\\.prettyPhoto\\.js"]
      }
    }
  },
  {
    name: "reCAPTCHA",
    url: "https://www.google.com/recaptcha/",
    rules: {
      scripts: {
        score: 10,
        contains: [
          "api-secure\\.recaptcha\\.net",
          "recaptcha_ajax\\.js",
          "/recaptcha/api\\.js"
        ]
      }
    }
  },
  {
    name: "sIFR",
    url: "https://www.mikeindustries.com/blog/sifr",
    rules: {
      scripts: {
        score: 10,
        contains: ["sifr\\.js"]
      }
    }
  },
  {
    name: "sNews",
    url: "https://snewscms.com",
    rules: {
      metas: {
        score: 10,
        contains: ["sNews"]
      }
    }
  },
  {
    name: "script.aculo.us",
    url: "https://script.aculo.us",
    rules: {
      scripts: {
        score: 10,
        contains: ["/(?:scriptaculous|protoaculous)(?:\\.js|/)"]
      }
    }
  },
  {
    name: "scrollreveal",
    url: "https://scrollrevealjs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["scrollreveal(?:\\.min)(?:\\.js)"]
      }
    }
  },
  {
    name: "shine.js",
    url: "https://bigspaceship.github.io/shine.js/",
    rules: {
      scripts: {
        score: 10,
        contains: ["shine(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "swift.engine",
    url: "http://mittec.ru/default",
    rules: {
      headers: {
        score: 10,
        contains: ["swift\\.engine"]
      }
    }
  },
  {
    name: "three.js",
    url: "https://threejs.org",
    rules: {
      scripts: {
        score: 10,
        contains: ["three(?:\\.min)?\\.js"]
      }
    }
  },
  {
    name: "thttpd",
    url: "https://acme.com/software/thttpd",
    rules: {
      headers: {
        score: 10,
        contains: ["\\bthttpd(?:/([\\d.]+))?"]
      }
    }
  },
  {
    name: "total.js",
    url: "https://totaljs.com",
    rules: {
      headers: {
        score: 10,
        contains: ["total\\.js"]
      }
    }
  },
  {
    name: "uCore",
    url: "http://ucore.io",
    rules: {
      cookies: {
        score: 10,
        contains: ["ucore"]
      },
      metas: {
        score: 10,
        contains: ["uCore PHP Framework"]
      }
    }
  },
  {
    name: "uCoz",
    url: "https://ucoz.ru",
    rules: {
      cookies: {
        score: 10,
        contains: ["uCoz"]
      }
    }
  },
  {
    name: "uKnowva",
    url: "https://uknowva.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["/media/conv/js/jquery\\.js"]
      },
      headers: {
        score: 10,
        contains: ["uKnowva ([\\d.]+)"]
      },
      metas: {
        score: 10,
        contains: ["uKnowva (?: ([\\d.]+))?"]
      }
    }
  },
  {
    name: "vBulletin",
    url: "https://www.vbulletin.com",
    rules: {
      cookies: {
        score: 10,
        contains: ["bbsessionhash", "bblastactivity", "bblastvisit"]
      },
      metas: {
        score: 10,
        contains: ["vBulletin ?([\\d.]+)?"]
      }
    }
  },
  {
    name: "vibecommerce",
    url: "http://vibecommerce.com.br",
    rules: {
      metas: {
        score: 10,
        contains: ["vibecommerce", "vibecommerce"]
      }
    }
  },
  {
    name: "Virgool",
    url: "https://virgool.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Virgool$"]
      }
    }
  },
  {
    name: "shoperfa",
    url: "https://shoperfa.com",
    rules: {
      headers: {
        score: 10,
        contains: ["Shoperfa$"]
      }
    }
  },
  {
    name: "webEdition",
    url: "http://webedition.de/en",
    rules: {
      metas: {
        score: 10,
        contains: ["webEdition", "webEdition"]
      }
    }
  },
  {
    name: "wisyCMS",
    url: "https://wisy.3we.de",
    rules: {
      metas: {
        score: 10,
        contains: ["wisy CMS"]
      }
    }
  },
  {
    name: "wpCache",
    url: "https://wpcache.co",
    rules: {
      headers: {
        score: 10,
        contains: ["wpCache(?:/([\\d.]+))?"]
      },
      metas: {
        score: 10,
        contains: ["wpCache", "wpCache"]
      }
    }
  },
  {
    name: "xCharts",
    url: "https://tenxer.github.io/xcharts/",
    rules: {
      scripts: {
        score: 10,
        contains: ["xcharts\\.js"]
      }
    }
  },
  {
    name: "xtCommerce",
    url: "https://www.xt-commerce.com",
    rules: {
      metas: {
        score: 10,
        contains: ["xt:Commerce"]
      }
    }
  },
  {
    name: "Yepcomm",
    url: "https://www.yepcomm.com.br",
    rules: {
      metas: {
        score: 10,
        contains: ["Yepcomm Tecnologia", "Yepcomm Tecnologia"]
      }
    }
  },
  {
    name: "Rocket",
    url: "https://rocketcms.io",
    rules: {
      headers: {
        score: 10,
        contains: ["Rocket=https://rocketcms.io/"]
      }
    }
  },
  {
    name: "RX Web Server",
    url: "http://developers.rokitax.co.uk/projects/rxweb",
    rules: {
      headers: {
        score: 10,
        contains: ["RX-WEB"]
      }
    }
  },
  {
    name: "Tencent Waterproof Wall",
    url: "https://007.qq.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["/TCaptcha\\.js"]
      }
    }
  },
  {
    name: "CodePen",
    url: "https://codepen.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["codepen.io"]
      }
    }
  },
  {
    name: "Metro UI",
    url: "https://metroui.org.ua/",
    rules: {
      links: {
        score: 10,
        contains: ["/metro.min.css", "/metro.css"]
      },
      classes: {
        score: 1,
        contains: ["mif-"]
      },
      scripts: {
        score: 10,
        contains: ["/metro.js", "/metro.min.js"]
      }
    }
  },
  {
    name: "normalize.css",
    url: "https://necolas.github.io/normalize.css/",
    rules: {
      links: {
        score: 10,
        contains: ["/normalize.css", "/normalize-min.css"]
      }
    }
  },
  {
    name: "SKELETON",
    url: "http://getskeleton.com/",
    rules: {
      links: {
        score: 10,
        contains: ["/skeleton.css", "/skeleton-min.css"]
      }
    }
  },
  {
    name: "SVG",
    url: "http://www.w3.org/Graphics/SVG/",
    rules: {
      attrs: {
        score: 5,
        contains: ["viewbox", "xmlns", "xlink"]
      }
    }
  },
  {
    name: "Open Graph protocol",
    url: "http://ogp.me/",
    rules: {
      metas: {
        score: 10,
        contains: ["og:"]
      }
    }
  },
  {
    name: "SPDY",
    url: "http://chromium.org/spdy",
    rules: {
      headers: {
        score: 10,
        contains: ["X-Firefox-Spdy"]
      }
    }
  },
  {
    name: "Schema.org",
    url: "http://schema.org/",
    rules: {
      attrs: {
        score: 10,
        contains: ["itemscope", "itemprop", "itemtype"]
      }
    }
  },
  {
    name: "WAI-ARIA",
    url: "http://www.w3.org/TR/wai-aria/",
    rules: {
      attrs: {
        score: 10,
        contains: ["aria-"]
      }
    }
  },
  {
    name: "AdPacks",
    url: "http://adpacks.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["adpacks.com"]
      },
      links: {
        score: 10,
        contains: ["adpacks.com"]
      }
    }
  },
  {
    name: "Marin Software",
    url: "http://www.marinsoftware.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["marinsm.com"]
      }
    }
  },
  {
    name: "Captora",
    url: "http://www.captora.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["captora.com"]
      }
    }
  },
  {
    name: "Perfect Audience",
    url: "http://www.perfectaudience.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["perfectaudience.com"]
      }
    }
  },
  {
    name: "Wistia",
    url: "http://wistia.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["wistia.com", "wistia.net"]
      }
    }
  },
  {
    name: "Fullstory",
    url: "https://www.fullstory.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["fullstory.com"]
      }
    }
  },
  {
    name: "Totango",
    url: "http://www.totango.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["totango.com"]
      }
    }
  },
  {
    name: "Convert",
    url: "http://www.convert.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["convertexperiments.com", "convert.com"]
      }
    }
  },
  {
    name: "Route",
    url: "http://www.route.to/",
    rules: {
      scripts: {
        score: 10,
        contains: ["routecdn.com"]
      }
    }
  },
  {
    name: "Customer.io",
    url: "https://customer.io/",
    rules: {
      scripts: {
        score: 10,
        contains: ["customer.io"]
      }
    }
  },
  {
    name: "HitTail",
    url: "https://www.hittail.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["hittail.com"]
      }
    }
  },
  {
    name: "Drip",
    url: "https://www.getdrip.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["getdrip.com"]
      }
    }
  },
  {
    name: "WhoisVisiting",
    url: "https://www.whoisvisiting.com",
    rules: {
      scripts: {
        score: 10,
        contains: ["whoisvisiting.com"]
      }
    }
  },
  {
    name: "Interstate Analytics",
    url: "https://interstateanalytics.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["interstateanalytics.com"]
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
        contains: ["omniture-static.com"]
      }
    }
  },
  {
    name: "MediaMath",
    url: "http://www.mediamath.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["mediamath.com"]
      }
    }
  },
  {
    name: "Pingdom",
    url: "https://www.pingdom.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["pingdom.net"]
      }
    }
  },
  {
    name: "Rackspace",
    url: "ttps://www.rackspace.com/",
    rules: {
      headers: {
        score: 10,
        contains: ["rackspace"]
      }
    }
  },
  {
    name: "String.js",
    url: "http://stringjs.com/",
    rules: {
      scripts: {
        score: 10,
        contains: ["string.js", "string.min.js"]
      }
    }
  },
  {
    name: "Hubspot Analytics",
    url: "http://www.hubspot.com/products/analytics",
    rules: {
      scripts: {
        score: 10,
        contains: ["hs-analytics.net"]
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
      icon: "technologies",
      JSON_LD_TYPE: []
    };
  },
  mounted() {
    this.allTechnologies();

    EventBus.$on("refreshData", () => {
      this.allTechnologies();
    });
  },
  methods: {
    allTechnologies() {
      chrome.tabs.sendMessage(
        this.tab.id,
        { action: "GET_TECH_DATA" },
        response => {
          this.getTechnologies(response.techData);
        }
      );
    },
    getTechnologies(parsedData) {
      let techs = [];
      this.loading = true;
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
        let content = currentRule.contains;
        for (let j = 0, len = data.length; j < len; j++) {
          // find @type
          let match = data[j];
          if (!match) continue;

          if (content.length > 1) {
            for (let i = 0; i < content.length; i++) {
              if (content[i] != "") {
                let regex = new RegExp(content[i]);

                if (regex.test(match)) {
                  score += currentRule.score;
                }
              }
            }
          } else {
            if (content != "") {
              let regex = new RegExp(content);

              if (regex.test(match)) {
                score += currentRule.score;
              }
            }
          }

          // will match ld-json script
          if (match.includes('type="application/ld+json"')) {
            //escape unicode @ for sites like facebook
            if(match.includes('\\u0040')) {
              match = match.replace(/\\u0040/g, '@')
            }
            let Json_ld_type;
              // check if there is any type: @id and skip them
            if (match.includes('"@type": "@id"') || match.includes('"@type":"@id"')) {
               Json_ld_type = match.substring(
                match.lastIndexOf(`@type`),
                match.lastIndexOf(`,`)

              );
            } else {
              Json_ld_type = match.substring(
                match.indexOf(`@type`),
                match.lastIndexOf(`,`)
              );
            }
            // check the ld format type
            if (Json_ld_type.slice(6, 7) === " ") {
              let sliced_ld_type = Json_ld_type.slice(
                10,
                Json_ld_type.indexOf(`",`)
              );
              if (this.JSON_LD_TYPE.indexOf(sliced_ld_type) === -1)
                this.JSON_LD_TYPE.push(sliced_ld_type);
            }

            if (Json_ld_type.slice(7, 8) === " ") {
              let sliced_ld_type = Json_ld_type.slice(
                9,
                Json_ld_type.indexOf(`",`)
              );
              if (this.JSON_LD_TYPE.indexOf(sliced_ld_type) === -1)
                this.JSON_LD_TYPE.push(sliced_ld_type);
            }

            if (Json_ld_type.slice(7, 8) === '"') {
              let sliced_ld_type = Json_ld_type.slice(
                8,
                Json_ld_type.indexOf(`",`)
              );
              if (this.JSON_LD_TYPE.indexOf(sliced_ld_type) === -1)
                this.JSON_LD_TYPE.push(sliced_ld_type);
            }
          }

          if (score > 5) return true;
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
