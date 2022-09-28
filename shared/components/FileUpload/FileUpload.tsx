import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone, DropzoneOptions, FileWithPath } from 'react-dropzone';
import { styles } from './FileUpload.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import IconClose from 'public/assets/icons/close-12.svg';

type Props = {
  files: FileWithPath[];
  dropzoneOptions: DropzoneOptions;
  onChange: (value: any) => void;
  placeholder: string;
};

export function FileUpload({
  files,
  dropzoneOptions,
  onChange,
  placeholder,
}: Props) {
  const onDrop = useCallback(async (droppedFiles: File[]) => {
    const newFiles = [...files, ...Array.from(droppedFiles)];

    onChange(newFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneOptions,
    onDrop,
  });

  return (
    <div css={[styles.base]} {...getRootProps()}>
      <input
        disabled={Boolean(files.length)}
        className="file-upload__input"
        {...getInputProps({ onChange })}
      />
      {Boolean(files.length) ? (
        <>
          <Image
            src="/assets/icons/checkmark-24.svg"
            layout="fixed"
            width={24}
            height={24}
          />
          <span css={[styles.label]}>
            {files.map(({ name }) => name).join(', ')}
          </span>
          <button css={[reset.button, styles.remove]}>
            <IconClose />
          </button>
        </>
      ) : (
        <>
          <Image
            src="/assets/icons/upload-24.svg"
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
