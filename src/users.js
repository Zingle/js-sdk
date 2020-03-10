import fetch from './fetch.service';

export function createUser(serviceId, data) {
    return fetch.post(`/v2/services/${serviceId}/users`, data);
}

export function deleteUser(serviceUuid, user, reassignmentType, reassignmentUuid) {
    const data = {
        ...user,
        reassignToTeamId: reassignmentType === 'team' && reassignmentUuid ? reassignmentUuid : null,
        reassignToUserId: reassignmentType === 'user' && reassignmentUuid ? reassignmentUuid : null
    };

    return fetch.post(`/service/${serviceUuid}/service-settings/delete-user`, data);
}

export function getNotificationPreferencesForUser(userUuid) {
    return fetch.get(`/v2/notification/${userUuid}/preferences`);
}

export function getUsersForService(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/users`);
}

export function getUserMetadata(activeServiceId) {
    return fetch.get(`/service/${activeServiceId}/service-settings/users`);
}

export function updateServiceUser(serviceUuid, userUuid, data) {
    return fetch.put(`/v2/services/${serviceUuid}/users/${userUuid}`, data);
}

export function updateUser(serviceId, data) {
    return fetch.post(`/service/${serviceId}/user-settings`, data);
}

export function updateUserWithAvatar(userUuid, data) {
    return fetch.put(`/v2/users/${userUuid}`, data);
}

export function updateUserSettings(userUuid, data) {
    const payload = { fields: [] };

    if (Object.prototype.hasOwnProperty.call(data, 'showUnassignedConversations')) {
        payload.fields.push({
            code: 'show_unassigned_conversations',
            value: data.showUnassignedConversations
        });
    }

    if (Object.prototype.hasOwnProperty.call(data, 'showOnlyMyTeammates')) {
        payload.fields.push({
            code: 'show_only_my_teammates',
            value: data.showOnlyMyTeammates
        });
    }

    return fetch.patch(`/v1/users/${userUuid}/settings`, payload);
}

export function updateNotificationPreferencesForUser(userUuid, desktopBitmask, mobileBitmask) {
    return fetch.put(`/v2/notification/${userUuid}/preferences`, { desktop: desktopBitmask, mobile: mobileBitmask });
}

export function validatePhoneNumber(phoneNumber) {
    return fetch.post('/v2/users/validate/phone-number', { value: phoneNumber });
}

export function validateEmail(value) {
    return fetch.post('/v2/users/validate/email', { value });
}

export function validateAreaCode(value) {
    return fetch.post('/v2/users/validate/area-code', { value });
}

export function validateReputation(name, email, company) {
    return fetch.post('/v2/users/validate/reputation', { fullName: name, email, company });
}

export function sendVerificationEmail(email) {
    return fetch.post('/v2/users/verify', { email });
}

export function signup(data) {
    return fetch.post('/v2/users', data);
}

export function requestPasswordReset(email) {
    return fetch.post('/v1/reset-password', { email });
}

export function resetPassword(email, password, passwordConfirmation, token) {
    return fetch.post('/password/reset', { email, password, passwordConfirmation, token });
}

export function resetPasswordForNonEmailUser(serviceId, userId) {
    const data = {
        id: userId,
    };

    return fetch.post(`/service/${serviceId}/service-settings/reset-password`, data);
}

export function sendUserInvite(serviceUuid, userUuid) {
    return fetch.post(`/v2/services/${serviceUuid}/users/${userUuid}/send-invite`);
}
