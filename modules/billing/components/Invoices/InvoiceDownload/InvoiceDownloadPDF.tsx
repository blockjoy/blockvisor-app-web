import { useInvoice } from '@modules/billing';
import { Button, SvgIcon } from '@shared/components';
import IconDownload from '@public/assets/icons/common/Download.svg';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { styles } from './InvoiceDownload.styles';
import { useState } from 'react';

type InvoiceDownloadPDFProps = {
  invoice: Invoice;
};

export const InvoiceDownloadPDF = ({ invoice }: InvoiceDownloadPDFProps) => {
  const [isLoading, setIsLoading] = useState<LoadingState>('finished');

  const { getInvoicePDF } = useInvoice();

  const handleInvoicePDF = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    setIsLoading('initializing');

    const download: any = await getInvoicePDF(id);

    const link = document.createElement('a');
    link.href = download?.download_url;
    link.download = `invoice_${invoice.id}.pdf`;
    link.click();
    link.remove();

    setIsLoading('finished');
  };

  return (
    <Button
      size="small"
      style="outline"
      css={styles.button}
      loading={isLoading !== 'finished'}
      onClick={(e) => handleInvoicePDF(e, invoice.id)}
    >
      <SvgIcon size="12px" additionalStyles={[styles.icon]}>
        <IconDownload />
      </SvgIcon>
      <span>Download</span>
    </Button>
  );
};
