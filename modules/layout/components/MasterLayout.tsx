import { ReactNode, Suspense, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtoms, useRefreshToken, useUserSettings } from '@modules/auth';
import {
  organizationSelectors,
  useGetOrganizations,
} from '@modules/organization';
import { usePermissions } from '@modules/auth';
import { usePageVisibility } from '@shared/index';
import { LoadingSpinner } from '@shared/components';

export type MasterLayoutProps = {
  children: ReactNode;
};

export const MasterLayout = ({ children }: MasterLayoutProps) => {
  const userSettings = useRecoilValue(authAtoms.userSettings);
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const { refreshToken, removeRefreshTokenCall } = useRefreshToken();
  const { getOrganizations, organizations } = useGetOrganizations();

  usePageVisibility({
    onVisible: refreshToken,
  });

  useUserSettings();
  usePermissions();

  useEffect(() => {
    refreshToken();

    return () => {
      removeRefreshTokenCall();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!userSettings) return;

      if (!organizations.length) await getOrganizations(true);
    })();
  }, [userSettings]);

  return (
    <Suspense fallback={<LoadingSpinner size="page" />}>
      {defaultOrganization?.id && children}
    </Suspense>
  );
};
