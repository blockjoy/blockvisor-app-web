module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-next',
        "storybook-addon-next-router"
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5'
    },
    features: {
        emotionAlias: false,
    },
    webpackFinal: async config => {
        config.module.rules[0].use[0].options.presets = [
            require.resolve('@emotion/babel-preset-css-prop')
        ];

        const filesRule = config.module.rules.find((r) => r.test.test(".svg"));
        filesRule.exclude = /\.svg$/;

        // We push the new loader, as usual
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            }
        )
        return config;

    }
}