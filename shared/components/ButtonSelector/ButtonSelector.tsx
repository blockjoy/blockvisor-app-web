import { MouseEventHandler, ReactNode } from 'react';
import {
  buttonSelector,
  buttonSelectorLabel,
  buttonSelectorTitle,
  buttonSelectorList,
  buttonSelectorInput,
} from './ButtonSelector.styles';
import { typo } from 'styles/utils.typography.styles';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';

type ButtonOption = {
  value: string;
  label: string;
  checked: boolean;
};

type Props = {
  children?: ReactNode;
  options: ButtonOption[];
  name: string;
  id: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

export function ButtonSelector({
  children,
  options,
  name,
  id,
  onClick,
}: Props) {
  return (
    Boolean(options.length) && (
      <div css={[buttonSelector]} role="radiogroup" aria-labelledby={id}>
        <span
          css={[typo.uppercase, typo.microlabel, buttonSelectorTitle]}
          id={id}
        >
          {children}
        </span>
        <ul css={[reset.list, buttonSelectorList]}>
          {options.map(({ label, value, checked }) => (
            <li>
              <input
                css={[display.visuallyHidden, buttonSelectorInput]}
                type="radio"
                id={value}
                name={name}
                value={value}
                checked={checked}
                onClick={onClick}
              />
              <label css={[buttonSelectorLabel]} htmlFor={value}>
                {label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
