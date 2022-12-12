import React from 'react';
import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12
import { Global } from '@emotion/react';
import { globalStyles } from 'styles/global.styles';

export const parameters = {
    nextRouter: {
        Provider: RouterContext.Provider,
    },
}

export const decorators = [
    (Story) => (
        <>
            <Global styles={globalStyles} />
            <Story />
        </>
    ),
];