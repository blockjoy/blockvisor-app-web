import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { styles } from './AdminHostsTag.styles';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import { Button, DropdownMenu, TagList } from '@shared/components';
import { AdminDropdownHeader } from '@modules/admin/components';
import { toast } from 'react-toastify';
import { hostClient } from '@modules/grpc';
import IconTag from '@public/assets/icons/common/Tag.svg';

type Props = {
  isDisabled?: boolean;
  selectedIds: string[];
  tagsAdded: AdminTags[];
  setTagsAdded: Dispatch<SetStateAction<AdminTags[]>>;
};

export const AdminHostsTag = ({
  isDisabled,
  selectedIds,
  tagsAdded,
  setTagsAdded,
}: Props) => {
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

    const tagsAddedCopy = [...tagsAdded];

    for (let hostId of selectedIds) {
      const foundUpdatedTag = tagsAddedCopy.find((t) => t.id === hostId);

      if (foundUpdatedTag) {
        foundUpdatedTag.tags = [...foundUpdatedTag.tags, ...tags];
      } else {
        tagsAddedCopy.push({ id: hostId, tags });
      }

      for (let tag of tags) {
        requests.push(
          (async () => {
            try {
              await hostClient.updateHost({
                id: hostId,
                updateTags: {
                  addTag: { name: tag },
                },
              });
            } catch (err) {
              toast.error(`Error Updating Host: ${hostId}`);
            }
          })(),
        );
      }
    }

    await Promise.all(requests);

    setTagsAdded(tagsAddedCopy);
    toast.success('Tags Added');
    setIsSaving(false);
    setTags([]);
    setIsOpen(false);
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <AdminHeaderButton
        isDisabled={isDisabled}
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
            showToasts={false}
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
