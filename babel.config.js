const config = {
    "presets": ["@babel/env", "@babel/preset-react"],
    "env": {
        "test": {
            "plugins": [
                "transform-es2015-modules-commonjs",
                "dynamic-import-node",
                "@babel/plugin-proposal-object-rest-spread"
            ]
        }
    },
    "plugins": [
        "transform-es2015-modules-commonjs",
        "transform-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
    ]
};

module.exports = config;
