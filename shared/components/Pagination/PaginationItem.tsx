import { useRouter } from 'next/router';
import { FC } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { styles } from './Pagination.styles';

interface Props {
  type: 'first' | 'last' | 'page';
  number?: number;
  totalPages?: number;
  active?: boolean;
  disabled?: boolean;
}

export const PaginationItem: FC<Props> = ({
  type,
  number,
  active,
  disabled,
  totalPages,
}) => {
  const router = useRouter();

  function changePage() {
    let newPage = number;

    if (type === 'first') {
      newPage = 1;
    }

    if (type === 'last') {
      newPage = totalPages;
    }

    router.replace({
      query: { ...router.query, page: newPage },
    });
  }

  function renderContent() {
    if (type === 'first') {
      return '<';
    }

    if (type === 'last') {
      return '>';
    }

    return number;
  }

  return (
    <button
      onClick={changePage}
      css={[reset.button, styles.item, active && styles.active, disabled]}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};
