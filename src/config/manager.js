const config = {
    onProcessError: () => {},
    errorHandler: () => {},
};

function get(name = null, defaultValue = null) {
    if (name) {
        return Object.prototype.hasOwnProperty.call(config, name) ? config[name] : defaultValue;
    }

    return config;
}

function set(name, value) {
    config[name] = value;

    return config;
}

function update(object) {
    Object.prototype.assign.call(config, object);

    return config;
}

export {
    get,
    set,
    update
};
