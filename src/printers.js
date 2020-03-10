import fetch from './fetch.service';

export function getServicePrinters(serviceId) {
    return fetch.get(`/service/${serviceId}/service-settings/printers`);
}

export function getPrintersForService(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/printers`);
}

export function updatePrinter(serviceId, data) {
    return fetch.post(`/service/${serviceId}/service-settings/update-printer`, data);
}

export function updateLinkedPrinter(serviceId, data) {
    return fetch.post(`/service/${serviceId}/service-settings/update-linked-printer`, data);
}
