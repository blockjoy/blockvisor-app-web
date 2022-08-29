import { ReactNode } from 'react';
import {
  quoteBlock,
  quoteBlockContent,
  quoteBlockAuthor,
  quoteBlockRole,
} from './QuoteBlock.styles';
import { containers } from 'styles/containers.styles';
import { grid, gridSpacingSmallOnly } from 'styles/grid.styles';
import { typo } from 'styles/utils.typography.styles';

type Props = {
  children?: ReactNode;
  author?: string;
  role?: string;
  authorImage?: ReactNode;
};

export function QuoteBlock({ children, author, role, authorImage }: Props) {
  return (
    <section css={[quoteBlock]}>
      <article
        css={[containers.large, containers.main, grid, gridSpacingSmallOnly]}
      >
        <div css={[quoteBlockContent, typo.medium]}>
          {children}
          {author && (
            <figure css={[quoteBlockAuthor, typo.small]}>
              {authorImage}
              <figcaption>
                <div>{author}</div>
                <div css={[quoteBlockRole]}>{role}</div>
              </figcaption>
            </figure>
          )}
        </div>
      </article>
    </section>
  );
}
