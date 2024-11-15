import { createApp } from 'vue'
import App from './App.vue'
import * as Sentry from '@sentry/vue';
import router from './router';

const app = createApp(App);

Sentry.init({
    app,
    debug:true,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [
        Sentry.browserTracingIntegration({router}),
        Sentry.replayIntegration(),
      ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
})

app.mount('#app')
app.use(router)
