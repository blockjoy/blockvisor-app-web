/**
 * Breakpoint values without @media tags
 */

export const breakpoints = {
  fromTny: 'screen and (min-width: 360px)',
  toTny: 'screen and (max-width: 359px)',
  fromSml: 'screen and (min-width: 568px)',
  toSml: 'screen and (max-width: 567px)',
  fromMed: 'screen and (min-width: 768px)',
  toMed: 'screen and (max-width: 767px)',
  fromLrg: 'screen and (min-width: 880px)',
  toLrg: 'screen and (max-width: 879px)',
  fromXLrg: 'screen and (min-width: 1200px)',
  toXlrg: 'screen and (max-width: 1199px)',
  fromHuge: 'screen and (min-width: 1360px)',
  toHuge: 'screen and (max-width: 1359px)',
  fromXHuge: 'screen and (min-width: 2000px)',
  toXHuge: 'screen and (max-width: 1999px)',
};

/**
 * Wrappers
 */

/**
 * Spacing - margins, paddings, grid gaps
 */
export const spacing = {
  tny: 'calc(var(--unit) * 2)',
  sml: 'calc(var(--unit) * 4)',
  med: 'calc(var(--unit) * 6)',
  lrg: 'calc(var(--unit) * 8)',
  xlrg: 'calc(var(--unit) * 10)',
  xxlrg: 'calc(var(--unit) * 12)',
  xxxlrg: 'calc(var(--unit) * 15)',
  huge: 'calc(var(--unit) * 16)',
  xHuge: 'calc(var(--unit) * 17)',
};

export const pageGrid = [
  {
    template: { column: 'auto', row: 'auto' },
    gap: { column: 32 },
  },
  {
    mediaMinWidth: 'toSml',
    template: { column: 'repeat(6, 1fr)', row: 'auto' },
    gap: { column: 16 },
  },
  {
    mediaMinWidth: 'fromSml',
    template: { column: 'repeat(12, 1fr)', row: 'auto' },
    gap: { column: 32 },
  },
];
/**
 * Additional grids - component
 */
export const componentGrids = {
  cardGrid: [
    {
      cols: 2,
      gap: { column: 12, row: 12 },
    },
    {
      mediaMinWidth: 'medium',
      cols: 3,
      gap: { row: 16, column: 16 },
    },
    {
      mediaMinWidth: 'large',
      cols: 4,
      gap: { row: 12, column: 12 },
    },
  ],

  cardLayout: [
    {
      template: { row: '300px auto' },
      gap: { row: 24 },
    },
    {
      mediaMinWidth: 'medium',
      template: { column: '300px auto' },
      gap: { column: 32 },
    },
  ],
};

export const customPalette = {};
