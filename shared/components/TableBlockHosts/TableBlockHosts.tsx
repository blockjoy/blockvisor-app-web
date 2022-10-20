import { styles } from './TableBlockHosts.styles';

type Props = {
  address: string;
  location: string;
  name: string;
};

export function TableBlockHosts({ name, location, address }: Props) {
  return (
    <span css={styles.wrapper}>
      <span css={styles.name} className="has-hover-color">
        <span css={styles.nameText}>{name}</span>
        {name === 'Host Provisioning' && <span css={styles.spinner} />}
      </span>
      <span css={styles.row}>
        <span css={styles.location}>{location}</span>
        <span css={styles.address}>{address}</span>
      </span>
    </span>
  );
}
