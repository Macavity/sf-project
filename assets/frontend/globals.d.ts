import { IFrontendState } from './interfaces/IFrontendState';

declare module '*.module.css';
declare module '*.module.scss';

interface IWindow extends Window {
    frontendState: IFrontendState;
    loggerService: LoggerService;
}

declare let window: IWindow;
