import { css } from '@emotion/react';
import { FC } from 'react';
import { nodeTypeList } from 'shared/constants/lookups';
import { InputLabel } from '@shared/components/Input/InputLabel';
import { ITheme } from 'types/theme';

type Props = {
  supportedNodeTypes?: number[];
  activeNodeType?: number;
  onChange: (args1: number) => void;
};

const styles = {
  list: css`
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    padding-top: 2px;
    margin-bottom: 24px;
  `,
  button: (isActive: boolean) => (theme: ITheme) =>
    css`
      display: grid;
      place-items: center;
      height: 44px;
      width: 100%;
      border-radius: 4px;
      background: var(--color-text-5-o3);
      color: ${theme.colorText};
      font-size: 12px;
      border: 1px solid transparent;
      cursor: pointer;

      ${isActive &&
      css`
        border-color: ${theme.colorPrimary};
      `};
    `,
};

export const NodeTypePicker: FC<Props> = ({
  supportedNodeTypes = [1],
  onChange,
  activeNodeType,
}) => {
  const handleChange = (nodeType: number) => {
    onChange(nodeType);
  };

  return (
    <ul css={styles.list}>
      {nodeTypeList.map(
        (type, index) =>
          index !== 0 &&
          supportedNodeTypes?.includes(type.id) && (
            <li key={type.id}>
              <button
                type="button"
                onClick={() => handleChange(type.id)}
                css={styles.button(activeNodeType === type.id)}
              >
                {type.name}
              </button>
            </li>
          ),
      )}
    </ul>
  );
};
