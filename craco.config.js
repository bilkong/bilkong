const path = require("path");
const CracoLess = require("craco-less");

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        devServer: {
            open: false,
        },
    },
    plugins: [
        {
            plugin: CracoLess,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
