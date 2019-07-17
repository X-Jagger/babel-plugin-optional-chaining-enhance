module.exports = api => {
    api.cache(true);
    return {
        env: {
            test: {
                presets: [["@babel/env", { targets: { node: "current" } }]]
            }
        }
    };
};
