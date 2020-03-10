import fetch from './fetch.service';

export function completeIntroTour(serviceUuid) {
    return fetch.put(`/v2/setup-actions/service/${serviceUuid}`, { action: 'onboarding_walkthrough', quantity: 1 });
}

export function skipIntroTour(serviceUuid) {
    return fetch.put(`/v2/setup-actions/service/${serviceUuid}`, { action: 'onboarding_walkthrough', skip: 1 });
}

export function skipSetupStep(serviceUuid, stepId) {
    return fetch.put(`/v2/setup-actions/service/${serviceUuid}`, { action: stepId, skip: true });
}

export function updateMessageReceivedStep(serviceUuid) {
    const data = {
        quantity: 1,
        action: 'message_received'
    };

    return fetch.put(`/v2/setup-actions/service/${serviceUuid}`, data);
}
