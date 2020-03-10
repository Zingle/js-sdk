import fetch from './fetch.service';

export function join(name, password, token) {
    return fetch.post('/join', { full_name: name, password, password_confirmaton: password, token });
}
