import Image from 'next/image';
import { Fragment, MouseEventHandler, useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { styles } from './FileUpload.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import IconClose from 'public/assets/icons/close-12.svg';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  multiple?: boolean;
  onChange: (value: any) => void;
  remove: MouseEventHandler<HTMLButtonElement>;
  placeholder: string;
};

export function FileUpload({
  onChange,
  placeholder,
  remove,
  name,
  multiple = false,
}: Props) {
  const {
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext();

  const files: FileWithPath[] = watch(name);
  const currentFiles = getValues(name);
  const filesArray = (currentFiles && Array.from(currentFiles)) || [];

  const onDrop = useCallback(
    async (droppedFiles: File[]) => {
      const newFiles = [...filesArray, ...Array.from(droppedFiles)];
      setValue(name, newFiles);
    },
    [files, name, setValue],
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple,
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
        {...getInputProps({ onChange })}
      />
      {Boolean(files.length) ? (
        files.map((file) => (
          <Fragment key={file.name}>
            <Image
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
