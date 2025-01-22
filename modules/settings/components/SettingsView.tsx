import { useEffect } from 'react';
import { PageTitle } from '@shared/components';
import { ApiKeys, useApiKeys } from '@modules/settings';
import { wrapper } from 'styles/wrapper.styles';
import IconCog from '@public/assets/icons/common/Cog.svg';

export const SettingsView = () => {
  const { listApiKeys } = useApiKeys();

  useEffect(() => {
    listApiKeys();
  }, []);
  return (
    <>
      <PageTitle hideOrgPicker title="Settings" icon={<IconCog />} />
      <section css={wrapper.main}>
        <ApiKeys />
      </section>
    </>
  );
};
