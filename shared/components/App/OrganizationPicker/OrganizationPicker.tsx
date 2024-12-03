import { useRecoilValue } from 'recoil';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { ROUTES } from '@shared/constants/routes';
import {
  SvgIcon,
  Badge,
  withSearchDropdown,
  Dropdown,
} from '@shared/components';
import {
  useSwitchOrganization,
  organizationSelectors,
} from '@modules/organization';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { styles } from './OrganizationPicker.styles';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconArrow from '@public/assets/icons/common/ChevronDown.svg';

type Props = {
  isRightAligned?: boolean;
  maxWidth?: string;
};

export const OrganizationPicker = ({
  isRightAligned = false,
  maxWidth,
}: Props) => {
  const selectedOrg = useRef<Org>();

  const router = useRouter();
  const { pathname } = router;
  const { id } = router.query;

  const allOrganizations = useRecoilValue(
    organizationSelectors.allOrganizationsSorted,
  );
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const [isOpen, setIsOpen] = useState(false);

  const { switchOrganization } = useSwitchOrganization();

  const handleChange = async (nextOrg: Org | null) => {
    if (!nextOrg) return;
    await switchOrganization(nextOrg.orgId, nextOrg.name);

    selectedOrg.current = allOrganizations.find(
      (org) => org.orgId === nextOrg?.orgId,
    )!;

    setIsOpen(false);

    if (!id) return;

    switch (true) {
      case pathname.includes('nodes'):
        router.push(ROUTES.NODES);
        break;
      case pathname.includes('hosts'):
        router.push(ROUTES.HOSTS);
        break;
    }
  };

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  useEffect(() => {
    if (defaultOrganization?.orgId && allOrganizations?.length) {
      selectedOrg.current = allOrganizations.find(
        (org) => org.orgId === defaultOrganization?.orgId,
      )!;
    }
  }, [defaultOrganization?.orgId, allOrganizations]);

  const OrgSelectDropdown = useMemo(
    () => withSearchDropdown<Org>(Dropdown),
    [allOrganizations],
  );

  return (
    <OrgSelectDropdown
      items={allOrganizations}
      idKey="orgId"
      selectedItem={selectedOrg.current!}
      handleSelected={handleChange}
      isOpen={isOpen}
      handleOpen={handleOpen}
      isLoading={false}
      size="small"
      dropdownButtonStyles={[styles.select]}
      dropdownMenuStyles={[styles.dropdown(isRightAligned)]}
      hideDropdownIcon
      noBottomMargin
      hideSearch={allOrganizations.length < 25}
      checkDisabledItem={(org?: Org) =>
        org?.orgId === selectedOrg.current?.orgId
      }
      renderItem={(org: Org) =>
        org.orgId === selectedOrg.current?.orgId ? (
          <div css={styles.activeOrg}>
            <p css={styles.orgText}>{escapeHtml(defaultOrganization?.name!)}</p>
            <Badge color="primary" style="outline">
              Current
            </Badge>
          </div>
        ) : (
          <p css={styles.orgText}>{org.name}</p>
        )
      }
      renderButtonText={
        <>
          <SvgIcon isDefaultColor size="16px">
            <IconOrganization />
          </SvgIcon>
          <p css={styles.selectText(maxWidth)}>
            {escapeHtml(defaultOrganization?.name!)}
          </p>
          {allOrganizations.length > 1 && (
            <span css={[styles.icon, isOpen && styles.iconActive]}>
              <SvgIcon isDefaultColor size="11px">
                <IconArrow />
              </SvgIcon>
            </span>
          )}
        </>
      }
      renderHeader={<h2 css={styles.header}>Your Organizations</h2>}
    />
  );
};
