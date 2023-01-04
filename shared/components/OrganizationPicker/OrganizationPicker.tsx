import { ChangeEvent, useState, useEffect } from 'react';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';

import SizedIcon from '@modules/layout/components/shared/SizedIcon';

import { Button } from '@shared/components';
import { styles } from './OrganizationPicker.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { authAtoms } from '@modules/auth';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useSetDefaultOrganization } from '@modules/organization/hooks/useSetDefaultOrganization';
import { useDefaultOrganization } from '@modules/organization';

type Props = {
  hideName?: boolean;
  hiddenOnDesktop?: boolean;
};

export const OrganizationPicker: React.FC<Props> = ({
  hideName,
  hiddenOnDesktop,
}) => {
  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);

  const { getDefaultOrganization, defaultOrganization } =
    useDefaultOrganization();

  const [value, setValue] = useState<string>(defaultOrganization?.id!);

  const { setDefaultOrganization } = useSetDefaultOrganization();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log('handleChange', e.target.value, e.target.selectedIndex);
    localStorage.removeItem('nodeFilters');
    setValue(e.target.value);
    setDefaultOrganization(
      e.target.value,
      allOrganizations[e.target.selectedIndex].name!,
    );
    window.location.reload();
  };

  useEffect(() => {
    getDefaultOrganization();
  }, []);

  useEffect(() => {
    if (defaultOrganization?.id) {
      setValue(defaultOrganization.id);
    }
  }, [defaultOrganization?.id]);

  console.log('value', value);

  return (
    <div css={[styles.wrapper]}>
      <select
        css={styles.select}
        defaultValue={value}
        value={value}
        onChange={handleChange}
      >
        {allOrganizations?.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
      <span css={styles.icon}>
        <IconArrow />
      </span>
    </div>
  );
};
