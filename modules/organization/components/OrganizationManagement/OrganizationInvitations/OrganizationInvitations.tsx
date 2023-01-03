import { useIdentityRepository } from '@modules/auth';
import { organizationAtoms, useInvitations } from '@modules/organization';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './OrganizationInvitations.styles';

const tabs = [
  {
    name: 'Sent',
    alerts: 0,
  },
  {
    name: 'Received',
    alerts: 0,
  },
];

export const OrganizationInvitations = () => {
  const repository = useIdentityRepository();
  const userId = repository?.getIdentity()?.id;

  const [activeTab, setActiveTab] = useState<number>(0);

  const organizationSentInvitations = useRecoilValue(
    organizationAtoms.organizationSentInvitations,
  );

  const organizationReceivedInvitations = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

  const { getReceivedInvitations, getSentInvitations } = useInvitations();

  const handleTabClicked = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    getSentInvitations(userId!);
    getReceivedInvitations(userId!);
  }, []);

  return (
    <div css={styles.wrapper}>
      <div css={styles.tabHeader}>
        {tabs?.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => handleTabClicked(index)}
            css={[
              styles.tabButton,
              index === activeTab && styles.tabButtonActive,
            ]}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div css={styles.tabWrapper}>
        <div
          css={styles.tabInner}
          style={{
            translate: `${activeTab === 0 ? 0 : `-${activeTab * 440}px`}`,
          }}
        >
          <div css={styles.tab}>Sent</div>
          <div css={styles.tab}>Received</div>
        </div>
      </div>
    </div>
  );
};
