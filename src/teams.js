import fetch from './fetch.service';

export function createTeam(serviceUuid, displayName, emoji, userUuids) {
    const data = {
        name: displayName,
        emojiCode: emoji,
        users: userUuids
    };

    return fetch.post(`/v2/services/${serviceUuid}/teams`, data);
}

export function assign(contactUuid, assignmentType, assignmentUuid) {
    const data = {};

    if (assignmentType === 'user') {
        data.userId = assignmentUuid;
        data.teamId = null;
    }

    if (assignmentType === 'team') {
        data.userId = null;
        data.teamId = assignmentUuid;
    }

    return fetch.put(`/v2/contacts/${contactUuid}/assign`, data);
}

export function bulkAssign(serviceId, { userId, teamId, selected, criteria }) {
    const data = {
        contactIds: selected,
        userId,
        teamId,
        criteria
    };

    return fetch.post(`/service/${serviceId}/contacts/bulk-assign`, data);
}

export function deleteTeam(serviceUuid, teamUuid, reassignmentType, reassignmentUuid) {
    const data = {
        reassignToTeamId: reassignmentType === 'team' && reassignmentUuid ? reassignmentUuid : null,
        reassignToUserId: reassignmentType === 'user' && reassignmentUuid ? reassignmentUuid : null
    };

    return fetch.destroy(`/v2/services/${serviceUuid}/teams/${teamUuid}`, data);
}

export function updateTeam(serviceUuid, teamUuid, { displayName, emoji, userUuids }) {
    const data = {
        name: displayName,
        emojiCode: emoji,
        users: userUuids
    };

    return fetch.put(`/v2/services/${serviceUuid}/teams/${teamUuid}`, data);
}

export function unassign(contactUuid) {
    return fetch.put(`/v2/contacts/${contactUuid}/unassign`);
}
