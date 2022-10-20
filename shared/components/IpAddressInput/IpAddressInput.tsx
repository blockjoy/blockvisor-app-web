import Cleave from 'cleave.js/react';
import { FC } from 'react';

type Props = {
  onChange: VoidFunction;
  placeholder: string;
};

export const IpAddressInput: FC<Props> = ({ onChange, placeholder }) => {
  return (
    <Cleave
      placeholder={placeholder}
      options={{ delimiter: '·', blocks: [3, 3, 3], uppercase: true }}
      onChange={onChange}
    />
  );
};
