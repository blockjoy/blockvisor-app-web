import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import { wrapperStyles, controlStyles } from './formStyles';

import { FormLabel } from './FormLabel';

import IconArrowDown from '@public/assets/icons/arrow-down-10.svg';

const StyledWrapper = styled.div`
  ${wrapperStyles}
`;

const StyledSelect = styled.select`
  ${(p) => controlStyles(p.theme)};
`;

const StyledIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export type SelectItem = {
  name: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  items?: SelectItem[];
  defaultValue?: string;
};

const defaultItems: SelectItem[] = [
  { name: 'Test 1', value: '1' },
  { name: 'Test 2', value: '2' },
];

export const FormSelect: React.FC<Props> = ({
  name,
  label,
  items = defaultItems,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <StyledWrapper>
        <StyledSelect {...register(name)}>
          {items.map((item) => (
            <option key={item.name} value={item.value}>
              {item.name}
            </option>
          ))}
        </StyledSelect>
        <StyledIcon>
          <IconArrowDown />
        </StyledIcon>
      </StyledWrapper>
    </div>
  );
};
