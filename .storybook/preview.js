import React from 'react';
import { Global } from '@emotion/react';
import { globalStyles } from 'styles/global.styles';

export const decorators = [
    (Story) => (
        <>
            <Global styles={globalStyles} />
            <Story />
        </>
    ),
];