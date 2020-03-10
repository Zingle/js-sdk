import fetch from './fetch.service';

export function createSegment(serviceUuid, { displayName, backgroundColor, textColor, conditions }) {
    const data = {
        displayName,
        backgroundColor,
        textColor,
        conditions,
        conditionBooleanOperator: 'AND',
        serviceUuid
    };

    return fetch.post(`/v1/services/${serviceUuid}/contact-groups?camel_case=1`, data);
}

export function deleteSegment(serviceUuid, segmentUuid) {
    return fetch.destroy(`/v1/services/${serviceUuid}/contact-groups/${segmentUuid}`);
}

export function updateSegment(serviceUuid, segmentUuid, { displayName, backgroundColor, textColor, conditions }) {
    const data = {
        displayName,
        backgroundColor,
        textColor,
        conditions,
        conditionBooleanOperator: 'AND',
        serviceUuid
    };

    return fetch.put(`/v1/services/${serviceUuid}/contact-groups/${segmentUuid}?camel_case=1`, data);
}
