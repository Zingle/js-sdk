import fetch from './fetch.service';

export function getIDPData(idpId) {
    return fetch.get(`/v2/saml/idps/${idpId}`);
}

export function getSSOUsers(idpId, query = '') {
    return fetch.get(`/v2/saml/idps/${idpId}/users?q=${query}`);
}
