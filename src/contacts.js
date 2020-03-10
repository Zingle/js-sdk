import fetch from './fetch.service';

export function createContact(serviceId, data) {
    return fetch.post(`/service/${serviceId}/contacts/save-new-contact`, data);
}

export function deleteAllContacts(serviceId, { isPermanent, total }) {
    const data = {
        isPermanent,
        confirmedCount: total
    };

    return fetch.post(`/service/${serviceId}/contacts/delete-all-contacts`, data);
}

export function bulkDeleteContacts(serviceId, { selected, criteria, isPermanent, total }) {
    const data = {
        contactIds: selected,
        confirmedCount: total,
        criteria,
        isPermanent
    };

    return fetch.post(`/service/${serviceId}/contacts/bulk-delete-contacts`, data);
}

export function bulkUpdateContactField(serviceId, { contactFieldId, value, selected, criteria }) {
    // The server expects a value of null when "emptying" a contact field, while we
    // store it as an empty string or a boolean. Check if value is a string and empty, and cast to
    // null if so.
    const formattedValue = typeof value === 'string' && !value.length ? null : value;
    const data = {
        contactIds: selected,
        contactFieldId,
        contactFieldValue: formattedValue,
        criteria
    };

    return fetch.post(`/service/${serviceId}/contacts/bulk-set-contact-field-value`, data);
}

export function closeFeed(serviceUuid, contactUuid) {
    return fetch.put(`/v1/services/${serviceUuid}/contacts/${contactUuid}`, { is_closed: true, is_confirmed: true });
}

export function createContactField(serviceUuid, contactFields) {
    return fetch.post(`/v1/services/${serviceUuid}/contact-custom-fields?camel_case=1`, contactFields);
}

export function deleteContactField(serviceUuid, contactFieldUuid) {
    return fetch.destroy(`/v1/services/${serviceUuid}/contact-custom-fields/${contactFieldUuid}`);
}

export function exportContacts(serviceId, selected, criteria) {
    const data = {
        contactIds: selected,
        criteria
    };

    return fetch.post(`/service/${serviceId}/contacts/export-selected-contacts-csv`, data);
}

export function getImportTemplate(serviceId) {
    return fetch.get(`/service/${serviceId}/contacts/sample-csv`);
}

export function importContactCsv(serviceId, data) {
    return fetch.upload(`/service/${serviceId}/contacts/upload-csv`, data);
}

export function importCsvColumnMap(serviceId, columnMap, startAtRow = 1) {
    const data = {
        beginAtRow: startAtRow,
        headerMap: columnMap
    };

    return fetch.post(`/service/${serviceId}/contacts/finish-csv-import`, data);
}

export function markFeedUnread(serviceId, feedId) {
    return fetch.post(`/service/${serviceId}/feeds/unconfirm`, { feedId });
}

export function markFeedRead(serviceId, feedId) {
    return fetch.post(`/service/${serviceId}/feeds/confirm`, { feedId });
}

export function mergeContacts(serviceId, sourceId, destinationId) {
    const data = {
        destroyContactId: sourceId,
        mergeWithContactId: destinationId
    };

    return fetch.post(`/service/${serviceId}/contacts/merge-contacts`, data);
}

export function updateContactField(serviceUuid, fieldUuid, data) {
    return fetch.put(`/v1/services/${serviceUuid}/contact-custom-fields/${fieldUuid}?camel_case=1`, data);
}

export function updateContactFieldValue(serviceId, contactUuid, fieldUuid, fieldValue) {
    return fetch.post(`/v1/services/${serviceId}/contacts/${contactUuid}/custom-field-values/${fieldUuid}?camel_case=1`, {
        value: fieldValue
    });
}

export function updateContactFirstName(serviceUuid, contactUuid, value) {
    return fetch.put(`/v1/services/${serviceUuid}/contacts/${contactUuid}?camel_case=1`, { firstName: value });
}

export function updateContactLastName(serviceUuid, contactUuid, value) {
    return fetch.put(`/v1/services/${serviceUuid}/contacts/${contactUuid}?camel_case=1`, { lastName: value });
}

export function updateContactTitle(serviceUuid, contactUuid, value) {
    return fetch.put(`/v1/services/${serviceUuid}/contacts/${contactUuid}?camel_case=1`, { title: value });
}

export function updateContactNotes(serviceUuid, contactUuid, value) {
    return fetch.put(`/v1/services/${serviceUuid}/contacts/${contactUuid}?camel_case=1`, { notes: value });
}

export function openFeed(serviceUuid, contactUuid) {
    return fetch.put(`/v1/services/${serviceUuid}/contacts/${contactUuid}`, { is_closed: false });
}

export function sendNote(serviceId, data) {
    return fetch.post(`/service/${serviceId}/feeds/add-note`, data);
}
