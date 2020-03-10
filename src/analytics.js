import fetch from './fetch.service';

export function exportMessageDetails(serviceId, startDate, endDate) {
    const data = {
        startDate,
        endDate
    };

    return fetch.post(`/service/${serviceId}/analytics/export-detail-csv`, data);
}

export function exportMessageSummary(serviceId, reportUrl) {
    const data = {
        url: reportUrl,
    };

    return fetch.post(`/v2/services/${serviceId}/analytics/export`, data);
}

export function exportMessageSummaryPdf(serviceId, reportUrl) {
    const data = {
        url: reportUrl,
    };

    return fetch.post(`/v2/services/${serviceId}/analytics/export-pdf`, data);
}

export function getAnalyticsReports(serviceUuid, getRollupReports = false) {
    return fetch.get(`/v2/services/${serviceUuid}/analytics/report-list${getRollupReports ? '?type=rollup' : '?type=standard'}`);
}

export function getAnalyticsCollections(serviceUuid) {
    return fetch.get(`/v2/service-collections?service_id=${serviceUuid}`);
}

export function getAnalyticsReportUrl(serviceUuid, reportId, { start, end, collectionId, collectionValues, groupBy }) {
    const data = {};

    data.report_id = reportId;
    data.start_date = start;
    data.end_date = end;

    if (collectionId) {
        data.collection_id = collectionId;
        data.collection_field_id = groupBy;
    }

    if (collectionValues && Object.keys(collectionValues).length) {
        data.selected_collection_field_values = collectionValues;
    }

    return fetch.post(`/v2/services/${serviceUuid}/analytics/sign-url`, data);
}
