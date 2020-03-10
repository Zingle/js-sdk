import 'es6-promise';
import fetch from 'isomorphic-fetch';
import * as config from './config';
import { getNestedObjectProperty, getFileNameFromHeader } from '@zingle/es-util';
import codeResponses from './constants/server-code-responses';
import exceptionResponses from './constants/server-exception-responses';

const getConfig = () => {
    return {
        api: `https://${config.get('api_domain', 'api.dev.zingle.me')}`,
        domain: `https://${config.get('app_domain', 'app.dev.zingle.me')}`,
        headers: config.headers(),
    };
};

function doFetch(uri, method, payload) {
    const { api, domain, headers } = getConfig();
    let pathDomain = '';
    let formattedUri = uri;
    let requestSpecificHeaders = {};
    const isUpload = payload instanceof FormData;
    // With new addition of location headers for created resources,
    // we need to strip the domain-specific part of the string that may
    // have been included in the uri value so that the path domain does not get added twice
    if (uri.includes(api)) {
        formattedUri = uri.replace(api, '');
    } else if (uri.includes(domain)) {
        formattedUri = uri.replace(domain, '');
    }
    // append appropriate domain
    if (formattedUri.includes('v2') || formattedUri.includes('v1')) {
        pathDomain = api;
    } else {
        pathDomain = domain;
    }

    // if the payload is an instance of FormData, we can assume that this is a
    // file upload. We need to clear any pre-defined Content-Type headers, because fetch will
    // generate the correct header automatically.
    // https://github.com/github/fetch/issues/505#issuecomment-293064470
    if (isUpload) {
        delete headers['Content-Type'];
        delete requestSpecificHeaders['Content-Type'];
    }

    return new Promise((resolve, reject) => {
        fetch(pathDomain + formattedUri, {
            method: method,
            credentials: 'include',
            headers: { ...headers, ...requestSpecificHeaders },
            body: isUpload ? payload : JSON.stringify(payload)
        })
            .then(parseJSON)
            .then(response => {
                if (response.ok) return resolve(response);

                return reject(response);
            })
            .catch(error => reject({ networkError: error.message }));
    });
}

function parseCsv(text, response) {
    if (!window.navigator) {
        throw 'Can run this outside of browser context';
    }

    const a = document.createElement('a');
    const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
    const fileName = getFileNameFromHeader(response.headers.get('Content-Disposition'));
    // IE11-
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        a.textContent = 'download';
        a.download = fileName;
        a.href = `data:text/csv;charset=utf-8,${escape(text)}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function isJSON(text) {
    try {
        JSON.parse(text);
    } catch (e) {
        return false;
    }

    return true;
}

function parseJSON(response) {
    return new Promise(resolve => {
        return response.text().then(text => {
            let data = {};
            let message = '';
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('text/csv')) {
                parseCsv(text, response);
            } else if (text) {
                data = isJSON(text) ? JSON.parse(text) : text;
                // only extract message if response is an error
                if (!response.ok) {
                    message = extractMessageFromResponseText(text);
                    // Log any errors that may apply
                    processError(text, response.url);
                }
            }

            return resolve({
                data,
                location: response.headers.get('Location') || null,
                status: response.status,
                ok: response.ok,
                message
            });
        });
    });
}

function get(uri) {
    return doFetch(uri, 'GET');
}

function patch(uri, data = {}) {
    return doFetch(uri, 'PATCH', data);
}

function post(uri, data = {}) {
    return doFetch(uri, 'POST', data);
}

function put(uri, data = {}) {
    return doFetch(uri, 'PUT', data);
}

function destroy(uri, data = {}) {
    return doFetch(uri, 'DELETE', data);
}

function upload(uri, data = null) {
    return doFetch(uri, 'POST', data);
}

function extractMessageFromResponseText(text) {
    const data = text ? JSON.parse(text) : {};
    const code = (typeof data.error === 'string' ? data.error : false) || data.code || getNestedObjectProperty(data, 'error.code') || getNestedObjectProperty(data, 'error.message') || getNestedObjectProperty(data, 'data.error.message') || getNestedObjectProperty(data, 'status.error_code') || '';
    const exception = getNestedObjectProperty(data, 'error.type') || getNestedObjectProperty(data, 'data.error.type') || '';
    const description = data.description || getNestedObjectProperty(data, 'status.description') || getNestedObjectProperty(data, 'data.status.description') || getNestedObjectProperty(data, 'error.message') || '';

    if (typeof data === 'string') return data;
    if (Object.prototype.hasOwnProperty.call(codeResponses, code.toString().toLowerCase())) {
        return codeResponses[code.toString().toLowerCase()];
    }
    if (description.length) return description;
    if (exception && Object.prototype.hasOwnProperty.call(exceptionResponses, exception)) {
        return exceptionResponses[exception];
    }

    config.handleError(text);
    // TODO: Update this in the client
    // if (window.Rollbar && text) {
    //     window.Rollbar.warning('Unhandled frontend error', { response: text });
    // }

    return 'Something went wrong, please try again.';
}

export function processError(text, url) {
    const data = text ? JSON.parse(text) : {};
    config.onProcessError(data, url);
}

export default {
    get,
    patch,
    post,
    put,
    destroy,
    upload,
    getConfig
};
