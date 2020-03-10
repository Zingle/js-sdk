import fetch from '../fetch.service';

export function getQuoreAreas(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/quore/area-id-options`);
}

export function getQuoreIssues(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/quore/issue-options`);
}

export function getQuoreItems(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/quore/hk-items`);
}

export function getQuoreRoomItems(serviceUuid, areaName) {
    return fetch.get(`/v2/services/${serviceUuid}/quore/room-items/${areaName}`);
}

export function getQuoreWhenOptions(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/quore/when-options`);
}

export function getQuoreWhereOptions(serviceUuid) {
    return fetch.get(`/v2/services/${serviceUuid}/quore/where-options`);
}
