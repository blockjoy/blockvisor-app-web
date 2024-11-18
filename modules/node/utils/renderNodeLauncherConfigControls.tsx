import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { Switch, Textbox } from '@shared/components';

export const renderControls = (
  property: ImageProperty,
  onPropertyChanged: (name: string, value: string | boolean) => void,
) => {
  switch (property.uiType) {
    case UiType.UI_TYPE_PASSWORD:
      return (
        <Textbox
          defaultValue={property.defaultValue}
          type="password"
          isRequired={false}
          // isRequired={property?.required && !property.de}
          name={property.key}
          onChange={onPropertyChanged}
        />
      );
    case UiType.UI_TYPE_TEXT:
      return (
        <Textbox
          defaultValue={property.defaultValue}
          type="text"
          isRequired={false}
          // isRequired={property?.required && !property.value}
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
          // {...(!!property.disabled && { tabIndex: -1 })}
          checked={value}
          // disabled={!!property.disabled}
          tooltip="Feature disabled during beta."
          name={property.key}
          onChange={onPropertyChanged}
        />
      );
  }
};
