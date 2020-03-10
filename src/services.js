import fetch from './fetch.service';

export function getInvertedAutoresponderSchedule(serviceUuid, data) {
    let payload = {};
    // The API endpoint returns an error if an empty array is sent, but
    // not if the array has items. Send an empty object by default, only swapping the
    // reference with the data argument if the data array has items.
    if (Array.isArray(data) && data.length) {
        payload = data;
    }

    return fetch.post(`/v1/services/${serviceUuid}/invert-schedule?camel_case=1`, payload);
}

export function getTranslation(activeServiceId, body, remoteLanguage, localLanguage) {
    return fetch.get(`/service/${activeServiceId}/translate?body=${body}&remoteLanguage=${remoteLanguage}&localLanguage=${localLanguage}`);
}

export function updateServiceSettings(serviceUuid, data) {
    return fetch.put(`/v1/services/${serviceUuid}?camel_case=1`, data);
}
