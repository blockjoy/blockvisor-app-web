import { KeyboardEvent, useEffect, useState } from 'react';
import router from 'next/router';
import { protocolClient } from '@modules/grpc';
import { ProtocolServiceAddVersionRequest } from '@modules/grpc/library/blockjoy/v1/protocol';
import { styles } from './AdminProtocolVersionAddDialog.styles';
import {
  FormLabel,
  Textbox,
  Button,
  FormError,
  Scrollbar,
} from '@shared/components';
import { toast } from 'react-toastify';
import { spacing } from 'styles/utils.spacing.styles';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';

type Props = {
  isOpen: boolean;
  toggleOpen: VoidFunction;
  onRefreshed: VoidFunction;
};

export const AdminBlockchainVersionAddDialog = ({
  isOpen,
  toggleOpen,
  onRefreshed,
}: Props) => {
  const { id } = router.query;

  const defaultVersion: ProtocolServiceAddVersionRequest = {
    // TODO: add version request missing properties
    // properties: [],
    orgId: undefined,
    semanticVersion: '',
    description: '',
    versionKey: undefined,
    skuCode: '',
  };

  const [isAdding, setIsAdding] = useState(false);

  const [serverError, setServerError] = useState('');

  const [isVersionValid, setIsVersionValid] = useState(false);

  const [nextVersion, setNextVersion] =
    useState<ProtocolServiceAddVersionRequest>(defaultVersion);

  const resetForm = () => setNextVersion(defaultVersion);

  const addVersion = async () => {
    setServerError('');
    setIsAdding(true);
    try {
      await protocolClient.addVersion(nextVersion);
      onRefreshed();
      toggleOpen();
      toast.success('Version Added');
      resetForm();
    } catch (err: any) {
      const errorString: string = err?.toString();
      console.log('blockchainAddVersionError', err);
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

  const handleChange = (name: string, value: string | number) => {
    setNextVersion({
      ...nextVersion,
      [name]: value,
    });
  };

  const handlePropertiesChanged = (nextProperties: ImageProperty[]) => {
    setNextVersion({
      ...nextVersion,
      // properties: nextProperties,
    });
  };

  const handleEnterSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && isValid) {
      addVersion();
    }
  };

  const isValid = nextVersion.orgId && isVersionValid;

  useEffect(() => {
    const pattern =
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/g;

    const isPatternValid = pattern.test(nextVersion.semanticVersion);
    setIsVersionValid(isPatternValid);
  }, [nextVersion.semanticVersion]);

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
                isError={nextVersion.semanticVersion !== '' && !isVersionValid}
                onChange={handleChange}
                onKeyUp={handleEnterSubmit}
                name="version"
                defaultValue={nextVersion.semanticVersion}
                noBottomMargin
              />
              <FormError
                isVisible={
                  !isVersionValid && nextVersion.semanticVersion.length > 0
                }
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
            {/* TODO: fix blockchain add version properties
            <FormLabel>Properties</FormLabel>
            <AdminBlockchainVersionAddProperties
              onPropertiesChanged={handlePropertiesChanged}
              properties={nextVersion.properties}
            /> */}

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
