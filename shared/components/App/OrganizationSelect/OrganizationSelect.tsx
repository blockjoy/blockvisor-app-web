import { FC, useState } from 'react';
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Scrollbar,
  DropdownWrapper,
} from '@shared/components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { sidebarOpen } from '@modules/layout/store/layoutAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { isMobile } from 'react-device-detect';
import { escapeHtml } from '@shared/utils/escapeHtml';
import IconPlus from '@public/assets/icons/plus-12.svg';
import { styles } from './OrganizationSelect.styles';

type Props = {
  hideName?: boolean;
};

export const OrganizationSelect: FC<Props> = ({ hideName }) => {
  const router = useRouter();

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

  const handleChange = async (orgId?: string, orgName?: string) => {
    if (orgId && orgName && orgId !== defaultOrganization?.id) {
      await switchOrganization(orgId, orgName);
      setIsOpen(false);
    }
  };

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
    <DropdownWrapper
      isEmpty={true}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownButton
        text={<p>{escapeHtml(defaultOrganization?.name!)}</p>}
        onClick={handleClick}
        isOpen={isOpen}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
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
    </DropdownWrapper>
  );
};
