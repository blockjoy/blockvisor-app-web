import { styles } from './Faq.styles';
import { PageSection, PageTitle } from '@shared/components';
import { Fragment } from 'react';

const faq = [
  {
    title: 'How do I launch a Node?',
    answer:
      'You can easily create a new node by clicking the Launch Node button in the top right corner. You then just need to select a protocol, enter any configuration settings and click Launch Node.',
  },
];

export const Faq = () => {
  return (
    <>
      <PageTitle title="FAQ" />
      <PageSection>
        <div css={styles.wrapper}>
          <header css={styles.header}>Frequently Asked Questions</header>
        </div>
        <div css={styles.questionList}>
          {faq?.map((question) => (
            <Fragment key={question.title}>
              <h3 css={styles.questionTitle}>{question.title}</h3>
              <p css={styles.questionAnswer}>{question.answer}</p>
            </Fragment>
          ))}
        </div>
      </PageSection>
    </>
  );
};
