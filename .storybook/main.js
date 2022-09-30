module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-next'
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

        return config;
    }
}