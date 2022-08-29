import { ReactNode } from 'react';
import {
  quoteBlock,
  quoteBlockContent,
  quoteBlockAuthor,
  quoteBlockRole,
} from './QuoteBlock.styles';
import { containers } from 'styles/containers.styles';
import { typo } from 'styles/utils.typography.styles';
import { grid } from 'styles/grid.styles';

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
        css={[containers.large, containers.main, grid.base, grid.smallOnly]}
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
