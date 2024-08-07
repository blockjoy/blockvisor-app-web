import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { styles } from './AdminHostsTag.styles';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import { Button, DropdownMenu, TagList } from '@shared/components';
import { AdminDropdownHeader } from '@modules/admin/components';
import { hostClient } from '@modules/grpc';
import IconTag from '@public/assets/icons/common/Tag.svg';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';

type Props = {
  selectedIds: string[];
  list: Host[];
  setList: Dispatch<SetStateAction<Host[]>>;
};

export const AdminHostsTag = ({ selectedIds, list, setList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const [isOpen, setIsOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [tags, setTags] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => setIsOpen(false);

  const handleAddTag = (newTag: string) => {
    const tagsCopy = [...tags];

    tagsCopy.push(newTag);

    setTags(tagsCopy);
  };

  const handleRemoveTag = (newTags: string[]) => setTags(newTags);

  const handleConfirm = async () => {
    setIsSaving(true);

    const requests = [];

    const listCopy = [...list];

    for (let hostId of selectedIds) {
      for (let tag of tags) {
        requests.push(
          (async () => {
            try {
              await hostClient.updateHost({
                id: hostId,
                updateTags: { addTag: { name: tag } },
              });

              const foundHost = listCopy.find((h) => h.id === hostId);
              if (!foundHost) return;
              foundHost.tags?.tags.push({ name: tag });
            } catch (err) {
              toast.error(`Error Updating Host: ${hostId}`);
            }
          })(),
        );
      }
    }

    await Promise.all(requests);

    setList(listCopy);

    toast.success('Tags Added');
    setIsSaving(false);
    setTags([]);
    setIsOpen(false);
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <AdminHeaderButton
        isDisabled={!selectedIds.length}
        icon={<IconTag />}
        onClick={() => setIsOpen(!isOpen)}
        tooltip="Add Tags"
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={[styles.dropdownMenu]}>
        <AdminDropdownHeader onClose={handleClickOutside}>
          Add {name?.substring(0, name.length - 1)} Tags
        </AdminDropdownHeader>
        <div css={styles.dropdownInner}>
          <TagList
            tags={tags}
            shouldWrap
            onRemove={handleRemoveTag}
            onAdd={handleAddTag}
          />
          <Button
            disabled={!tags.length}
            loading={isSaving}
            onClick={handleConfirm}
            display="block"
            size="small"
          >
            Update Hosts
          </Button>
        </div>
      </DropdownMenu>
    </div>
  );
};
