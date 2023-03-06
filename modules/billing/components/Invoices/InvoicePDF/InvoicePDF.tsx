import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export const InvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.subtitle}>Customer Information</Text>
        <Text style={styles.text}>Name: John Doe</Text>
        <Text style={styles.text}>Email: john.doe@example.com</Text>
        <Text style={styles.subtitle}>Order Details</Text>
        <Text style={styles.text}>Product: Widget</Text>
        <Text style={styles.text}>Quantity: 3</Text>
        <Text style={styles.text}>Price: $9.99</Text>
        <Text style={styles.subtitle}>Total</Text>
        <Text style={styles.text}>Amount Due: $29.97</Text>
      </View>
    </Page>
  </Document>
);
