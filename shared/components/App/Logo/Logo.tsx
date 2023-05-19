import LogoLarge from '@public/assets/icons/blockjoy-logo-large.svg';
import LogoSmall from '@public/assets/icons/blockjoy-logo-small.svg';
import {
  logo,
  logoLink,
  logoPrimary,
  logoLinkCentered,
  logoFaded,
} from './Logo.styles';
import { display } from 'styles/utils.display.styles';

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
            <span css={[display.visuallyHidden]}>BlockJoy</span>
            <LogoLarge />
          </>
        );
      case 'faded':
        return (
          <span css={[logoFaded]}>
            <LogoSmall />
          </span>
        );

      default:
        return (
          <span css={[logoPrimary]}>
            <span css={[display.visuallyHidden]}>BlockJoy</span>
            <LogoSmall />
          </span>
        );
    }
  };
  return (
    <h1 css={[logo, centered ? logoLinkCentered : '']}>{renderIcon(type)}</h1>
  );
}
