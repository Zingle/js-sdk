import fetch from './fetch.service';

export function cancelAutomation(serviceId, contactId) {
    return fetch.post(`/service/${serviceId}/contacts/stop-workflow`, { contactId });
}

export function getAutomations(termId) {
    let url = '/v2/zings/templates?';

    if (termId) {
        url += 'term_id=' + termId;
    }

    return fetch.get(url);
}

export function getTemplateCategories() {
    return fetch.get('/v2/vocabulary/category/terms');
}

export function useTemplate(templateId, serviceId) {
    return fetch.post(`/v2/zing/${templateId}/service/${serviceId}/import`);
}

export function triggerAutomation(serviceId, contactId, automationId) {
    return fetch.post(`/service/${serviceId}/contacts/start-workflow`, { contactId, workflowId: automationId });
}

export function runWorkflowSuggestion(serviceUuid, eventUuid) {
    return fetch.put(`/v1/services/${serviceUuid}/zing/suggestions/${eventUuid}`, { action: 'accept' });
}

export function dismissWorkflowSuggestion(serviceUuid, eventUuid) {
    return fetch.put(`/v1/services/${serviceUuid}/zing/suggestions/${eventUuid}`, { action: 'ignore' });
}

export function invalidateWorkflowSuggestion(serviceUuid, eventUuid) {
    return fetch.put(`/v1/services/${serviceUuid}/zing/suggestions/${eventUuid}`, { action: 'report' });
}
