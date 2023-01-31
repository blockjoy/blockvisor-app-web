import { styles } from './Faq.styles';
import { EmptyColumn, PageSection, PageTitle } from '@shared/components';
import { Fragment } from 'react';

export type FaqProps = {
  faqs: FAQ[];
};

export const Faq = ({ faqs }: FaqProps) => {
  return (
    <>
      <PageTitle title="FAQ" />
      <PageSection>
        <div css={styles.wrapper}>
          <header css={styles.header}>Frequently Asked Questions</header>
        </div>
        {!faqs || !faqs.length ? (
          <EmptyColumn
            title="FAQs Not Found"
            description="Error encountered while retrieving FAQs. Please refresh the page."
          />
        ) : (
          <div css={styles.questionList}>
            {faqs?.map((faq: FAQ) => (
              <Fragment key={faq.article_id}>
                <h3 css={styles.questionTitle}>{faq.title}</h3>
                <p css={styles.questionAnswer}>{faq.content}</p>
              </Fragment>
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
};
