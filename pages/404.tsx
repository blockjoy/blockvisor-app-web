import { Button, Logo, QuoteBlock } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { spacing } from 'styles/utils.spacing.styles';
import { typo, fluid } from 'styles/utils.typography.styles';
import { notFoundPage } from 'styles/utils.page';

export default function NotFound() {
  return (
    <main>
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
          <strong>404</strong>
          <br />
          <strong> Page Not Found </strong>
        </h2>
        <p css={[fluid.large, spacing.bottom.large]}>
          This page might be missing or is no longer active.
        </p>
        <Button href={ROUTES.LOGIN} style="primary">
          Return home
        </Button>
      </QuoteBlock>
    </main>
  );
}
