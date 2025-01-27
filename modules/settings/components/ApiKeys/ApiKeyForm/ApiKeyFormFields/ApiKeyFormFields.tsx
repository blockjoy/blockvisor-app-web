import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { RESOURCE_TYPE_ITEMS } from '@shared/index';
import {
  Input,
  ResourceSelector,
  ResourceTypeSelector,
  PermissionSelector,
  InputLabel,
  OrganizationSelect,
} from '@shared/components';
import { usePersonalPermissions } from '@modules/auth';
import { ApiKeyForm, settingsSelectors } from '@modules/settings';
import { organizationSelectors } from '@modules/organization';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { reset } from 'styles/utils.reset.styles';
import { styles } from './ApiKeyFormFields.styles';

type Props = {
  view?: ApiKeysView['drawer'];
  form: UseFormReturn<ApiKeyForm>;
};

export const ApiKeyFormFields = ({ view, form }: Props) => {
  const { watch } = form;

  const selectedResourceType = watch('resourceType');
  const selectedResourceId = watch('resourceId');

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const resources = useRecoilValue(
    settingsSelectors.resources(selectedResourceType),
  );

  const { listPermissions, permissions: personalPermissions } =
    usePersonalPermissions();

  const resourceType = RESOURCE_TYPE_ITEMS.find(
    (res) => res.value === selectedResourceType,
  );

  useEffect(() => {
    form.resetField('resourceId');

    if (selectedResourceType === ResourceType.RESOURCE_TYPE_USER) {
      listPermissions();
    } else if (
      selectedResourceType === ResourceType.RESOURCE_TYPE_ORG &&
      defaultOrganization?.orgId &&
      defaultOrganization.orgId !== selectedResourceId
    ) {
      form.setValue('resourceId', defaultOrganization?.orgId);
    }
  }, [selectedResourceType]);

  const isDisabled = view === 'view';

  return (
    <ul css={[reset.list, styles.wrapper]}>
      <li css={[spacing.bottom.medium, styles.formField, styles.label]}>
        <Input
          name="label"
          label="Label"
          placeholder="Label"
          labelStyles={[typo.base]}
          validationOptions={{
            required: 'Label is required',
          }}
          disabled={isDisabled}
        />
      </li>

      <li css={[spacing.bottom.medium, styles.formField]}>
        <Controller
          name="resourceType"
          rules={{
            required: 'Resource Type is required',
            validate: (value) => {
              if (value === ResourceType.RESOURCE_TYPE_UNSPECIFIED) {
                return 'Resource Type is required';
              }
            },
          }}
          render={({ field: { name, onChange, value } }) => (
            <ResourceTypeSelector
              name={name}
              value={value}
              label="Resource Type"
              labelStyles={[typo.base]}
              onChange={onChange}
              disabled={isDisabled}
            />
          )}
        />
      </li>

      {Boolean(selectedResourceType) &&
        selectedResourceType !== ResourceType.RESOURCE_TYPE_USER && (
          <li css={[spacing.bottom.medium, styles.formField]}>
            <Controller
              name="resourceId"
              rules={{
                required:
                  resourceType !== ResourceType.RESOURCE_TYPE_USER
                    ? 'Resource is required'
                    : false,
              }}
              render={({ field: { name, onChange, value } }) =>
                resourceType?.value === ResourceType.RESOURCE_TYPE_ORG ? (
                  <>
                    <InputLabel name={name} additionalStyles={[typo.base]}>
                      Organization
                    </InputLabel>
                    <Controller
                      name={name}
                      render={() => (
                        <OrganizationSelect disabled={isDisabled} />
                      )}
                    />
                  </>
                ) : (
                  <ResourceSelector
                    items={resources}
                    name={name}
                    value={value}
                    label={resourceType?.name ?? 'Resource'}
                    labelStyles={[typo.base]}
                    disabled={isDisabled}
                    onChange={onChange}
                  />
                )
              }
            />
          </li>
        )}

      <li css={[spacing.bottom.medium, styles.permissions]}>
        <Controller
          name="permissions"
          rules={{
            required: 'Permissions are required',
            validate: (value) => {
              if (!value.length) {
                return 'Permissions are required';
              }
            },
          }}
          render={({ field: { name, onChange, value } }) => (
            <PermissionSelector
              name={name}
              {...(personalPermissions.length && {
                items: personalPermissions,
              })}
              label="Permissions"
              labelStyles={[typo.base]}
              disabled={isDisabled}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </li>
    </ul>
  );
};
