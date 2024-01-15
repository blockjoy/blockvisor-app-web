import { formatters } from '@shared/utils/formatters';

type Props = {
  date: Date;
};

export const DateTime = ({ date }: Props) => {
  return (
    <p>{`${formatters.formatDate(date!)} @ ${formatters.formatDate(
      date!,
      'time',
    )}`}</p>
  );
};
