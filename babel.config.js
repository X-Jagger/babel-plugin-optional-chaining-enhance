module.exports = api => {
    api.cache(true);
    return {
        presets: ["@babel/env"],
        env: {
            test: {
                presets: [["@babel/env", { targets: { node: "current" } }]]
            }
        }
    };
};
