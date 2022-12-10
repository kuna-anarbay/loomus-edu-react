module.exports = {
    module: {
        rules: [{
            test: /\.less$/i, use: [// compiles Less to CSS
                "style-loader", "css-loader", {
                    loader: "less-loader", options: {
                        javascriptEnabled: true
                    }
                },],
        }],
    },
};
