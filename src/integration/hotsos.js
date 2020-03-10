import fetch from '../fetch.service';

export function searchHotsosIssues(serviceId, query) {
    return fetch.get(`/service/${serviceId}/inbox/search-hotsos-issues?search=${query}`);
}

export function searchHotsosRooms(serviceId, query) {
    return fetch.get(`/service/${serviceId}/inbox/search-hotsos-rooms?search=${query}`);
}
