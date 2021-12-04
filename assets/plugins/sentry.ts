import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { loggerService } from '../frontend/services/logger.service';

declare const SENTRY_FRONTEND: string;

if (typeof SENTRY_FRONTEND === 'undefined') {
    loggerService.debug('Sentry not defined.');
} else {
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
