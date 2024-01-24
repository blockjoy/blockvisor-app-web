import { useEffect, useState } from 'react';
import Script from 'next/script';
import { styles } from './Hubstop.styles';

declare global {
  interface Window {
    hbspt: any;
  }
}

export const Hubspot = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleScriptLoad = () => {
    if (window.hbspt && window.hbspt.forms) {
      window.hbspt.forms.create({
        region: 'na1',
        portalId: '23318034',
        formId: 'fa140489-0df4-4ba9-94e0-2123633e722f',
        target: '.hubspot-form',
        css: '',
        onFormSubmit: ($form: any) => {
          setIsLoading(true);
        },
        onFormSubmitted: ($form: any, data: any) => {
          setIsLoading(false);
          setIsSubmitted(true);
        },
      });
    }
  };

  useEffect(() => {
    handleScriptLoad();
  }, []);

  return (
    <>
      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        onLoad={handleScriptLoad}
      />
      <div
        className="hubspot-form"
        css={[
          styles.wrapper,
          isLoading ? styles.loading : null,
          isSubmitted ? styles.submitted : null,
        ]}
      ></div>
    </>
  );
};
