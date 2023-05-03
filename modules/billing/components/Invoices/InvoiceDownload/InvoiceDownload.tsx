import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from '../InvoicePDF/InvoicePDF';
import { reset } from 'styles/utils.reset.styles';
import {
  buttonBorder,
  buttonSize,
  buttonDisplay,
  buttonStyle,
  button,
} from '../../../../../shared/components/Button/Button.styles';
import IconDownload from '@public/assets/icons/download-12.svg';
import { Invoice } from 'chargebee-typescript/lib/resources';

export type InvoiceDownloadProps = {
  invoice: Invoice;
};

export const InvoiceDownload = ({ invoice }: InvoiceDownloadProps) => {
  const handleDownloadClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ): void => {
    event.stopPropagation();
  };

  return (
    <PDFDownloadLink
      document={<InvoicePDF invoice={invoice} />}
      fileName="invoice.pdf"
      onClick={handleDownloadClick}
      css={[
        reset.button,
        button,
        buttonSize['small'],
        buttonBorder['rounded'],
        buttonDisplay['inline'],
        buttonStyle['outline'],
      ]}
    >
      <IconDownload />
      <span>Download</span>
    </PDFDownloadLink>
  );
};
