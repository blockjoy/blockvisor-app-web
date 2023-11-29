import { useMemo, useState } from 'react';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { withSearch, Dropdown } from '@shared/components';

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
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const HostSelectDropdown = useMemo(() => withSearch<Host>(Dropdown), [hosts]);

  return (
    <HostSelectDropdown
      items={hosts}
      selectedItem={selectedHost}
      handleSelected={onChange}
      defaultText="Auto select"
      isOpen={isOpen}
      handleOpen={handleOpen}
      isLoading={isLoading}
    />
  );
};
