import { frontendState } from './services/fe-state.service';
import { loggerService } from './services/logger.service';

declare const window: IWindow;
window.frontendState = frontendState;
window.loggerService = loggerService;

loggerService.setUser();

