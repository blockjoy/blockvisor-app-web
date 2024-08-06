import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, SvgIcon } from '@shared/components';

import { styles } from './InvoiceDownload.styles';
import IconDownload from '@public/assets/icons/common/Download.svg';

type InvoiceDownloadProps = {
  invoicePdf: string;
};

export const InvoiceDownload = ({ invoicePdf }: InvoiceDownloadProps) => {
  const [isLoading, setIsLoading] = useState<LoadingState>('finished');

  const handleInvoicePDF = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!invoicePdf) return;

    setIsLoading('initializing');

    const link = document.createElement('a');
    link.href = invoicePdf;
    link.click();
    link.remove();

    await new Promise((r) => setTimeout(r, 1000));

    setIsLoading('finished');

    toast.success('Invoice download started...');
  };

  return (
    <Button
      size="small"
      style="outline"
      css={styles.button}
      loading={isLoading !== 'finished'}
      onClick={handleInvoicePDF}
    >
      <SvgIcon size="12px" additionalStyles={[styles.icon]}>
        <IconDownload />
      </SvgIcon>
      <span>Download</span>
    </Button>
  );
};
