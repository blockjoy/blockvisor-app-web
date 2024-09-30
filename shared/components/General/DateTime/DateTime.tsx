import { formatters } from '@shared/utils/formatters';

type Props = {
  date: Date;
};

export const DateTime = ({ date }: Props) => {
  return (
    <>{`${formatters.formatDate(date!)} @ ${formatters.formatDate(
      date!,
      'time',
    )}`}</>
  );
};
