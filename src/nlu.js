import fetch from './fetch.service';

export function categorize(serviceUuid, messageUuid, categoryUuids = []) {
    return fetch.put(`/v2/services/${serviceUuid}/messages/${messageUuid}/categories`, categoryUuids);
}

export function createCategory(serviceUuid, displayName) {
    return fetch.post(`/v2/services/${serviceUuid}/message-categories`, { name: displayName });
}

export function deleteCategory(serviceUuid, categoryUuid) {
    return fetch.destroy(`/v2/services/${serviceUuid}/message-categories/${categoryUuid}`);
}

export function updateCategory(serviceUuid, categoryUuid, displayName) {
    return fetch.put(`/v2/services/${serviceUuid}/message-categories/${categoryUuid}`, { name: displayName });
}
