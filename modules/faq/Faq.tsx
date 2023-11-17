import { styles } from './Faq.styles';
import { EmptyColumn, PageSection, PageTitle } from '@shared/components';
import { Fragment } from 'react';
import { readMarkdown } from 'utils/readMarkdown';
import IconChat from '@public/assets/icons/common/Chat.svg';

const faqs = [
  {
    title: 'What is BlockJoy’s Mission?',
    text: 'Our mission is simply to help the proliferation of Web3. For this, we need infrastructure that is designed for Web3 and accessible for anyone to operate in a decentralized manner. If Amazon AWS is considered the infrastructure for Web 2.0, then we would like BlockJoy to be considered the infrastructure for Web3.',
  },
  {
    title: 'Why BlockJoy?',
    text: 'BlockJoy was originally the largest validator-as-a-service operator on the Helium network and operated over 50% of the Helium network’s validators at one point or another. When we started, we estimated that running equivalent performing validators on Amazon AWS was costing around $200/mo/validator compared to our operating costs of only $11/mo/validator. However, running a validators-as-a-service model didn’t feel right to us. Blockchains are meant to be resilient and the majority of this resilience comes from being decentralized. But many of our customers came to us because it was such a challenge to deploy their validators, to constantly keep them updated and to keep them performing well. We really didn’t think running your own validator should be that hard–in fact we wanted to encourage more people to run their own validators since that makes the overall network far more valuable. So we set about taking our platform and turning it into a tool that would allow anyone to easily deploy and manage any blockchain node anywhere in the world with a simple click of a button. And so here we are. Still a work in progress but today, using BlockJoy should be drop dead simple for companies and individuals to efficiently deploy and manage their own nodes. We hope this allows people to grow their projects and businesses and use BlockJoy as an infrastructure tool in place of traditional cloud providers.',
  },
  {
    title: 'How Does BlockJoy Work?',
    text: 'BlockJoy acts as an orchestration layer allowing customer nodes to run on bare metal servers in any data center or location the customer chooses. Customers can optionally run fully managed blockchain nodes and servers within BlockJoy’s data centers for convenience, however our services are designed to allow customers to run on any server and remain in full control of their own compute resources. We also make use of several patent pending technologies to make running nodes more efficient and to support on boarding new chains in days instead of months. <br /><br /> Stay tuned as we will be releasing a series of “deep dives” into how the underlying technology works.',
  },
  {
    title: 'How is BlockJoy Different?',
    text: 'We don’t know about you, but we’ve experienced and have seen a tremendous increase in the number of complaints regarding cloud costs. We and many others just don’t believe that the ever increasing cloud costs are worth it anymore. Traditional cloud providers came about to make it easier for developers to deploy and scale fast growing Web 2.0 applications. These systems make heavy use of virtualization, containerized services (e.g., docker & kubernetes). Typically, web services are designed to be “stateless” meaning that individual web servers can be started and killed without any kind of impact. These cloud infrastructures are designed more for horizontal scaling and are priced accordingly. However for Web3, blockchain nodes are very much stateful. They often require dedicated resources and are better suited for infrastructure that supports vertical scaling. In our opinion, heavy virtualized CPUs, virtualized networking layers, and virtualized storage systems all add latency that aren’t great for typical blockchain nodes. Furthermore, blockchain nodes, especially ones that are participating in Proof of Stake operations need even more focus on performance and reliability. BlockJoy’s platform has been designed from the ground up specifically for the use cases of Web3 infrastructure. Because of this, our UIs and APIs are far simpler to use, offer incredibly fast time-to-market for new protocols, and the costs are drastically reduced over traditional cloud providers.',
  },
  {
    title: 'Who is BlockJoy For?',
    text: 'While anyone can use our platform to deploy and manage their nodes, we are focused on large scale node operators who are running nodes for the core of their business and looking to reduce their cloud costs while supporting more protocols faster. We offer enterprise grade node deployment and management for Staking operators, Node operators, Blockchain API providers, Protocol Foundations, Protocol Investors, blockchain developers, and of course individuals.',
  },
  {
    title: 'What is BlockJoy?',
    text: 'BlockJoy is a Web3 infrastructure company allowing node operators to deploy and manage blockchain nodes on any infrastructure anywhere in the world. Because our platform is designed from the ground up specifically to support blockchain nodes, we are able to lower operational costs by up to 80% over traditional cloud providers. Our platform allows customers to run their nodes on bare metal servers, while giving them a cloud-like convenience without the cloud-like cost. Not to mention, our platform takes care of just about everything, making sure every node remains updated, online, and running at peak performance.',
  },
  {
    title: 'Do you support X protocol?',
    text: 'Although we currently testing nearly 25 protocols internally, we are limiting our Beta testing to a small number of protocols. We intend to add additional protocols during the Beta. Once we conclude Beta we expect to gave support for nearly 30 protocols.',
  },
];

export const Faq = () => {
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
              const content = readMarkdown(faq.text);

              return (
                <Fragment key={faq.title}>
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
