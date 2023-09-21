import { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownItem,
  SvgIcon,
  Scrollbar,
  Badge,
} from '@shared/components';
import { styles } from './OrganizationPicker.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { escapeHtml } from '@shared/utils/escapeHtml';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconArrow from '@public/assets/icons/common/ArrowDown.svg';

type Props = {
  isRightAligned?: boolean;
  maxWidth?: string;
};

export const OrganizationPicker = ({
  isRightAligned = false,
  maxWidth,
}: Props) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const allOrganizations = useRecoilValue(
    organizationAtoms.allOrganizationsSorted,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setIsSidebarOpen = useSetRecoilState(sidebarOpen);

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const { switchOrganization } = useSwitchOrganization();

  const handleClick = () => setIsOpen(!isOpen);
  const handleClickOutside = () => setIsOpen(false);

  const handleChange = async (orgId?: string, orgName?: string) => {
    if (orgId && orgName && orgId !== defaultOrganization?.id) {
      await switchOrganization(orgId, orgName);
      setIsOpen(false);
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <button css={styles.select} onClick={handleClick}>
        <SvgIcon isDefaultColor size="16px">
          <IconOrganization />
        </SvgIcon>
        <p css={styles.selectText(maxWidth)}>
          {escapeHtml(defaultOrganization?.name!)}
        </p>
      </button>
      <DropdownMenu
        isOpen={isOpen}
        additionalStyles={styles.dropdown(isRightAligned)}
      >
        <h2 css={styles.header}>Your Organizations</h2>
        <div css={styles.activeOrg}>
          <p css={styles.orgText}>{escapeHtml(defaultOrganization?.name!)}</p>
          <Badge color="primary" style="outline">
            Current
          </Badge>
        </div>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul>
            {allOrganizations
              ?.filter((org) => org.id !== defaultOrganization?.id)
              ?.map((org) => (
                <li key={org.id}>
                  <DropdownItem
                    size="medium"
                    type="button"
                    onButtonClick={() => handleChange(org.id, org.name)}
                  >
                    <p css={styles.orgText}>{escapeHtml(org.name!)}</p>
                  </DropdownItem>
                </li>
              ))}
          </ul>
        </Scrollbar>
      </DropdownMenu>
      <span css={[styles.icon, isOpen && styles.iconActive]}>
        <SvgIcon isDefaultColor size="11px">
          <IconArrow />
        </SvgIcon>
      </span>
    </div>
  );
};
