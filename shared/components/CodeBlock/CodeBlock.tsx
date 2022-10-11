import { base } from './CodeBlock.styles';
import Prism from 'prismjs';
import { useEffect } from 'react';

type Props = {
  code: string;
  language: 'bash';
};

export function CodeBlock({ code, language }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <pre css={[base]}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
