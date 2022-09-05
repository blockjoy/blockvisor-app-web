import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { styles } from './FileUpload.styles';
import { reset } from 'styles/utils.reset.styles';

type Props = {
  files: any[];
};

export function FileUpload({ files }: Props) {
  const { getRootProps, getInputProps } = useDropzone({ multiple: false });

  return (
    <div {...getRootProps()}>
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
          <span css={[styles.label]}>
            {files.map(({ name }) => name).join(', ')}
          </span>
          <button css={[reset.button, styles.remove]}>
            <Image
              src="/assets/icons/close-12.svg"
              layout="fixed"
              width={12}
              height={12}
            />
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
          <div>Select a file to upload</div>
        </>
      )}
    </div>
  );
}
