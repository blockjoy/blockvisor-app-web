import { nodeLauncherAtoms } from '@modules/node-launcher/store/nodeLauncherAtoms';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { Badge, Button, SvgIcon } from '@shared/components';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ConfigItemContent } from '../../ConfigItem/ConfigItemContent/ConfigItemContent';
import { styles } from './RegionSelect.styles';
import IconUS from '@public/assets/icons/flags/US.svg';
import IconDE from '@public/assets/icons/flags/DE.svg';
import IconFR from '@public/assets/icons/flags/FR.svg';
import { Note } from '@shared/components/General/Note/Note';
import IconCheckCircle from '@public/assets/icons/common/CheckCircle.svg';
import IconInfo from '@public/assets/icons/common/Info.svg';

type RegionKey = 'USW1' | 'USC1' | 'USE1' | 'EU1' | 'APAC1';

const REGIONS = [
  {
    id: 'USW1',
    title: 'US West',
    locations: [
      {
        id: 'salt-lake-city',
        title: 'Salt Lake City',
        country: 'US',
        online: false,
      },
    ],
  },
  { id: 'USC1', title: 'US Central', locations: [] },
  {
    id: 'USE1',
    title: 'US East',
    locations: [
      {
        id: 'new-york-city-us',
        title: 'New York City',
        country: 'US',
        online: false,
      },
    ],
  },
  {
    id: 'EU1',
    title: 'Europe',
    locations: [
      {
        id: 'frankfurt-eu',
        title: 'Frankfurt',
        country: 'DE',
        online: false,
      },
      {
        id: 'strasbourg-eu',
        title: 'Strasbourg',
        country: 'FR',
        online: false,
      },
    ],
  },
  {
    id: 'APAC1',
    title: 'Asia-Pacific',
    locations: [],
  },
];

const FLAGS = {
  US: IconUS,
  DE: IconDE,
  FR: IconFR,
};

export const RegionSelect = () => {
  const regions = useRecoilValue(nodeAtoms.regions);

  const setSelectedRegion = useSetRecoilState(nodeLauncherAtoms.selectedRegion);

  const [selectedRegionNav, setSelectedRegionNav] =
    useState<RegionKey | null>(null);

  const handleSelectedRegionNav = (nextRegion: RegionKey | null) =>
    setSelectedRegionNav(nextRegion);

  const locations = !selectedRegionNav
    ? REGIONS?.flatMap((region) => region.locations)
    : REGIONS?.find((region) => region.id === selectedRegionNav)?.locations;

  const handleRegion = (regionKey: string) => {
    const nextRegion = regions.find(
      (region) => region.region?.regionId === regionKey,
    );

    if (nextRegion) setSelectedRegion(nextRegion);
  };

  const finalLocations =
    locations?.map((location) =>
      regions.some((region) => region.region?.regionKey === location.id)
        ? {
            ...location,
            online: true,
          }
        : location,
    ) ?? [];

  console.log('regions', regions);
  console.log('finalLocations', finalLocations);

  return (
    <>
      <div css={styles.nav}>
        <Button
          size="small"
          style={!selectedRegionNav ? 'secondary' : 'outline'}
          onClick={() => handleSelectedRegionNav(null)}
        >
          All
        </Button>
        {REGIONS.map((region) => (
          <Button
            key={region.id}
            size="small"
            style={selectedRegionNav === region.id ? 'secondary' : 'outline'}
            onClick={() => handleSelectedRegionNav(region.id as any)}
          >
            {region.title}
          </Button>
        ))}
      </div>

      {finalLocations.length ? (
        <div css={styles.items}>
          {finalLocations?.map((location, i) => {
            const FlagIcon = FLAGS[location.country];
            const isAvailable = location.online;

            return (
              <ConfigItemContent
                key={location.id}
                handleClick={() => handleRegion(location.id)}
                isActive={i === 0}
                isDisabled={!isAvailable}
              >
                {/* <div css={!location.online && styles.badgeDisabled}>
                  <SvgIcon size="48px" additionalStyles={styles.icon}>
                    <FlagIcon />
                  </SvgIcon>
                </div> */}

                <h4>{location.title}</h4>

                <span css={styles.badge(location.online)}>
                  <SvgIcon size="12px" additionalStyles={styles.icon}>
                    {location.online ? <IconCheckCircle /> : <IconInfo />}
                  </SvgIcon>
                  <span>
                    {location.online ? 'Available right now' : 'On demand'}
                  </span>
                </span>
              </ConfigItemContent>
            );
          })}
        </div>
      ) : (
        <Note type="warning" title="No locations available for selected region">
          We haven't launched in your region yet. Contact us to share your
          interest, and we'll work to bring our service to you.
        </Note>
      )}
    </>
  );
};
