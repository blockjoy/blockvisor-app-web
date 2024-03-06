import { useEffect, useState } from 'react';
import Script from 'next/script';
import { toast } from 'react-toastify';
import { Modal } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './HubSpotForm.styles';

type HubSpotFormProps = {
  title: string;
  content: string;
  isOpenHubSpot: boolean;
  handleClose: VoidFunction;
};

export const HubSpotForm = ({
  title,
  content,
  isOpenHubSpot,
  handleClose,
}: HubSpotFormProps) => {
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
          handleClose();
          toast.success('Request Submitted', { autoClose: false });
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
      <Modal
        portalId="modal-hubspot-form"
        isOpen={isOpenHubSpot}
        handleClose={handleClose}
      >
        <h2 css={[typo.medium, spacing.bottom.medium]}>{title}</h2>
        <div css={spacing.bottom.medium}>
          <p>{content}</p>
        </div>
        <div
          className="hubspot-form"
          css={[
            styles.wrapper,
            isLoading ? styles.loading : null,
            isSubmitted ? styles.submitted : null,
          ]}
        ></div>
      </Modal>
    </>
  );
};
