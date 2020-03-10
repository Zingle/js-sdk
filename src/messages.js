import fetch from './fetch.service';

export function deleteMessage(serviceUuid, eventUuid) {
    return fetch.destroy(`/v2/services/${serviceUuid}/messages/${eventUuid}`);
}

export function forwardMessage(
    serviceUuid,
    eventUuid,
    {
        recipients,
        body,
        type,
        selectedHotsosIssue,
        hotsosRoom,
        quoreAreaId,
        quoreAreaName,
        quoreItemId,
        quoreWhenId,
        quoreWhereId,
        quoreIssueId,
    },
) {
    const data = {
        recipientType: type,
        recipients,
        body,
        hotsosIssue: selectedHotsosIssue || null,
        room: hotsosRoom || null,
        areaId: parseInt(quoreAreaId) || null,
        areaName: quoreAreaName || null,
        itemId: parseInt(quoreItemId) || null,
        when: parseInt(quoreWhenId) || null,
        where: parseInt(quoreWhereId) || null,
        quoreIssue: parseInt(quoreIssueId) || null,
    };

    return fetch.post(`/v1/services/${serviceUuid}/messages/${eventUuid}/forward?camel_case=1`, data);
}

export function getMessageCount(serviceUuid) {
    return fetch.get(`/v1/services/${serviceUuid}/messages/month-to-date-count`);
}

export function sendMessage(serviceUuid, data) {
    return fetch.post('/v1/services/' + serviceUuid + '/messages?camel_case=1', data);
}

export function sendNewMessage(serviceUuid, data) {
    return fetch.post(`/v2/services/${serviceUuid}/messages`, data);
}
