import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PageHeader, PageSection, Button } from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { useHosts } from '@modules/hosts';
import { useRouter } from 'next/router';
import { IpAddressInput } from '@shared/components';
import { useState } from 'react';

type Form = {
  ipAddressFrom: string;
  ipAddressTo: string;
  gatewayIpAddress: string;
};

export const HostAdd = () => {
  const router = useRouter();
  const form = useForm<Form>();

  const [validation, setValidation] = useState({
    isDirty: false,
    ipAddressFrom: {
      valid: false,
    },
    ipAddressTo: {
      valid: false,
      greaterThanFrom: false,
    },
    gatewayIpAddress: {
      valid: false,
    },
  });

  const { isDirty, ipAddressFrom, ipAddressTo, gatewayIpAddress } = validation;

  const { setValue } = form;

  const { createHostProvision } = useHosts();

  const onSubmit: SubmitHandler<Form> = ({
    ipAddressFrom,
    ipAddressTo,
    gatewayIpAddress,
  }) => {
    createHostProvision(
      ipAddressFrom,
      ipAddressTo,
      gatewayIpAddress,
      (key: string) => {
        router.push(`hosts/install/${key}`);
      },
    );
  };

  const handleAllChanged = () => {
    if (!isDirty) {
      setValidation({
        ...validation,
        isDirty: true,
      });
    }
  };

  const checkIpIsValid = (ip: string) => {
    let pattern = /^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/;
    const result = pattern.test(ip);
    return result;
  };

  const handleIpFromChanged = (newValue: string) => {
    setValue('ipAddressFrom', newValue);
    handleAllChanged();
    setValidation({
      ...validation,
      isDirty: true,
      ipAddressFrom: {
        valid: checkIpIsValid(newValue),
      },
    });
  };

  const handleIpToChanged = (newValue: string) => {
    setValue('ipAddressTo', newValue);
    handleAllChanged();

    const ipAddressFromNumber = +form
      .getValues()
      .ipAddressFrom.replace(/\./g, '');

    const ipAddressToNumber = +form.getValues().ipAddressTo.replace(/\./g, '');

    setValidation({
      ...validation,
      isDirty: true,
      ipAddressTo: {
        valid: checkIpIsValid(newValue),
        greaterThanFrom: ipAddressToNumber > ipAddressFromNumber,
      },
    });
  };

  const handleGatewayIpChanged = (newValue: string) => {
    setValue('gatewayIpAddress', newValue);
    handleAllChanged();
    setValidation({
      ...validation,
      isDirty: true,
      gatewayIpAddress: {
        valid: checkIpIsValid(newValue),
      },
    });
  };

  return (
    <PageSection>
      <>
        <PageHeader>Add Host</PageHeader>
        <>
          <h2 css={typo.base}>Let's create a new host.</h2>
          <p
            css={[
              typo.small,
              colors.text3,
              spacing.top.small,
              spacing.bottom.large,
            ]}
          >
            Please enter the information below to get started.
          </p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <section css={[spacing.bottom.medium]}>
                <IpAddressInput
                  onChange={handleIpFromChanged}
                  label="IP Address From"
                />
                {form.getValues().ipAddressFrom && !ipAddressFrom.valid && (
                  <div
                    css={[typo.microlabel, colors.warning, spacing.top.small]}
                  >
                    You must enter a valid IP Address
                  </div>
                )}
              </section>
              <section css={[spacing.bottom.medium]}>
                <IpAddressInput
                  onChange={handleIpToChanged}
                  label="IP Address To"
                />
                {form.getValues().ipAddressTo &&
                  (!ipAddressTo.valid || !ipAddressTo.greaterThanFrom) && (
                    <div
                      css={[typo.microlabel, colors.warning, spacing.top.small]}
                    >
                      You must enter a valid IP Address that is higher than IP
                      Address From
                    </div>
                  )}
              </section>
              <section css={[spacing.bottom.large]}>
                <IpAddressInput
                  onChange={handleGatewayIpChanged}
                  label="Gateway IP Address"
                />
                {form.getValues().gatewayIpAddress &&
                  !gatewayIpAddress.valid && (
                    <div
                      css={[typo.microlabel, colors.warning, spacing.top.small]}
                    >
                      You must enter a valid IP Address
                    </div>
                  )}
              </section>
              <Button
                disabled={
                  !isDirty ||
                  !ipAddressFrom.valid ||
                  !ipAddressTo.valid ||
                  !gatewayIpAddress.valid
                }
                type="submit"
                style="primary"
                size="small"
              >
                Add Host
              </Button>
            </form>
          </FormProvider>
        </>
      </>
    </PageSection>
  );
};
