declare let ADMIN_URL: string;

export function stageIri(stageId: number) {
    return '/api/stages/' + stageId;
}

export function setupIri(setupId: number) {
    return '/api/party_setups/' + setupId;
}

export function editStageURL(stageId: number) {
    return ADMIN_URL + `#/stages/${encodeURIComponent(stageIri(stageId))}`;
}

export function editSetupURL(setupId: number) {
    return ADMIN_URL + `#/party_setups/${encodeURIComponent(setupIri(setupId))}`;
}

export function addSetupURL() {
    return ADMIN_URL + '#/party_setups/create';
}

export function addStageURL() {
    return ADMIN_URL + '#/stages/create';
}
