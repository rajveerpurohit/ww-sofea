import { GOOGLE_ANALYTICS_ID } from '../../../config/env';
import { GOOGLE_TAG_MANAGER_ID as GTM_ID } from '../../../config/secrets';

const createAppScript = () => '<script async type="text/javascript" charset="utf-8" src="/assets/app.js"></script>';

const createTrackingScript = () => GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID) : '';

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

const createStylesheets = () => '';

// Google Tag Manager - When JS is enabled
const createGTMScript = () => (GTM_ID ? (`
<script>window.dataLayer=window.dataLayer || [];</script>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
`) : '');

// Google Tag Manager - When JS is disabled
const createGTMNoScript = () => (GTM_ID ? (`
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
`) : '');

export { createAppScript, createTrackingScript, createStylesheets, createGTMScript, createGTMNoScript };
