<template>
  <div class="scrollable--issue"
       :class="{ 'alert--success': data.set,
                 'alert--danger': !data.set }">
      <h4 class="mt0 mb0">{{ title }}</h4>
      <p class="mb0">
        <span>{{ this.headerProperties[title].title }}</span>
        <a :href="this.headerProperties[title].link" target="_blank">Learn more</a>
      </p>
      <p class="code mb0">
        <code>{{ data.value }}</code>
      </p>
  </div>
</template>

<script>
export default {
  props: ["title", "data"],
  data() {
    return {
      headerProperties: {
        'Strict-Transport-Security': {
          title: 'HSTS tells the browser that the connection should be made using HTTPS, instead of HTTP. ',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
          severity: 'HIGH',
        },
        'Content-Security-Policy': {
          title: 'CSP is an additional layer of security that helps to detect and diminish certain types of attacks, like Cross-Site Scripting (XSS) and data injection attacks. ',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy',
          severity: 'HIGH',
        },
        'X-Frame-Options': {
          title: 'XFO indicate whether or not the browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object> to avoid click-jacking attacks ensuring that their content is not embedded into other sites. ',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
          severity: 'MEDIUM',
        },
        'X-Content-Type-Options': {
          title: 'Server uses this marker to indicate that the MIME types used in the Content-Type headers should be respected and not be changed to avoid MIME type sniffing by saying that the MIME types are purposely configured. ',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
          severity: 'LOW',
        },
        'Referrer-Policy': {
          title: 'Referrer-Policy controls what information should be included with the requests. ',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy',
          severity: 'LOW',
        },
        'Permissions-Policy': {
          title: 'Permissions Policy has the ability to allow or block the use of browser features in its own frame or in iframes that it embeds. ',
          link: 'https://owasp.org/www-project-secure-headers/#permissions-policy',
          severity: 'LOW',
        },
      },
    };
  },
}
</script>
