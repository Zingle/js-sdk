import fetch from './fetch.service';

export function createTemplate(serviceUuid, displayName, body, type) {
    const data = {
        displayName: displayName,
        body: body,
        type: type
    };

    return fetch.post(`/v1/services/${serviceUuid}/templates?camel_case=1`, data);
}

export function deleteTemplate(serviceUuid, templateUuid) {
    return fetch.destroy(`/v1/services/${serviceUuid}/templates/${templateUuid}`);
}

export function updateTemplate(serviceUuid, templateUuid, data) {
    return fetch.put(`/v1/services/${serviceUuid}/templates/${templateUuid}?camel_case=1`, data);
}
