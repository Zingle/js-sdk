import fetch from '../fetch.service';

export function activateIntegration(serviceUuid, integrationType, token = null) {
    const data = {};
    // Currently, only the Bitly integration makes use of
    // the token parameter. We can omit it if empty
    if (token) data.auth_token = token;

    return fetch.post(`/v2/services/${serviceUuid}/integrations/${integrationType}`, data);
}

export function disableIntegration(serviceUuid, integrationCode) {
    return fetch.destroy(`/v2/services/${serviceUuid}/integrations/${integrationCode}`);
}

export function getBitlyAccessToken(serviceUuid, code) {
    const data = {};

    data.code = code;

    return fetch.post(`/v2/services/${serviceUuid}/bitly/access-tokens`, data);
}

export function getMindBodyAuthLink(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/integrations/mindbody/activation-link`);
}

export function getIntegrationStatuses(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/integrations`);
}

export function getIntegrationStatus(serviceUuid, integrationCode) {
    return fetch.get(`/v2/services/${serviceUuid}/integrations/${integrationCode}`);
}

export function updateIntegrationMapping(serviceUuid, integrationCode, mapping, beginAtRow = 1) {
    const data = {
        field_mapping: {
            column_field_mapping: mapping,
            begin_at_row: beginAtRow
        }
    };

    return fetch.put(`/v2/services/${serviceUuid}/integrations/${integrationCode}`, data);
}

export function updateIntegrationToken(serviceUuid, integrationCode, data) {
    return fetch.put(`/v2/services/${serviceUuid}/integrations/${integrationCode}`, data);
}

export function updateIntegration(serviceUuid, integrationCode, configuration, mapping = null) {
    const data = {
        configuration,
        field_mapping: mapping
    };

    return fetch.put(`/v2/services/${serviceUuid}/integrations/${integrationCode}`, data);
}

export * as quore from './quore';
export * as webhooks from './webhooks';
export * as hotsos from './hotsos';
