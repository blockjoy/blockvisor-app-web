import { useState } from 'react';
import { styles } from './PageTitleLaunchNode.styles';
import { Hubspot, Modal, SvgIcon } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';
import IconRocket from '@public/assets/icons/app/Rocket.svg';

export const PageTitleActivate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button css={styles.button} onClick={handleOpen}>
        <SvgIcon size="20px">
          <IconRocket />
        </SvgIcon>
        <span css={styles.buttonText}>Activate now</span>
      </button>
      {isOpen && (
        <Modal portalId="modal-root" isOpen={isOpen} handleClose={handleClose}>
          <h2 css={[typo.medium, spacing.bottom.medium]}>
            Request Node Launch
          </h2>
          <div css={spacing.bottom.medium}>
            <p>
              Interested in launching a node? Leave us your email and we'll get
              in touch to guide you through the process.
            </p>
          </div>
          <Hubspot />
        </Modal>
      )}
    </>
  );
};
