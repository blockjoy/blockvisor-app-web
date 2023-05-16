import Image from 'next/image';
import { Fragment, MouseEventHandler, useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { styles } from './FileUpload.styles';
import { typo } from 'styles/utils.typography.styles';

type Props = {
  name: string;
  tabIndex?: number;
  multiple?: boolean;
  onChange: (value: any) => void;
  placeholder: string;
  currentFiles: any;
};

export function FileUpload({
  onChange,
  placeholder,
  name,
  multiple = false,
  currentFiles,
  tabIndex,
}: Props) {
  let inputRef: HTMLInputElement;
  const files: FileWithPath[] = [];
  const filesArray = (currentFiles && Array.from(currentFiles)) || [];
  const onDrop = useCallback(
    async (droppedFiles: File[]) => {
      const newFiles = [...filesArray, ...Array.from(droppedFiles)];
      onChange({ target: { name, files: newFiles } });
    },
    [files, name],
  );

  const handleClick = (e: any) => {
    inputRef?.click();
  };

  const { getRootProps } = useDropzone({
    multiple,
    onDrop,
  });

  return (
    <div
      css={[styles.base, !!files.length ? styles.hasFiles : styles.noFiles]}
      {...getRootProps()}
      tabIndex={tabIndex}
      onClick={handleClick}
    >
      <input
        ref={(refParam) => {
          inputRef = refParam!;
        }}
        multiple
        hidden
        type="file"
        name={name}
        disabled={Boolean(files.length)}
        className="file-upload__input"
        onChange={onChange}
      />
      {Boolean(currentFiles?.length) ? (
        currentFiles.map((file: any) => (
          <Fragment key={file.name}>
            <span css={[styles.label, styles.text]}>{file.name}</span>
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
