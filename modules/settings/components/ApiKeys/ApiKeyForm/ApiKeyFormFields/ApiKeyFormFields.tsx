import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import {
  Input,
  ResourceTypeSelector,
  PermissionSelector,
} from '@shared/components';
import { authAtoms } from '@modules/auth';
import {
  organizationAtoms,
  organizationSelectors,
} from '@modules/organization';
import { ApiKeyForm } from '../ApiKeyForm';
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

  const permissions = useRecoilValue(authAtoms.permissions);
  const personalPermissions = useRecoilValue(
    organizationAtoms.personalPermissions,
  );

  useEffect(() => {
    form.resetField('resourceId');

    if (
      selectedResourceType === ResourceType.RESOURCE_TYPE_ORG &&
      view === 'create' &&
      defaultOrganization?.orgId &&
      defaultOrganization.orgId !== selectedResourceId
    ) {
      form.setValue('resourceId', defaultOrganization?.orgId);
    }
  }, [selectedResourceType]);

  useEffect(() => {
    if (view === 'create' && personalPermissions.length) {
      form.setValue('permissions', personalPermissions);
    }
  }, [view, personalPermissions]);

  const permissionsList =
    selectedResourceType === ResourceType.RESOURCE_TYPE_USER
      ? personalPermissions
      : permissions;

  useEffect(() => {
    form.setValue('permissions', permissionsList ?? []);
  }, [permissionsList, form]);

  return (
    <div css={[reset.list, styles.wrapper]}>
      <div css={[spacing.bottom.medium, styles.formField, styles.label]}>
        <Input
          name="label"
          label="Label"
          placeholder="Label"
          labelStyles={[typo.base]}
          validationOptions={{
            required: 'Label is required',
          }}
        />
      </div>

      <div css={[spacing.bottom.medium, styles.formField, styles.resourceType]}>
        <Controller
          name="resourceType"
          rules={{
            required: 'Scope is required',
            validate: (value) => {
              if (value === ResourceType.RESOURCE_TYPE_UNSPECIFIED) {
                return 'Scope is required';
              }
            },
          }}
          render={({ field: { name, onChange, value } }) => (
            <ResourceTypeSelector
              name={name}
              value={value}
              label="Scope"
              labelStyles={[typo.base]}
              onChange={onChange}
            />
          )}
        />
      </div>

      <div css={[spacing.bottom.medium, styles.permissions]}>
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
              items={permissionsList}
              label="Permissions"
              labelStyles={[typo.base]}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
    </div>
  );
};
