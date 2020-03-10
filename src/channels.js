import fetch from './fetch.service';

export function blockInboundForChannel(serviceId, contactUuid, channelUuid) {
    const data = {};

    data.channelId = channelUuid;
    data.contactId = contactUuid;

    return fetch.post(`/service/${serviceId}/block-channel`, data);
}

export function blockOutboundForChannel(serviceId, contactUuid, channelUuid) {
    const data = {};

    data.channelId = channelUuid;
    data.contactId = contactUuid;

    return fetch.post(`/service/${serviceId}/unsubscribe-phone-number`, data);
}

export function createChannel(serviceUuid, contactUuid, channelTypeUuid, value, countryCode = null) {
    const data = {
        channelTypeId: channelTypeUuid,
        value
    };

    if (countryCode) {
        data.country = countryCode.toUpperCase();
    }

    return fetch.post(`/v1/services/${serviceUuid}/contacts/${contactUuid}/channels?camel_case=1`, data);
}

export function createChatChannel(serviceUuid) {
    const data = { foo: 'bar' };

    return fetch.post(`/v2/service/${serviceUuid}/channels/chat`, data);
}

export function createFacebookChannel(serviceId, pageId, pageToken, userToken) {
    const data = {
        pageId,
        authToken: pageToken,
        userAccessToken: userToken
    };

    return fetch.post(`/service/${serviceId}/service-settings/create-facebook-channel`, data);
}

export function createLineChannel(serviceId, { type, channelId, channelMid, secret, token }) {
    const data = {};

    if (type === 'line_at') {
        data.channel = channelId;
        data.metadata = JSON.stringify({
            access_token: token,
            channel_id: channelId,
            channel_secret: secret
        });
    } else if (type === 'line_partner') {
        data.channel = channelMid;
        data.metadata = JSON.stringify({
            channel_id: channelId,
            channel_secret: secret
        });
    }

    return fetch.post(`/service/${serviceId}/service-settings/save-line-channel`, data);
}

export function createWechatChannel(serviceId, microSignal, appId, secret) {
    const data = {
        uuid: null,
        channel: microSignal,
        metadata: JSON.stringify({
            channel_id: appId,
            channel_secret: secret,
            micro_signal: microSignal
        })
    };

    return fetch.post(`/service/${serviceId}/service-settings/save-wechat-channel`, data);
}

export function deleteChannel(serviceUuid, contactUuid, channelUuid) {
    return fetch.destroy(`/v1/services/${serviceUuid}/contacts/${contactUuid}/channels/${channelUuid}`);
}

export function deleteChatChannel(serviceUuid, channelUuid) {
    return fetch.destroy(`/v2/service/${serviceUuid}/channels/chat/${channelUuid}`);
}

export function deleteFacebookChannel(serviceId, pageId, pageToken) {
    const data = {
        pageId,
        authToken: pageToken
    };

    return fetch.post(`/service/${serviceId}/service-settings/delete-facebook-channel`, data);
}

export function deleteLineChannel(serviceId, channelUuid) {
    return fetch.post(`/service/${serviceId}/service-settings/delete-line-channel`, { uuid: channelUuid });
}

export function deleteWechatChannel(serviceId, channelUuid) {
    return fetch.post(`/service/${serviceId}/service-settings/delete-wechat-channel`, { uuid: channelUuid });
}

export function updateWechatChannel(serviceId, channelUuid, { microSignal, appId, secret }) {
    const data = {
        uuid: channelUuid,
        channel: microSignal,
        metadata: JSON.stringify({
            channel_id: appId,
            channel_secret: secret,
            micro_signal: microSignal
        })
    };

    return fetch.post(`/service/${serviceId}/service-settings/save-wechat-channel`, data);
}

export function updateChannel(contactUuid, channelUuid, value, countryCode = null) {
    const data = { value };

    if (countryCode) {
        data.country = countryCode.toUpperCase();
    }

    return fetch.put(`/v2/contacts/${contactUuid}/channel/${channelUuid}`, data);
}

export function updateChatChannel(serviceUuid, channelUuid, data) {
    return fetch.put(`/v2/service/${serviceUuid}/channels/chat/${channelUuid}`, data);
}

export function updateLineChannel(serviceId, channelUuid, { type, channelId, channelMid, secret, token }) {
    const data = {};

    data.uuid = channelUuid;

    if (type === 'line_at') {
        data.channel = channelId;
        data.metadata = JSON.stringify({
            access_token: token,
            channel_id: channelId,
            channel_secret: secret
        });
    } else if (type === 'line_partner') {
        data.channel = channelMid;
        data.metadata = JSON.stringify({
            channel_id: channelId,
            channel_secret: secret
        });
    }

    return fetch.post(`/service/${serviceId}/service-settings/save-line-channel`, data);
}

export function unblockInboundForChannel(serviceId, contactUuid, channelUuid) {
    const data = {};

    data.channelId = channelUuid;
    data.contactId = contactUuid;

    return fetch.post(`/service/${serviceId}/unblock-channel`, data);
}

export function unblockOutboundForChannel(serviceId, contactUuid, channelUuid) {
    const data = {};

    data.channelId = channelUuid;
    data.contactId = contactUuid;

    return fetch.post(`/service/${serviceId}/subscribe-phone-number`, data);
}

export function setChannelAsPrimary(serviceUuid, contactUuid, channelUuid) {
    return fetch.put(`/v1/services/${serviceUuid}/contacts/${contactUuid}/channels/${channelUuid}?camel_case=1`, { isDefault: true });
}
