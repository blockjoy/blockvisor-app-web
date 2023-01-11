import Image from 'next/image';
import { Fragment, MouseEventHandler, useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { styles } from './FileUpload.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import IconClose from 'public/assets/icons/close-12.svg';

type Props = {
  name: string;
  multiple?: boolean;
  onChange: (value: any) => void;
  remove: MouseEventHandler<HTMLButtonElement>;
  placeholder: string;
  currentFiles: any;
};

export function FileUpload({
  onChange,
  placeholder,
  remove,
  name,
  multiple = false,
  currentFiles,
}: Props) {
  const files: FileWithPath[] = [];
  const filesArray = (currentFiles && Array.from(currentFiles)) || [];
  const onDrop = useCallback(
    async (droppedFiles: File[]) => {
      const newFiles = [...filesArray, ...Array.from(droppedFiles)];

      console.log('onDrop', newFiles);

      onChange({ target: { name, value: newFiles } });
    },
    [files, name],
  );

  const { getRootProps } = useDropzone({
    multiple,
    onDrop,
  });

  return (
    <div
      css={[styles.base, !!files.length ? styles.hasFiles : styles.noFiles]}
      {...getRootProps()}
    >
      <input
        name={name}
        disabled={Boolean(files.length)}
        className="file-upload__input"
        onChange={onChange}
      />
      {Boolean(currentFiles?.length) ? (
        currentFiles[0].map((file: any) => (
          <Fragment key={file.name}>
            <Image
              alt="Check icon"
              src="/assets/icons/checkmark-24.svg"
              layout="fixed"
              width={24}
              height={24}
            />
            <span css={[styles.label, styles.text]}>{file.name}</span>
            <button
              data-item-url={file.name}
              onClick={remove}
              css={[reset.button, styles.remove]}
            >
              <IconClose />
            </button>
          </Fragment>
        ))
      ) : (
        <>
          <Image
            src="/assets/icons/upload-24.svg"
            alt="Upload icon"
            layout="fixed"
            width={24}
            height={24}
          />
          <p css={[styles.text, typo.small]}>{placeholder}</p>
        </>
      )}
    </div>
  );
}
