import { createApp } from 'vue'
import App from './App.vue'
import * as Sentry from '@sentry/vue';
import router from './router';

const app = createApp(App);

Sentry.init({
    app,
    debug:true,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    release: "3.2",
    integrations: [
        Sentry.browserTracingIntegration({router}),
        Sentry.replayIntegration(),
      ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    tracePropagationTargets: [
      "127.0.0.1:8000"
    ]
})

app.use(router)
app.mount('#app')

