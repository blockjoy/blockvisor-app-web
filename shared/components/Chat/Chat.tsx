import Script from 'next/script';
export function Chat() {
  return (
    <>
      <Script
        defer
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DATA_DOMAIN}
        src="https://plausible.io/js/script.js"
      ></Script>
      <Script id="crisp-js">{`window.$crisp=[];window.CRISP_WEBSITE_ID="09ccc057-4bc5-4c14-909a-6b10f6bbe1cb";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>
    </>
  );
}
