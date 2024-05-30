import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { BlockchainProperty } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  FormLabel,
  Select,
  SvgIcon,
  Switch,
  Textbox,
} from '@shared/components';
import { styles } from './AdminBlockchainVersionAddProperties.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import { createDropdownValuesFromEnum } from '@modules/admin/utils';

type Props = {
  properties: BlockchainProperty[];
  onPropertiesChanged: (properties: BlockchainProperty[]) => void;
};

export const AdminBlockchainVersionAddProperties = ({
  properties,
  onPropertiesChanged,
}: Props) => {
  const uiTypes = createDropdownValuesFromEnum(UiType, 'UI_TYPE_');

  const handleAddProperty = () => {
    const nextProperties = [...properties];

    nextProperties.push({
      displayName: '',
      name: `Property${nextProperties.length + 1}`,
      required: false,
      uiType: UiType.UI_TYPE_TEXT,
      default: '',
    });

    onPropertiesChanged(nextProperties);
  };

  const handleDeleteProperty = (name: string) => {
    const nextProperties = properties.filter(
      (property) => property.name !== name,
    );
    onPropertiesChanged(nextProperties);
  };

  const handlePropertyChanged = (
    index: number,
    name: string,
    value: string,
    type?: 'boolean' | 'number',
  ) => {
    const nextProperties = [...properties];

    const foundProperty = nextProperties[index];

    if (!foundProperty) return;

    foundProperty[name] =
      type === 'boolean'
        ? value === 'true'
          ? true
          : false
        : type === 'number'
        ? +value
        : value;

    onPropertiesChanged(nextProperties);
  };

  return (
    <div css={styles.wrapper(properties.length > 0)}>
      {properties.map((property, index) => (
        <div css={styles.row} key={`property${index + 1}`}>
          <FormLabel>Name</FormLabel>
          <Textbox
            autoFocus
            name="name"
            onChange={(name: string, value: string) =>
              handlePropertyChanged(index, name, value)
            }
            defaultValue={property.name}
            isRequired
            type="text"
          />
          <FormLabel>Display Name</FormLabel>
          <Textbox
            name="displayName"
            onChange={(name: string, value: string) =>
              handlePropertyChanged(index, name, value)
            }
            isRequired={false}
            type="text"
          />
          <FormLabel>Default</FormLabel>
          <Textbox
            name="default"
            onChange={(name: string, value: string) =>
              handlePropertyChanged(index, name, value)
            }
            isRequired={false}
            type="text"
          />
          <FormLabel>UI Type</FormLabel>
          <Select
            buttonText={
              <p>
                {
                  uiTypes.find((ui) => ui.id === property.uiType?.toString())
                    ?.name!
                }
              </p>
            }
            items={uiTypes!}
            selectedItem={
              uiTypes.find((ui) => ui.id === property.uiType?.toString())!
            }
            onSelect={(value: string) =>
              handlePropertyChanged(index, 'uiType', value, 'number')
            }
          />
          <FormLabel>Required</FormLabel>
          <Switch
            name="required"
            defaultChecked={property.required}
            onChange={(name: string, value: boolean) =>
              handlePropertyChanged(index, name, value?.toString(), 'boolean')
            }
          />
          <button
            css={styles.addButton}
            type="button"
            onClick={() => handleDeleteProperty(property.name)}
          >
            <SvgIcon size="12px">
              <IconDelete />
            </SvgIcon>{' '}
            Delete Property
          </button>
        </div>
      ))}
      <button css={styles.addButton} type="button" onClick={handleAddProperty}>
        <SvgIcon size="12px">
          <IconPlus />
        </SvgIcon>{' '}
        Add Property
      </button>
    </div>
  );
};
