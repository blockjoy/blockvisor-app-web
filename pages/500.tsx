import { Button, Logo, QuoteBlock } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { typo, fluid } from 'styles/utils.typography.styles';
import { notFoundPage } from 'styles/utils.page';
import { useEffect } from 'react';

export default function Custom500() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <main css={[notFoundPage]}>
      <QuoteBlock>
        <figure css={[spacing.bottom.large]}>
          <Logo type="blockjoy-large" />
        </figure>
        <h2
          css={[
            typo.uppercase,
            spacing.bottom.xxLarge,
            fluid.huge,
            spacing.bottom.xxLarge,
          ]}
        >
          <strong>500</strong>
          <br />
          <strong> Unexpected Error </strong>
        </h2>
        <p css={[fluid.large, spacing.bottom.large]}>
          Uh-oh something went wrong.
        </p>
        <Button href={ROUTES.LOGIN} style="primary">
          Return home
        </Button>
      </QuoteBlock>
    </main>
  );
}
