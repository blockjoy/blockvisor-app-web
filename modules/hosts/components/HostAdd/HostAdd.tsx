import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PageHeader, PageSection } from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { useHosts } from '@modules/hosts';
import { useRouter } from 'next/router';
import { IpAddressInput } from '@shared/components';

type Form = {
  location?: string;
  ipAddressMin: string;
  ipAddressMax: string;
  gatewayIpAddressMin: string;
  gatewayIpAddressMax: string;
};

export const HostAdd = () => {
  const router = useRouter();
  const form = useForm<Form>();

  const { createHostProvision } = useHosts();

  const onSubmit: SubmitHandler<Form> = ({
    location,
    ipAddressMin,
    ipAddressMax,
    gatewayIpAddressMin,
    gatewayIpAddressMax,
  }) => {
    createHostProvision((key: string) => {
      router.push(`hosts/install/${key}`);
    });
  };

  const handleIpChanged = () => {
    console.log('ip changed!');
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
                  onChange={handleIpChanged}
                  label="IP Address From"
                />
              </section>
              <section css={[spacing.bottom.medium]}>
                <IpAddressInput
                  onChange={handleIpChanged}
                  label="IP Address To"
                />
              </section>
              <section css={[spacing.bottom.medium]}>
                <IpAddressInput
                  onChange={handleIpChanged}
                  label="Gateway IP Address"
                />
              </section>
            </form>
          </FormProvider>
        </>
      </>
    </PageSection>
  );
};
