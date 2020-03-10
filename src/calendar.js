import fetch from './fetch.service';

export function createEvent(serviceUuid, { attendees, title, type, description, startsAt, endsAt }) {
    const data = {
        attendees,
        title,
        type,
        description,
        startsAt,
        endsAt,
        allDay: false
    };

    return fetch.post(`/v2/services/${serviceUuid}/calendar/events`, data);
}

export function createEventType(serviceUuid, { name, description, textColor, backgroundColor }) {
    const data = {
        name,
        description,
        textColor,
        backgroundColor
    };

    return fetch.post(`/v2/services/${serviceUuid}/calendar/events/types`, data);
}

export function setEventTypeAsDefault(serviceUuid, eventTypeUuid) {
    return fetch.post(`/v2/services/${serviceUuid}/calendar/events/types/${eventTypeUuid}/default`);
}

export function deleteEventType(serviceUuid, eventTypeUuid) {
    return fetch.destroy(`/v2/services/${serviceUuid}/calendar/events/types/${eventTypeUuid}`);
}

export function deleteEvent(serviceUuid, eventUuid) {
    return fetch.destroy(`/v2/services/${serviceUuid}/calendar/events/${eventUuid}`);
}

export function updateEvent(serviceUuid, eventUuid, { title, description, startsAt, endsAt, attendees }) {
    const data = {
        attendees,
        title,
        description,
        startsAt,
        endsAt,
        allDay: false
    };

    return fetch.put(`/v2/services/${serviceUuid}/calendar/events/${eventUuid}`, data);
}

export function updateEventType(serviceUuid, eventTypeUuid, { name, description, textColor, backgroundColor }) {
    const data = {
        name,
        description,
        textColor,
        backgroundColor
    };

    return fetch.put(`/v2/services/${serviceUuid}/calendar/events/types/${eventTypeUuid}`, data);
}
