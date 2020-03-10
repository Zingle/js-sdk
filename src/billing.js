import fetch from './fetch.service';

export function getBillingSummary(accountUuid) {
    return fetch.get(`/v2/accounts/${accountUuid}/summary`);
}

export function getUsage(serviceUuid, date = null) {
    const data = {};

    if (date) {
        data.date = date;
    }

    return fetch.get(`/v2/services/${serviceUuid}/usage`, data);
}

export function updatePaymentMethod(accountUuid, data) {
    return fetch.post(`/v2/accounts/${accountUuid}/billing`, data);
}

export function updateAdditionalBillingEmails(accountUuid, emailAddresses) {
    return fetch.put(`/v2/accounts/${accountUuid}/email-addresses`, { email_addresses: emailAddresses });
}

export function runPayment(accountUuid) {
    return fetch.put(`/v2/accounts/${accountUuid}/run-payment`, { accountId: accountUuid });
}

export function submitBillingContact(accountUuid, data) {
    return fetch.put(`/v2/accounts/${accountUuid}/bill-to-contact`, data);
}
