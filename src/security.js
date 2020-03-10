import fetch from './fetch.service';

export function login(username, password) {
    return fetch.post('/signup/login', { username, password });
}

export function ssoLogin(domainCode) {
    const data = {
        domainCode,
        autoRedirect: false,
    };

    return fetch.post('/saml/login', data);
}

export function refreshToken() {
    return fetch.get('/v2/token/refresh');
}
