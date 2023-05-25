import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Styrene A LC',
  fonts: [
    {
      src: '/assets/fonts/StyreneALC-Regular.otf',
    },
    {
      src: '/assets/fonts/StyreneALC-Medium.otf',
      fontWeight: 500,
    },
    {
      src: '/assets/fonts/StyreneALC-Bold.otf',
      fontWeight: 700,
    },
  ],
});

export const styles: any = StyleSheet.create({
  page: {
    padding: 32,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Styrene A LC',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#212423',
  },

  flex: { display: 'flex' },
  flexRow: { flexDirection: 'row' },
  flexCol: { flexDirection: 'column' },
  justifyBetween: { justifyContent: 'space-between' },

  mbMic: { marginBottom: 5 },
  mbTny: { marginBottom: 10 },
  mbSml: { marginBottom: 20 },
  mbMed: { marginBottom: 40 },
  mbLrg: { marginBottom: 60 },
  mbXLrg: { marginBottom: 80 },

  mbAuto: { marginBottom: 'auto' },
  mtAuto: { marginTop: 'auto' },

  pMed: { padding: 12 },
  pxMed: { paddingLeft: 12, paddingRight: 12 },
  pyMic: { paddingTop: 5, paddingBottom: 5 },
  pyMed: { paddingTop: 12, paddingBottom: 12 },

  wSml: { width: '15%' },
  wMed: { width: '20%' },
  wLrg: { width: '25%' },
  wXLrg: { width: '30%' },
  wContainer: { width: '80%' },
  wFull: { width: '100%' },

  w40: { width: 40 },
  h40: { height: 40 },

  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },

  textGray: { color: '#A5A8A3' },

  textTny: { fontSize: 8 },
  textSml: { fontSize: 10 },
  textMed: { fontSize: 12 },
  textLrg: { fontSize: 14 },
  textXLrg: { fontSize: 16 },

  fontRegular: { fontWeight: 400 },
  fontMedium: { fontWeight: 500 },
  fontBold: { fontWeight: 700 },

  uppercase: { textTransform: 'uppercase' },

  bgPrimary: { backgroundColor: '#BFF589' },

  borderPrimary: { borderBottom: '1px solid #F4F4F4' },
  borderSecondary: { borderBottom: '1px dashed #D9D8D8' },

  mxIndent: { marginLeft: -12, marginRight: -12 },

  ellipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '95%',
  },
});
