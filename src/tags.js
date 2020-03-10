import fetch from './fetch.service';

export function attachTag(serviceUuid, contactUuid, tagUuid) {
    return fetch.post(`/v1/services/${serviceUuid}/contacts/${contactUuid}/labels/${tagUuid}`);
}

export function bulkApplyTag(serviceId, tagUuid, selected, criteria) {
    const data = {
        contactIds: selected,
        criteria,
        labelId: tagUuid
    };

    return fetch.post(`/service/${serviceId}/contacts/bulk-apply-label`, data);
}

export function bulkRemoveTag(serviceId, tagUuid, selected, criteria) {
    const data = {
        contactIds: selected,
        criteria,
        labelId: tagUuid
    };

    return fetch.post(`/service/${serviceId}/contacts/bulk-remove-label`, data);
}

export function createTag(serviceUuid, displayName, textColor, backgroundColor) {
    return fetch.post(`/v1/services/${serviceUuid}/contact-labels?camel_case=1`, { displayName, backgroundColor, textColor });
}

export function deleteTag(serviceUuid, tagUuid) {
    return fetch.destroy(`/v1/services/${serviceUuid}/contact-labels/${tagUuid}`);
}

export function updateTag(serviceUuid, tagUuid, { displayName, textColor, backgroundColor }) {
    const data = {
        displayName,
        textColor,
        backgroundColor
    };
    return fetch.put(`/v1/services/${serviceUuid}/contact-labels/${tagUuid}?camel_case=1`, data);
}

export function removeTag(serviceUuid, contactUuid, tagUuid) {
    return fetch.destroy(`/v1/services/${serviceUuid}/contacts/${contactUuid}/labels/${tagUuid}`);
}
