import { Layout } from '@shared/components';
import type { NextPage } from 'next';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { AppLayout } from '@modules/layout';
import { SupportView } from '@modules/support';

const Support = () => {
  return <SupportView />;
};

Support.getLayout = function getLayout(page: any) {
  return <AppLayout breadcrumb={['Support']}>{page}</AppLayout>;
};

export default Support;
