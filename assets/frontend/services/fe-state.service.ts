export class FrontendStateService {
    public static get(): IFrontendState {
        const $appState = document.getElementById('appstate');

        if (!$appState) {
            throw new TypeError('App-state not found in DOM while searching for ID appstate.');
        }

        return JSON.parse($appState.innerHTML.trim());
    }

    public static getJsonData<T>(id: string): T {
        const element = document.getElementById(id);

        if (!element) {
            throw new TypeError(`JSON Data-Element not found in DOM while searching for ID ${id}`);
        }

        return JSON.parse(element.innerHTML.trim());
    }
}
