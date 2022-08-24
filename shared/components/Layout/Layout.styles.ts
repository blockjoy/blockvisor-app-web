import { css } from '@emotion/react';

const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px 12px;
`;

const layoutWrapper = css`
  opacity: 0;
  background-color: hsla(90, 29%, 97%, 0.03);
  border-radius: 8px;
  padding: 30px;

  @media (min-width: 35.5rem) {
    padding: 60px;
    width: 380px;
  }
`;

const layoutTitle = css`
  margin-top: 40px;
  margin-bottom: 24px;
`;

export { layout, layoutTitle, layoutWrapper };

/* .layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 24px 12px;

    &__wrapper {
      opacity: 0;
      background-color: theme(--color-text-5-o3);
      border-radius: 8px;
      padding: 30px;

      @media (--screen-medium-small) {
        padding: 60px;
        width: 380px;
      }
    }

    &__title {
      margin-top: 40px;
      margin-bottom: 24px;
    }
  } */
