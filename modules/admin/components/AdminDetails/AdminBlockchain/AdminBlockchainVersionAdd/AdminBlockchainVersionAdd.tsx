import ReactDOM from 'react-dom';
import { KeyboardEvent, useEffect, useState } from 'react';
import { AdminHeaderButton } from '@modules/admin/components';
import { styles } from './AdminBlockchainVersionAdd.styles';
import { blockchainClient } from '@modules/grpc';
import { BlockchainServiceAddVersionRequest } from '@modules/grpc/library/blockjoy/v1/blockchain';
import router from 'next/router';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import {
  withSearchDropdown,
  Dropdown,
  FormLabel,
  Textbox,
  Button,
  FormError,
} from '@shared/components';
import { createDropdownValuesFromEnum } from '@modules/admin/utils';
import { toast } from 'react-toastify';
import { spacing } from 'styles/utils.spacing.styles';
import IconUpgrade from '@public/assets/icons/common/ListAdd.svg';

export const AdminBlockchainVersionAdd = () => {
  const { id } = router.query;

  const defaultVersion = {
    blockchainId: id as string,
    nodeType: NodeType.NODE_TYPE_NODE,
    properties: [],
    version: '',
    description: '',
  };

  const [isOpen, setIsOpen] = useState<boolean>();

  const [isAdding, setIsAdding] = useState(false);

  const [serverError, setServerError] = useState('');

  const [shouldAutoFocus, setShouldAutoFocus] = useState<boolean | null>();

  const [invalidVersion, setInvalidVersion] = useState(false);

  const [isNodeTypeDropdownOpen, setIsNodeTypeDropdownOpen] = useState(false);

  const [nextVersion, setNextVersion] =
    useState<BlockchainServiceAddVersionRequest>(defaultVersion);

  const resetForm = () => setNextVersion(defaultVersion);

  const addVersion = async () => {
    setServerError('');
    setIsAdding(true);
    try {
      await blockchainClient.addVersion(nextVersion);
      setIsOpen(false);
      toast.success('Version Added');
      resetForm();
    } catch (err: any) {
      if (err?.toString().includes('rhai script')) {
        setServerError('Error: No rhai script');
      } else {
        setServerError('Error: Not found');
      }
      console.log('error', err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleNodeTypeDropdownOpen = (open: boolean = true) =>
    setIsNodeTypeDropdownOpen(open);

  const handleChange = (name: string, value: string | number) => {
    if (name === 'version') {
      if (
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/i.test(
          value as string,
        )
      ) {
        setInvalidVersion(false);
      } else {
        setInvalidVersion(true);
      }
    }

    setNextVersion({
      ...nextVersion,
      [name]: value,
    });
  };

  const handleEnterSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && isValid) {
      addVersion();
    }
  };

  const nodeTypes = createDropdownValuesFromEnum(NodeType, 'NODE_TYPE_');

  const isValid =
    nextVersion.blockchainId &&
    nextVersion.version &&
    nextVersion.nodeType &&
    !invalidVersion;

  const NodeTypeSelectDropdown =
    withSearchDropdown<AdminFilterDropdownItem>(Dropdown);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShouldAutoFocus(true);
      }, 250);
    }
  }, [isOpen]);

  const Dialog = (
    <>
      <div
        css={[styles.overlay, isOpen && styles.overlayOpen]}
        onClick={() => setIsOpen(false)}
      />
      <div css={[styles.dialog, isOpen && styles.dialogOpen]}>
        <h2 css={styles.dialogHeader}>Add Version</h2>
        <form css={styles.dialogForm}>
          <FormLabel isRequired>Version</FormLabel>
          <div css={spacing.bottom.medium}>
            <Textbox
              autoFocus={!!shouldAutoFocus}
              type="text"
              isRequired
              isError={nextVersion.version !== '' && invalidVersion}
              onChange={handleChange}
              onKeyUp={handleEnterSubmit}
              name="version"
              defaultValue={nextVersion.version}
              noBottomMargin
            />
            <FormError isVisible={invalidVersion}>
              Invalid version format
            </FormError>
          </div>
          <FormLabel>Description</FormLabel>
          <Textbox
            type="text"
            isRequired={false}
            onChange={handleChange}
            onKeyUp={handleEnterSubmit}
            name="description"
            defaultValue={nextVersion.description}
          />
          <FormLabel>Node type</FormLabel>
          <NodeTypeSelectDropdown
            items={nodeTypes}
            selectedItem={
              nodeTypes.find(
                (item) => item.id === nextVersion.nodeType?.toString(),
              )!
            }
            isOpen={isNodeTypeDropdownOpen}
            handleSelected={(item: AdminFilterDropdownItem | null) =>
              handleChange('nodeType', +item?.id!)
            }
            handleOpen={handleNodeTypeDropdownOpen}
            isLoading={false}
            size="small"
          />

          <Button disabled={!isValid} loading={isAdding} onClick={addVersion}>
            Add Version
          </Button>

          <div css={spacing.top.small}>
            <FormError isVisible={serverError.length > 0}>
              {serverError}
            </FormError>
          </div>
        </form>
      </div>
    </>
  );

  return (
    <>
      <AdminHeaderButton
        icon={<IconUpgrade />}
        onClick={() => setIsOpen(!isOpen)}
        tooltip="Add Version"
      />
      {ReactDOM.createPortal(Dialog, document.body.querySelector('#__next')!)}
    </>
  );
};
