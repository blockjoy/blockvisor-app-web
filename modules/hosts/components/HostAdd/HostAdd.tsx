import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PageHeader, PageSection, Button } from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { useHosts } from '@modules/hosts';
import { useRouter } from 'next/router';
import { IpAddressInput } from '@shared/components';

type Form = {
  ipAddressFrom: string;
  ipAddressTo: string;
  gatewayIpAddress: string;
};

export const HostAdd = () => {
  const router = useRouter();
  const form = useForm<Form>();

  const { setValue } = form;

  const { createHostProvision } = useHosts();

  const onSubmit: SubmitHandler<Form> = ({
    ipAddressFrom,
    ipAddressTo,
    gatewayIpAddress,
  }) => {
    console.log('params', ipAddressFrom, ipAddressTo, gatewayIpAddress);

    createHostProvision(
      ipAddressFrom,
      ipAddressTo,
      gatewayIpAddress,
      (key: string) => {
        router.push(`hosts/install/${key}`);
      },
    );
  };

  const handleIpFromChanged = (newValue: string) => {
    setValue('ipAddressFrom', newValue);
    console.log('ip changed!', newValue);
  };

  const handleIpToChanged = (newValue: string) => {
    setValue('ipAddressTo', newValue);
    console.log('ip changed!', newValue);
  };

  const handleGatewayIpChanged = (newValue: string) => {
    setValue('gatewayIpAddress', newValue);
    console.log('ip changed!', newValue);
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
              </section>
              <section css={[spacing.bottom.medium]}>
                <IpAddressInput
                  onChange={handleIpToChanged}
                  label="IP Address To"
                />
              </section>
              <section css={[spacing.bottom.large]}>
                <IpAddressInput
                  onChange={handleGatewayIpChanged}
                  label="Gateway IP Address"
                />
              </section>
              <Button type="submit" style="primary" size="small">
                Add Host
              </Button>
            </form>
          </FormProvider>
        </>
      </>
    </PageSection>
  );
};
