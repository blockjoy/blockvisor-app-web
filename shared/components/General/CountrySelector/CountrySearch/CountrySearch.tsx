import { forwardRef, Ref } from 'react';
import { styles } from './CountrySearch.styles';

type CountrySearchProps = {
  handleChange: any;
};

export const CountrySearch = forwardRef(
  ({ handleChange }: CountrySearchProps, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        css={[styles.input]}
        name="country-search"
        type="text"
        placeholder="Search for a country..."
        onChange={(e: any) => handleChange(e)}
      />
    );
  },
);
