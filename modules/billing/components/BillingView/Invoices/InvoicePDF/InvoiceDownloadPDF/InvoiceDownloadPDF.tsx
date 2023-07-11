import { PDFDownloadLink } from '@react-pdf/renderer';
import { Invoice } from 'chargebee-typescript/lib/resources';
import { reset } from 'styles/utils.reset.styles';
import {
  buttonBorder,
  buttonSize,
  buttonDisplay,
  buttonStyle,
  button,
} from '@shared/components/Buttons/Button/Button.styles';
import IconDownload from '@public/assets/icons/common/Download.svg';
import { SvgIcon } from '@shared/components';
import { InvoicePDF } from '@modules/billing';

export type InvoiceDownloadPDFProps = {
  invoice: Invoice;
};

export const InvoiceDownloadPDF = ({ invoice }: InvoiceDownloadPDFProps) => {
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
      <SvgIcon size="12px">
        <IconDownload />
      </SvgIcon>
      <span>Download</span>
    </PDFDownloadLink>
  );
};
