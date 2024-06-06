import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { BlockchainProperty } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  FormLabel,
  PillPicker,
  SvgIcon,
  Switch,
  TextboxCompact,
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
    <div css={styles.wrapper}>
      <button css={styles.button} type="button" onClick={handleAddProperty}>
        <SvgIcon size="12px">
          <IconPlus />
        </SvgIcon>{' '}
        Add Property
      </button>
      {properties.map((property, index) => (
        <div css={styles.row} key={`property${index + 1}`}>
          <button
            css={styles.deleteButton}
            type="button"
            onClick={() => handleDeleteProperty(property.name)}
          >
            <SvgIcon size="12px">
              <IconDelete />
            </SvgIcon>
          </button>
          <div css={styles.formGrid}>
            <TextboxCompact
              type="text"
              autoFocus
              isRequired
              name="name"
              placeholder="Name"
              noBottomMargin
              onChange={(name: string, value: string) =>
                handlePropertyChanged(index, name, value)
              }
              defaultValue={property.name}
            />
            <TextboxCompact
              type="text"
              name="displayName"
              placeholder="Display Name"
              noBottomMargin
              onChange={(name: string, value: string) =>
                handlePropertyChanged(index, name, value)
              }
            />
            <TextboxCompact
              type="text"
              name="default"
              placeholder="Default"
              noBottomMargin
              onChange={(name: string, value: string) =>
                handlePropertyChanged(index, name, value)
              }
            />
            <TextboxCompact
              type="text"
              name="default"
              placeholder="Description"
              noBottomMargin
              onChange={(name: string, value: string) =>
                handlePropertyChanged(index, name, value)
              }
            />

            <div>
              <FormLabel isCompact>Required</FormLabel>
              <Switch
                noBottomMargin
                name="required"
                defaultChecked={property.required}
                onChange={(name: string, value: boolean) =>
                  handlePropertyChanged(
                    index,
                    name,
                    value?.toString(),
                    'boolean',
                  )
                }
              />
            </div>
            <div>
              <FormLabel isCompact>UI Type</FormLabel>
              <PillPicker
                isCompact
                name={`uiType${index + 1}`}
                noBottomMargin
                items={uiTypes
                  ?.filter((type) => +type?.id! !== UiType.UI_TYPE_FILE_UPLOAD)
                  ?.map((type) => type?.name!)}
                selectedItem={
                  uiTypes.find((ui) => ui.id === property.uiType?.toString())
                    ?.name!
                }
                onChange={(name: string, value: string) =>
                  handlePropertyChanged(
                    index,
                    'uiType',
                    uiTypes?.find((type) => type.name === value)?.id!,
                    'number',
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
