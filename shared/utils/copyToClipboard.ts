import { toast } from 'react-toastify';

const isClipboardApiSupported = () => !!(navigator && navigator.clipboard);

const fallbackCopyToClipboard = (str: string) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const copyToClipboard = (value: string) => {
  if (isClipboardApiSupported()) {
    navigator.clipboard.writeText(value);
    toast.success('Copied');
  } else {
    fallbackCopyToClipboard(value);
    toast.success('Copied');
  }
};
