import { css } from '@emotion/css';

export const flex = {
  display: {
    flex: css`
      display: flex;
    `,
    inline: css`
      display: inline-flex;
    `,
  },

  direction: {
    row: css`
      flex-direction: row;
    `,

    rowReverse: css`
      flex-direction: row-reverse;
    `,

    column: css`
      flex-direction: column;
    `,

    columnReverse: css`
      flex-direction: column-reverse;
    `,
  },

  wrap: {
    wrap: css`
      flex-wrap: wrap;
    `,

    noWrap: css`
      flex-wrap: nowrap;
    `,

    wrapReverse: css`
      flex-wrap: wrap-reverse;
    `,
  },

  justify: {
    start: css`
      justify-content: flex-start;
    `,

    end: css`
      justify-content: flex-end;
    `,

    center: css`
      justify-content: center;
    `,

    between: css`
      justify-content: space-between;
    `,

    around: css`
      justify-content: space-around;
    `,
  },

  align: {
    start: css`
      align-items: flex-start;
    `,

    end: css`
      align-items: flex-end;
    `,

    center: css`
      align-items: center;
    `,

    stretch: css`
      align-items: stretch;
    `,

    baseline: css`
      align-items: baseline;
    `,
  },

  grow: {
    g1: css`
      flex-grow: 1;
    `,

    g2: css`
      flex-grow: 2;
    `,

    g3: css`
      flex-grow: 3;
    `,

    g4: css`
      flex-grow: 4;
    `,

    g5: css`
      flex-grow: 5;
    `,

    g6: css`
      flex-grow: 6;
    `,
  },
  shrink: {
    s1: css`
      flex-shrink: 1;
    `,

    s2: css`
      flex-shrink: 2;
    `,

    s3: css`
      flex-shrink: 3;
    `,

    s4: css`
      flex-shrink: 4;
    `,

    s5: css`
      flex-shrink: 5;
    `,

    s6: css`
      flex-shrink: 6;
    `,
  },

  basis: {
    b0: css`
      flex-basis: 0%;
    `,

    b25: css`
      flex-basis: 25%;
    `,

    b50: css`
      flex-basis: 50%;
    `,

    b75: css`
      flex-basis: 75%;
    `,

    b100: css`
      flex-basis: 100%;
    `,
  },

  order: {
    o1: css`
      order: 1;
    `,

    o2: css`
      order: 2;
    `,

    o3: css`
      order: 3;
    `,

    o4: css`
      order: 4;
    `,

    o5: css`
      order: 5;
    `,

    o6: css`
      order: 6;
    `,

    o7: css`
      order: 7;
    `,

    o8: css`
      order: 8;
    `,

    o9: css`
      order: 9;
    `,

    o10: css`
      order: 10;
    `,

    o11: css`
      order: 11;
    `,

    o12: css`
      order: 12;
    `,

    first: css`
      order: -9999;
    `,

    last: css`
      order: 9999;
    `,
  },
};
