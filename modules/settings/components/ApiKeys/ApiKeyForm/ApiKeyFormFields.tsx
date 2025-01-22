import { useRecoilValue } from 'recoil';
import { Controller, UseFormReturn } from 'react-hook-form';
import {
  Input,
  ResourceSelector,
  ResourceTypeSelector,
} from '@shared/components';
import { ApiKeyFormParams, settingsSelectors } from '@modules/settings';
import { RESOURCE_TYPE_ITEMS } from '@shared/index';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { reset } from 'styles/utils.reset.styles';

type Props = {
  action?: Partial<ApiKeysView>;
  form: UseFormReturn<ApiKeyFormParams>;
};

export const ApiKeyFormFields = ({ action, form }: Props) => {
  const { watch } = form;

  const selectedResourceType = watch('resourceType');

  const resources = useRecoilValue(
    settingsSelectors.resources(selectedResourceType),
  );

  const resourceType = RESOURCE_TYPE_ITEMS.find(
    (res) => res.value === selectedResourceType,
  );

  return (
    <ul css={[reset.list]}>
      <li css={[spacing.bottom.medium]}>
        <Input
          name="label"
          label="Label"
          placeholder="Label"
          inputSize="medium"
          labelStyles={[typo.base]}
          validationOptions={{
            required: 'Label is required',
          }}
        />
      </li>
      <li css={[spacing.bottom.medium]}>
        <Controller
          name="resourceType"
          rules={{ required: 'Resource Type is required' }}
          render={({ field: { name, onChange, value } }) => (
            <ResourceTypeSelector
              name={name}
              value={value}
              label="Resource Type"
              labelStyles={[typo.base]}
              onChange={onChange}
              disabled={action === 'update'}
            />
          )}
        />
      </li>
      {Boolean(selectedResourceType) && Boolean(resources.length) && (
        <li css={[spacing.bottom.medium]}>
          <Controller
            name="resourceId"
            rules={{ required: 'Resource is required' }}
            render={({ field: { name, onChange, value } }) => (
              <ResourceSelector
                items={resources}
                name={name}
                value={value}
                label={resourceType?.name ?? 'Resource'}
                labelStyles={[typo.base]}
                disabled={action === 'update'}
                onChange={onChange}
              />
            )}
          />
        </li>
      )}
    </ul>
  );
};
