import fetch from './fetch.service';
import { format, parse } from 'date-fns';

export function getContactLogsItems(serviceUuid, start, end, data) {
    const query = ['?'];

    query.push(`range[start]=${encodeURIComponent(format(parse(start), 'YYYY-MM-DDTHH:mm:ssZ'))}`);
    query.push(`&range[end]=${encodeURIComponent(format(parse(end), 'YYYY-MM-DDTHH:mm:ssZ'))}`);

    if (data.page) {
        query.push('&page=' + data.page);
    }

    if (data.sortDirection) {
        query.push('&sortDirection=' + data.sortDirection.toUpperCase());
    }

    if (data.sort) {
        query.push('&sort=' + data.sort);
    }

    if (data.activeStatus) {
        query.push('&status=' + data.activeStatus);
    }

    if (data.query) {
        query.push('&query=' + data.query);
    }

    return fetch.get(`/v2/services/${serviceUuid}/contact-log${query.join('')}`);
}

export function getContactLogsReport(serviceUuid, start, end) {
    const query = ['?'];

    query.push(`range[start]=${encodeURIComponent(format(parse(start), 'YYYY-MM-DDTHH:mm:ssZ'))}`);
    query.push(`&range[end]=${encodeURIComponent(format(parse(end), 'YYYY-MM-DDTHH:mm:ssZ'))}`);

    return fetch.get(`/v2/services/${serviceUuid}/contact-log${query.join('')}`);
}
