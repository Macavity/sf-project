import * as Sentry from '@sentry/browser';
import { frontendState } from './fe-state.service';

declare const APP_ENV: string;

enum LoggingLevel {
    ERROR = 1,
    WARNING,
    INFO,
    DEBUG,
}

export class LoggerService {
    private _enableTraces = false;

    constructor(
        private loggingLevel = LoggingLevel.WARNING
    ) {

    }

    enableDebugLogLevel() {
        this.loggingLevel = LoggingLevel.DEBUG;
    }

    enableTraces() {
        this._enableTraces = true;
    }

    setUser() {
        if (frontendState.userName) {
            Sentry.setUser({ username: frontendState.userName });
        } else {
            Sentry.setUser(null);
        }
    }

    setTransaction(transaction: string) {
        Sentry.configureScope(scope => scope.setTransactionName(transaction));
    }

    debug(log: unknown, ...optionalParams: unknown[]) {
        if (this.loggingLevel >= LoggingLevel.DEBUG) {
            if (this._enableTraces) {
                console.trace(log, ...optionalParams);
            } else {
                console.debug(log, ...optionalParams);
            }
        }
    }
}

export const loggerService = new LoggerService();

if (typeof APP_ENV !== 'undefined' && APP_ENV === 'dev') {
    loggerService.enableDebugLogLevel();
}
