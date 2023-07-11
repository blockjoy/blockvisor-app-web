import { FC, useState } from 'react';
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Scrollbar,
  DropdownWrapper,
  TableAdd,
} from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { useRouter } from 'next/router';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { styles } from './OrganizationSelect.styles';
import {
  useCreateOrganization,
  useGetOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { toast } from 'react-toastify';

type Props = {
  hideName?: boolean;
};

export const OrganizationSelect: FC<Props> = ({ hideName }) => {
  const router = useRouter();

  const allOrganizations = useRecoilValue(
    organizationAtoms.allOrganizationsSorted,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createOrganization = useCreateOrganization();
  const { addToOrganizations } = useGetOrganizations();
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

  const handleCreate = async (name: string) => {
    try {
      setIsLoading(true);
      await createOrganization(name, async (org: Org) => {
        addToOrganizations(org);
        switchOrganization(org.id, name);
      });
    } catch (error) {
      if (error instanceof ApplicationError) toast.error(error.message);
    } finally {
      setIsLoading(false);
      return true;
    }
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
        <footer css={styles.addOrg}>
          <TableAdd
            buttonText="Add"
            buttonWidth="60px"
            placeholder="Add Organization"
            placeholderFocused="Enter a name"
            onSubmit={async (email: string) => await handleCreate(email)}
            isLoading={isLoading}
          />
        </footer>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
