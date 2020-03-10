import * as config from './manager';

const headers = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...config.get('headers', {})
    };
};

const addHeader = (name, value) => {
    return config.set('headers', {
        ...config.get('headers', {}),
        [name]: value,
    });
};

const setClientId = id => {
    return addHeader('X-Zingle-Client-ID', id);
};

const setAuthorization = auth => {
    return addHeader('Authorization', auth);
};

const setAuthorizationBearer = bearer => {
    return setAuthorization(`Bearer ${bearer}`);
};

/**
 * Return configured error handler
 *
 * @returns {function}
 */
const errorHandler = () => {
    return config.get('errorHandler');
};

/**
 * Convenience method for calling configured handler
 *
 * @param {String} txt
 *
 * @returns {*}
 */
const handleError = txt => {
    return errorHandler()(txt);
};

/**
 * Convenience method for calling process error callback
 *
 * @param {Object} data
 * @param {String} url
 *
 * @returns {*}
 */
const onProcessError = (data, url) => {
    return config.get('onProcessError')(data, url);
};

export {
    headers,
    addHeader,
    setClientId,
    setAuthorizationBearer,
    setAuthorization,
    errorHandler,
    handleError,
    onProcessError
};
export * from './manager';
