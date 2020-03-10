import fetch from './fetch.service';
import { format, parse } from 'date-fns';

export function addReportEmail(serviceUuid, email) {
    return fetch.post(`/v2/services/${serviceUuid}/report-emails`, { email });
}

export function alchemyReport(serviceUuid, type, subType, dateGrouping, startDate, endDate, segments, tags) {
    let url = `/v2/services/${serviceUuid}/analytics/internal-report?start_date=${startDate}&end_date=${endDate}&date_grouping=${dateGrouping}&type=${type}&sub_type=${subType}`;

    if (segments.length) {
        url += 'segment_filter=' + segments;
    }

    if (tags.length) {
        url += 'tag_filter=' + tags;
    }

    return fetch.get(url);
}

export function alchemyReportCategories(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/analytics/internal-report-list`);
}

export function getMessageStatusItems(serviceUuid, start, end, data) {
    const query = ['?'];

    query.push(`range[start]=${encodeURIComponent(format(parse(start), 'YYYY-MM-DDTHH:mm:ssZ'))}`);
    query.push(`&range[end]=${encodeURIComponent(format(parse(end), 'YYYY-MM-DDTHH:mm:ssZ'))}`);
    query.push('&size=15');

    if (data.page) {
        query.push('&page=' + data.page);
    }

    if (data.sortDirection) {
        query.push('&sortDirection=' + data.sortDirection.toUpperCase());
    }

    if (data.sortBy) {
        query.push('&sortBy=' + data.sortBy);
    }

    if (data.activeStatus) {
        query.push('&status=' + data.activeStatus);
    }

    if (data.query) {
        query.push('&search=' + data.query);
    }

    return fetch.get(`/v2/services/${serviceUuid}/reports/status${query.join('')}`);
}

export function getMessageStatusReport(serviceUuid, start, end) {
    const data = {
        range: {
            start: format(parse(start), 'YYYY-MM-DDTHH:mm:ssZ'),
            end: format(parse(end), 'YYYY-MM-DDTHH:mm:ssZ')
        }
    };

    return fetch.post(`/v2/services/${serviceUuid}/reports/status`, data);
}

export function getMessageStatusReportCsv(serviceUuid, start, end) {
    const data = {
        range: {
            start: format(parse(start), 'YYYY-MM-DDTHH:mm:ssZ'),
            end: format(parse(end), 'YYYY-MM-DDTHH:mm:ssZ')
        }
    };

    return fetch.post(`/v2/services/${serviceUuid}/reports/status/export`, data);
}

export function getReportEmails(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/report-emails`);
}

export function removeReportEmail(serviceUuid, email) {
    return fetch.destroy(`/v2/services/${serviceUuid}/report-emails?email=${encodeURIComponent(email)}`);
}
