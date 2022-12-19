import { Button, Toggle } from '@shared/components';
import { FC } from 'react';
import { FileUpload } from './formComponents/FileUpload/FileUpload';
import { Controller } from 'react-hook-form';
import { colors } from 'styles/utils.colors.styles';
import { display } from 'styles/utils.display.styles';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeLauncherConfig.styles';

type Props = {
  keys: any;
  nodeTypeProperties?: NodeTypeConfig[];
  onFileUploaded: (e: any) => void;
};

export const NodeLauncherConfig: FC<Props> = ({
  nodeTypeProperties,
  onFileUploaded,
  keys,
}) => {
  // const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { itemUrl } = e.currentTarget.dataset;
  //   const validatorKeys = getValues('validatorKeys');
  //   const newKeys = validatorKeys?.filter((key) => key.name !== itemUrl);
  //   setValue('validatorKeys', newKeys);
  // };

  return (
    <div css={styles.wrapper}>
      <h2 css={styles.h2}>Configure</h2>
      <div
        css={[
          styles.alert,
          nodeTypeProperties?.length === 0
            ? styles.alertSuccess
            : styles.alertDanger,
        ]}
      >
        Node requires configuration information.
      </div>
      {nodeTypeProperties?.map((property: NodeTypeConfig) => (
        <div css={styles.nodeTypeProperties}>
          {property.type === 'file-upload' && (
            <>
              <label
                css={[
                  spacing.bottom.mediumSmall,
                  typo.button,
                  display.block,
                  colors.text2,
                ]}
              >
                {property.label}
              </label>
              <p css={[typo.small, colors.text4, spacing.bottom.mediumSmall]}>
                Upload your validator keys
              </p>
              <FileUpload
                currentFiles={keys}
                multiple={true}
                onChange={(e) => onFileUploaded(e)}
                name={property.name}
                remove={() => console.log('shit')}
                placeholder="Upload validator keys"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
