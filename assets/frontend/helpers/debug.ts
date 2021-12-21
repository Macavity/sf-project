export function getFrontController(): string {
    const regex = /(\/[^/]+\.php)\//;
    const regexResult = regex.exec(window.location.pathname);

    if (regexResult) {
        return regexResult[1];
    }

    return '';
}
