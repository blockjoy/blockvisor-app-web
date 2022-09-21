import { Button } from '@shared/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerAction,
} from '../../../layout/components';
import { styles } from './hostAdd.styles';
import { HostAddConfirm } from './HostAddConfirm';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useHosts } from '@modules/hosts/hooks/useHosts';

export const HostAdd = () => {
  const router = useRouter();

  const [layout, setLayout] = useRecoilState(layoutState);
  const { createHostProvision, hostAddKey } = useHosts();

  const [step, setStep] = useState<1 | 2>(1);
  const [showCloseDialog, setShowCloseDialog] = useState<boolean>(false);
  const [shouldRedirectToHosts, setShouldRedirectToHosts] =
    useState<boolean>(false);

  const gotoNextStep = () => setStep(2);

  const onCreateNodeProvision = () => {
    createHostProvision(gotoNextStep);
  };

  const handleClose = () => {
    if (step === 1) {
      setLayout(undefined);
    } else {
      setShowCloseDialog(true);
    }
  };

  const onViewHostsClicked = () => {
    setShouldRedirectToHosts(true);
    handleClose();
  };

  const onCloseClicked = () => handleClose();

  const handleCloseConfirmed = () => {
    setShowCloseDialog(false);
    setStep(1);
    setLayout(undefined);
    if (shouldRedirectToHosts) {
      setShouldRedirectToHosts(false);
      router.push('/hosts');
    }
  };

  const handleCloseCancelled = () => {
    setShouldRedirectToHosts(false);
    setShowCloseDialog(false);
  };

  return (
    <Drawer isOpen={layout === 'hosts'}>
      <HostAddConfirm
        onYesClicked={handleCloseConfirmed}
        onNoClicked={handleCloseCancelled}
        isVisible={showCloseDialog}
      />
      {step === 1 && (
        <>
          <DrawerHeader onCloseClicked={onCloseClicked}>Add Host</DrawerHeader>
          <DrawerContent>
            <h2 css={typo.base}>Let's create your Host</h2>
            <p
              css={[
                typo.small,
                colors.text3,
                spacing.top.small,
                spacing.bottom.medium,
              ]}
            >
              Please click the button below to begin the creation process.
            </p>
          </DrawerContent>
          <DrawerAction>
            <Button
              size="small"
              type="submit"
              loading={false}
              customCss={[styles.action]}
              onClick={onCreateNodeProvision}
            >
              Begin Creation
            </Button>
          </DrawerAction>
          <DrawerContent>
            <h3 css={styles.title}>Please Note:</h3>
            <p css={styles.stepDescription}>
              Your Host name and location will be generated during the creation
              process.
            </p>
          </DrawerContent>
        </>
      )}
      {step === 2 && (
        <>
          <DrawerHeader onCloseClicked={onCloseClicked}>Add Host</DrawerHeader>
          <DrawerContent>
            <div>
              <h2 css={typo.base}>
                Great news, your host is ready to be provisioned.
              </h2>
              <p
                css={[
                  typo.small,
                  colors.text3,
                  spacing.top.small,
                  spacing.bottom.large,
                ]}
              >
                Please follow the steps below to complete the creation process.
              </p>

              <section css={styles.step}>
                <h3 css={styles.title}>Step 1: Download BlockJoy</h3>
                <p css={styles.stepDescription}>
                  If you don’t have it already, you can download BlockJoy from
                  this link.
                </p>
                <Button size="small" style="outline">
                  Download
                </Button>
              </section>

              <section css={styles.step}>
                <h3 css={styles.title}>Step 2: Set up your keys</h3>
                <p css={styles.stepDescription}>
                  Your key can be found below, please store it in a safe place
                  as necessary.
                </p>

                <span>{hostAddKey}</span>
              </section>

              <section css={styles.step}>
                <h3 css={styles.title}>Step 3: Manage your host</h3>
                <p css={styles.stepDescription}>
                  Once your key has been set up in BlockJoy, you will be able to
                  view your provisioned host via the Hosts tab.
                </p>
                <Button
                  onClick={onViewHostsClicked}
                  size="small"
                  style="outline"
                >
                  View Hosts
                </Button>
              </section>
            </div>
          </DrawerContent>
        </>
      )}
    </Drawer>
  );
};
