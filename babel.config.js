module.exports = {
    presets: ["next/babel"],
    plugins: [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": false
            }
        ],
        [
            "@babel/plugin-transform-runtime"
        ]
    ]
}
