import { useMemo, useState } from 'react';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { withSearchDropdown, Dropdown, HostIpStatus } from '@shared/components';

type HostSelectProps = {
  hosts: Host[];
  isLoading: boolean;
  selectedHost: Host | null;
  onChange: (host: Host | null) => void;
};

export const HostSelect = ({
  hosts,
  isLoading,
  selectedHost,
  onChange,
}: HostSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open: boolean = true) => {
    setIsOpen(open);
  };

  const checkDisabledItem = (item?: Host) =>
    item?.ipAddresses?.every((ip) => ip.assigned) ?? false;

  const renderItemLabel = (item?: Host) => {
    return <HostIpStatus ipAddresses={item?.ipAddresses!} />;
  };

  const HostSelectDropdown = useMemo(
    () => withSearchDropdown<Host>(Dropdown),
    [hosts],
  );

  return (
    <HostSelectDropdown
      items={hosts}
      selectedItem={selectedHost}
      handleSelected={onChange}
      defaultText="Auto select"
      isOpen={isOpen}
      handleOpen={handleOpen}
      isLoading={isLoading}
      size="small"
      checkDisabledItem={checkDisabledItem}
      renderItemLabel={renderItemLabel}
    />
  );
};
