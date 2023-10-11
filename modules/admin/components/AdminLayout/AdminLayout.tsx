import { PageTitle } from '@shared/components';
import { PropsWithChildren } from 'react';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './AdminLayout.styles';
import NextLink from 'next/link';
import IconCog from '@public/assets/icons/common/Cog.svg';

export const AdminLayout = ({ children }: PropsWithChildren) => {
  <>
    <PageTitle hideOrgPicker title="Admin" icon={<IconCog />} />
    <div css={[styles.wrapper, wrapper.main]}>
      <aside>
        <NextLink href="/admin/users">Users</NextLink>
      </aside>
      <section>{children}</section>
    </div>
  </>;
};
