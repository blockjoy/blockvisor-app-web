import Image from 'next/image';
import { MouseEventHandler, useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { styles } from './FileUpload.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import IconClose from 'public/assets/icons/close-12.svg';

type Props = {
  files: FileWithPath[];
  onChange: (files: File[]) => void;
  remove: MouseEventHandler<HTMLButtonElement>;
  placeholder: string;
};

export function FileUpload({ files, onChange, placeholder, remove }: Props) {
  const onDrop = useCallback(async (droppedFiles: File[]) => {
    const newFiles = [...files, ...Array.from(droppedFiles)];
    onChange(newFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  return (
    <div
      css={[styles.base, !!files.length ? styles.hasFiles : styles.noFiles]}
      {...getRootProps()}
    >
      <input
        disabled={Boolean(files.length)}
        className="file-upload__input"
        {...getInputProps()}
      />
      {Boolean(files.length) ? (
        <>
          <Image
            src="/assets/icons/checkmark-24.svg"
            layout="fixed"
            width={24}
            height={24}
          />
          <span css={[styles.label, styles.text]}>
            {files.map(({ name }) => name).join(', ')}
          </span>
          <button onClick={remove} css={[reset.button, styles.remove]}>
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
