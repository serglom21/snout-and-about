import { createApp } from 'vue'
import App from './App.vue'
import * as Sentry from '@sentry/vue';
import router from './router';

const app = createApp(App);

Sentry.init({
    app,
    debug:true,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    release: process.env.VUE_APP_RELEASE,
    trackComponents: true,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
        Sentry.browserTracingIntegration({router}),
        Sentry.replayIntegration(),
        Sentry.browserProfilingIntegration()
      ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    tracePropagationTargets: [
      "127.0.0.1:8000",
      "herokuapp.com"
    ]
})

app.use(router)
app.mount('#app')

