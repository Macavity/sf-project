import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

declare const SENTRY_FRONTEND: string;

if (typeof SENTRY_FRONTEND === 'undefined') {
    console.log('Sentry not defined.');
} else {
    //console.log('Sentry', SENTRY_FRONTEND);
    Sentry.init({
        // Placeholder for Webpack
        dsn: SENTRY_FRONTEND,
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}
