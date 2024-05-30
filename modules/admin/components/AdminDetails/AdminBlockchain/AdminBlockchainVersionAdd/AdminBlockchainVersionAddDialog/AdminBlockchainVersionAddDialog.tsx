import { KeyboardEvent, useEffect, useState } from 'react';
import router from 'next/router';
import { blockchainClient } from '@modules/grpc';
import {
  BlockchainServiceAddVersionRequest,
  BlockchainProperty,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { styles } from './AdminBlockchainVersionAddDialog.styles';
import {
  withSearchDropdown,
  Dropdown,
  FormLabel,
  Textbox,
  Button,
  FormError,
  Scrollbar,
} from '@shared/components';
import { createDropdownValuesFromEnum } from '@modules/admin/utils';
import { toast } from 'react-toastify';
import { spacing } from 'styles/utils.spacing.styles';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { AdminBlockchainVersionAddProperties } from './AdminBlockchainVersionAddProperties/AdminBlockchainVersionAddProperties';

type Props = {
  isOpen: boolean;
  toggleOpen: VoidFunction;
};

export const AdminBlockchainVersionAddDialog = ({
  isOpen,
  toggleOpen,
}: Props) => {
  const { id } = router.query;

  const defaultVersion = {
    blockchainId: id as string,
    nodeType: NodeType.NODE_TYPE_NODE,
    properties: [],
    version: '',
    description: '',
  };

  const [isAdding, setIsAdding] = useState(false);

  const [serverError, setServerError] = useState('');

  const [isVersionValid, setIsVersionValid] = useState(false);

  const [isNodeTypeDropdownOpen, setIsNodeTypeDropdownOpen] = useState(false);

  const [nextVersion, setNextVersion] =
    useState<BlockchainServiceAddVersionRequest>(defaultVersion);

  const resetForm = () => setNextVersion(defaultVersion);

  const addVersion = async () => {
    setServerError('');
    setIsAdding(true);
    try {
      await blockchainClient.addVersion(nextVersion);
      toggleOpen();
      toast.success('Version Added');
      resetForm();
    } catch (err: any) {
      const errorString: string = err?.toString();
      console.log('error', err);
      setServerError(
        `Error: ${errorString?.substring(
          errorString.lastIndexOf(': '),
          errorString.length - 1,
        )}`,
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleNodeTypeDropdownOpen = (open: boolean = true) =>
    setIsNodeTypeDropdownOpen(open);

  const handleChange = (name: string, value: string | number) => {
    setNextVersion({
      ...nextVersion,
      [name]: value,
    });
  };

  const handlePropertiesChanged = (nextProperties: BlockchainProperty[]) => {
    setNextVersion({
      ...nextVersion,
      properties: nextProperties,
    });
    console.log('nextVersion', nextVersion);
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
    isVersionValid;

  const NodeTypeSelectDropdown =
    withSearchDropdown<AdminFilterDropdownItem>(Dropdown);

  useEffect(() => {
    const pattern =
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/g;

    const isPatternValid = pattern.test(nextVersion.version);
    setIsVersionValid(isPatternValid);
  }, [nextVersion.version]);

  return (
    <>
      <div
        css={[styles.overlay, isOpen && styles.overlayOpen]}
        onClick={toggleOpen}
      />
      <div css={[styles.dialog, isOpen && styles.dialogOpen]}>
        <h2 css={styles.dialogHeader}>Add Version</h2>
        <Scrollbar additionalStyles={[styles.scrollbar]}>
          <form css={styles.dialogForm}>
            <FormLabel isRequired>Version</FormLabel>
            <div css={spacing.bottom.medium}>
              <Textbox
                autoFocus
                type="text"
                isRequired
                isError={nextVersion.version !== '' && !isVersionValid}
                onChange={handleChange}
                onKeyUp={handleEnterSubmit}
                name="version"
                defaultValue={nextVersion.version}
                noBottomMargin
              />
              <FormError
                isVisible={!isVersionValid && nextVersion.version.length > 0}
              >
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
              disabled
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
            <FormLabel>Properties</FormLabel>
            <AdminBlockchainVersionAddProperties
              onPropertiesChanged={handlePropertiesChanged}
              properties={nextVersion.properties}
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
        </Scrollbar>
      </div>
    </>
  );
};
