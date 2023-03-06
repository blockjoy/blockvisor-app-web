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

export const InvoiceDownload = () => (
  <div>
    <PDFDownloadLink
      document={<InvoicePDF />}
      fileName="invoice.pdf"
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
  </div>
);
