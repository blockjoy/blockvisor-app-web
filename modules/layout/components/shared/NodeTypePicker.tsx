import { css } from '@emotion/react';
import { FC } from 'react';
import { nodeTypeList } from 'shared/constants/lookups';
import { useFormContext } from 'react-hook-form';
import { InputLabel } from '@shared/components/Input/InputLabel';
import { ITheme } from 'types/theme';

type Props = {
  name: string;
  label: string;
};

const styles = {
  list: css`
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(3, 1fr);
    padding-top: 8px;
    margin-bottom: 20px;
  `,
  input: (theme: ITheme) => css`
    position: absolute;
    transform: scale(0);

    &:checked ~ label {
      border-color: ${theme.colorPrimary};
    }
  `,
  radioLabel: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    height: 44px;
    border-radius: 4px;
    background: ${theme.colorActive};
    border: 1px solid transparent;
    cursor: pointer;
  `,
  radioLabelText: css`
    display: block;
    font-size: 12px;
  `,
};

export const NodeTypePicker: FC<Props> = ({ name, label }) => {
  const { register } = useFormContext();

  return (
    <>
      <InputLabel name={name} labelSize="small">
        {label || name}
      </InputLabel>
      <ul css={styles.list}>
        {nodeTypeList.map(
          (type, index) =>
            index !== 0 && (
              <li key={type.id}>
                <>
                  <input
                    {...register(name)}
                    css={styles.input}
                    id={type.name}
                    type="radio"
                    value={type.id}
                  />
                  <label htmlFor={type.name} css={styles.radioLabel}>
                    <span css={styles.radioLabelText}>{type.name}</span>
                  </label>
                </>
              </li>
            ),
        )}
      </ul>
    </>
  );
};
