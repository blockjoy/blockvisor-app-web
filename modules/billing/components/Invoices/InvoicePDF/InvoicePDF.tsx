import { Page, Text, View, Document, Image, Font } from '@react-pdf/renderer';
import { BILL_HEADERS, INVOICE_DATA_HEADERS } from '@shared/constants/invoice';
import { InvoiceLogo } from './InvoiceLogo';
import { InvoiceQRCode } from './InvoiceQRCode';
import { styles } from './InvoicePDF.styles';

export type InvoicePDFProps = {
  invoice: any;
};

const billData = ['76', '02/23/2023', 'Due on receipt', '02/23/2023'];

export const InvoicePDF = ({ invoice: { services } }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Brand */}
      <View
        style={[
          styles.flex,
          styles.flexRow,
          styles.justifyBetween,
          styles.mbMed,
        ]}
      >
        <View style={[styles.flex, styles.h40]}>
          <InvoiceLogo />
        </View>

        <View style={[styles.w40, styles.h40]}>
          <InvoiceQRCode />
        </View>
      </View>

      {/* Company Info */}
      <View style={styles.mbMed}>
        <View style={styles.mbTny}>
          <Text style={[styles.textXLrg, styles.fontBold]}>Blockjoy, Inc.</Text>
        </View>
        <View style={styles.textSml}>
          <Text>867 Boylston St, 5th Floor, #1348</Text>
          <Text>Boston, MA 02116 US</Text>
          <Text>chris@blockjoy.com</Text>
        </View>
      </View>

      {/* Bill Info */}
      <View style={[styles.flex, styles.flexCol, styles.mbSml]}>
        <Text
          style={[
            styles.mbMic,
            styles.uppercase,
            styles.textGray,
            styles.fontMedium,
          ]}
        >
          Bill to
        </Text>
        <View style={styles.textSml}>
          <Text>crypto.com</Text>
          <Text>email id- carson.yan@crypto.com</Text>
        </View>
      </View>

      {/* Invoice Info */}
      <View
        style={[styles.flex, styles.flexCol, styles.mbLrg, styles.wContainer]}
      >
        <View style={[styles.flex, styles.flexRow]}>
          {BILL_HEADERS.map((header) => (
            <View key={header.key} style={styles.wLrg}>
              <Text
                style={[
                  styles.mbMic,
                  styles.uppercase,
                  styles.textGray,
                  styles.fontMedium,
                ]}
              >
                {header.name}
              </Text>
            </View>
          ))}
        </View>
        <View style={[styles.flex, styles.flexRow]}>
          {billData.map((data, dataIndex) => (
            <View key={dataIndex} style={styles.wLrg}>
              <Text>{data}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Invoice Details */}
      <View style={[styles.flex, styles.mxIndent]}>
        <View style={[styles.flex, styles.flexRow, styles.bgPrimary]}>
          {INVOICE_DATA_HEADERS.map((header) => (
            <View
              key={header.key}
              style={[
                styles.pxMed,
                styles.pyMic,
                styles[header.width],
                styles[header.align],
                styles.fontMedium,
              ]}
            >
              <Text style={[styles.uppercase, styles.fontBold]}>
                {header.name}
              </Text>
            </View>
          ))}
        </View>
        <View>
          {services.map((row: any, rowIndex: any) => (
            <View
              key={row.id}
              style={[
                styles.flex,
                styles.flexRow,
                rowIndex !== services.length - 1
                  ? styles.borderPrimary
                  : styles.borderSecondary,
              ]}
            >
              <View key="1" style={[styles.wLrg, styles.pMed]}>
                <Text style={styles.textSml}>{row.date}</Text>
              </View>
              <View key="2" style={[styles.wXLrg, styles.pMed]}>
                <Text style={styles.textSml}>{row.description}</Text>
              </View>
              <View
                key="3"
                style={[styles.wSml, styles.textRight, styles.pMed]}
              >
                <Text style={styles.textSml}>{row.quantity}</Text>
              </View>
              <View
                key="4"
                style={[styles.wSml, styles.textRight, styles.pMed]}
              >
                <Text style={styles.textSml}>{row.price}</Text>
              </View>
              <View
                key="5"
                style={[styles.wSml, styles.textRight, styles.pMed]}
              >
                <Text style={styles.textSml}>{row.totalPrice}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Balance */}
      <View
        style={[
          styles.flex,
          styles.flexRow,
          styles.justifyBetween,
          styles.mbXLrg,
          styles.fontMedium,
        ]}
      >
        <View style={styles.flex}>
          <Text style={[styles.textGray, styles.uppercase, styles.pyMed]}>
            Balance
          </Text>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.textRight, styles.fontBold, styles.pyMed]}>
            $2,000.00
          </Text>
        </View>
      </View>

      {/* Transfer details */}
      <View style={styles.mtAuto}>
        <View style={[styles.textTny, styles.textGray, styles.mbTny]}>
          <Text>Bank Name</Text>
          <Text>Mercury</Text>
        </View>
        <View style={[styles.textTny, styles.textGray, styles.mbTny]}>
          <Text>Wire Transfers:</Text>
          <Text>ABA Routing Number: 084106768</Text>
          <Text>Beneficiary: BlockJoy Inc</Text>
          <Text>Account Number: 9801438565</Text>
          <Text>Type: Checking</Text>
        </View>
        <View style={[styles.textTny, styles.textGray, styles.mbTny]}>
          <Text>International Wire Details:</Text>
          <Text>IBAN / Account Number: 084106768</Text>
          <Text>Beneficiary Name: Evolve Bank & Trust</Text>
          <Text>
            Reference field: Account 9801438565 for BlockJoy Inc at Evolve Bank
            & Trust
          </Text>
        </View>
        <View style={[styles.textTny, styles.textGray, styles.mbTny]}>
          <Text>
            Please send USDT to this ERC-20 address:
            0x6825D20C2319b3Eceed953389D0A23aE9ab962EE
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
