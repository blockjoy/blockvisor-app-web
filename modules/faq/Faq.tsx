import { styles } from './Faq.styles';
import { EmptyColumn, PageSection, PageTitle } from '@shared/components';
import { Fragment } from 'react';
import { readMarkdown } from 'utils/readMarkdown';
import IconChat from '@public/assets/icons/common/Chat.svg';

export type FaqProps = {
  faqs: FAQ[];
};

export const Faq = ({ faqs }: FaqProps) => {
  return (
    <>
      <PageTitle hideOrgPicker title="FAQ" icon={<IconChat />} />
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
            {faqs?.map((faq: FAQ) => {
              const content = readMarkdown(faq.content!);

              return (
                <Fragment key={faq.article_id}>
                  <h3 css={styles.questionTitle}>{faq.title}</h3>
                  <div
                    css={styles.questionAnswer}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </Fragment>
              );
            })}
          </div>
        )}
      </PageSection>
    </>
  );
};
