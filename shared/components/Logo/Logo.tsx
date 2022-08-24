import Image from 'next/image';
import {
  logo,
  logoLink,
  logoPrimary,
  logoLinkCentered,
  logoFaded,
} from './Logo.styles';

type IconType = 'blockvisor-small' | 'faded' | 'blockjoy-large';

type Props = {
  type?: IconType;
  centered?: boolean;
};

export function Logo({ type = 'blockvisor-small', centered = false }: Props) {
  const renderIcon = (type: IconType) => {
    switch (type) {
      case 'blockjoy-large':
        return (
          <>
            <span className="visually-hidden">BlockJoy</span>
            <Image src="/blockjoy-logo-large.svg" />
          </>
        );
      case 'faded':
        return (
          <span css={[logoFaded]}>
            <Image src="/lockjoy-logo-small.svg" />
          </span>
        );

      default:
        return (
          <span css={[logoPrimary]}>
            <span className="visually-hidden">BlockJoy</span>
            <Image layout="fill" src="/lockjoy-logo-small.svg" />
          </span>
        );
    }
  };
  return (
    <h1 css={[logo, centered ? logoLinkCentered : '']}>
      <a href="#" css={[logoLink]}>
        {renderIcon(type)}
      </a>
    </h1>
  );
}
