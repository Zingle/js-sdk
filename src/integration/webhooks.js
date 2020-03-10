import fetch from '../fetch.service';

export function getWebhooks(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/webhooks`);
}

export function updateWebhooks(serviceUuid, data = []) {
    return fetch.put(`/v2/services/${serviceUuid}/webhooks`, data);
}
