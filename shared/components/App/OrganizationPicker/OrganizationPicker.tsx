import { FC, useRef, useState } from 'react';
import IconArrow from '@public/assets/icons/common/ArrowRight.svg';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconInfo from '@public/assets/icons/common/Info.svg';
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  SvgIcon,
  Scrollbar,
} from '@shared/components';
import { styles } from './OrganizationPicker.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { isMobile } from 'react-device-detect';
import { escapeHtml } from '@shared/utils/escapeHtml';

type Props = {
  hideName?: boolean;
};

export const OrganizationPicker: FC<Props> = ({ hideName }) => {
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

  const handleCreateClicked = () => {
    setIsOpen(false);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    router.push({
      pathname: ROUTES.ORGANIZATIONS,
      query: { add: true },
    });
  };

  return (
    <div
      css={[styles.wrapper, hideName && styles.wrapperNameHidden]}
      ref={dropdownRef}
    >
      <button css={styles.select} onClick={handleClick}>
        <span css={styles.bubble}>
          {escapeHtml(defaultOrganization?.name?.toUpperCase()!)?.substring(
            0,
            1,
          )}
        </span>
        {!hideName && (
          <p css={styles.selectText}>
            {escapeHtml(defaultOrganization?.name!)}
          </p>
        )}
      </button>
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <header css={styles.header}>
          <h2>Your Organizations</h2>
          <SvgIcon tooltip="View and launch nodes from your organizations">
            <IconInfo />
          </SvgIcon>
        </header>
        <ul>
          <li>
            <DropdownItem
              additionalStyles={[styles.activeOrganization]}
              size="medium"
              type="button"
            >
              <p css={styles.activeOrg}>
                {escapeHtml(defaultOrganization?.name!)}
              </p>
              <Badge color="primary" style="outline">
                Active
              </Badge>
            </DropdownItem>
          </li>
        </ul>
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
                    <p css={styles.activeOrg}>{escapeHtml(org.name!)}</p>
                  </DropdownItem>
                </li>
              ))}
          </ul>
        </Scrollbar>
        <button css={[styles.createButton]} onClick={handleCreateClicked}>
          <IconPlus /> Add Organization
        </button>
      </DropdownMenu>
      <span css={[styles.icon, isOpen && styles.iconActive]}>
        <IconArrow />
      </span>
    </div>
  );
};
