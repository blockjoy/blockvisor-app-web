import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { PillPicker, Switch, Textbox } from '@shared/components';
import { NodeLauncherPropertyGroup } from '@modules/node';

export const renderControls = (
  propertyGroup: NodeLauncherPropertyGroup,
  onPropertyChanged: (name: string, value: string | boolean) => void,
) => {
  if (propertyGroup.properties.length === 1) {
    const property = propertyGroup.properties[0];

    switch (property.uiType) {
      case UiType.UI_TYPE_PASSWORD:
        return (
          <Textbox
            defaultValue={property.defaultValue}
            type="password"
            isRequired
            name={property.key}
            onChange={onPropertyChanged}
          />
        );
      case UiType.UI_TYPE_TEXT:
        return (
          <Textbox
            defaultValue={property.defaultValue}
            type="text"
            isRequired
            name={property.key}
            onChange={onPropertyChanged}
          />
        );
      case UiType.UI_TYPE_SWITCH:
        const value =
          property.defaultValue === 'true' ||
          (typeof property.defaultValue === 'boolean' &&
            property.defaultValue === true);

        return (
          <Switch
            checked={value}
            name={property.key}
            onChange={onPropertyChanged}
          />
        );
    }
  } else {
    switch (propertyGroup.uiType) {
      case UiType.UI_TYPE_SWITCH:
        const handleSwitchChanged = (name: string, value: boolean) => {
          if (value) {
            onPropertyChanged(
              propertyGroup.name,
              propertyGroup.properties.find((property) =>
                property.key.includes('on'),
              )?.key!,
            );
          } else {
            onPropertyChanged(
              propertyGroup.name,
              propertyGroup.properties.find((property) =>
                property.key.includes('off'),
              )?.key!,
            );
          }
        };

        const checked =
          propertyGroup.value.includes('on') ||
          propertyGroup.value.includes('true');

        return (
          <Switch
            checked={checked}
            name={propertyGroup.name}
            onChange={handleSwitchChanged}
          />
        );
      case UiType.UI_TYPE_ENUM:
        return (
          <PillPicker
            name={propertyGroup.name!}
            onChange={(item: { id: string | undefined; name: string }) => {
              onPropertyChanged(propertyGroup.name, item.id!);
            }}
            selectedItem={{
              id: propertyGroup.value,
              name: propertyGroup.value,
            }}
            items={propertyGroup.properties.map((property) => ({
              id: property.key,
              name: property.key,
            }))}
          />
        );
    }
  }
};
