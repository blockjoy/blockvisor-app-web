import { UiType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { FileUpload, Switch, Textbox } from '@shared/components';

export const renderControls = (
  property: NodeProperty,
  nodeFiles: NodeFiles[],
  onFileUploaded: (e: any) => void,
  onPropertyChanged: (name: string, value: string | boolean) => void,
) => {
  switch (property.uiType) {
    case UiType.UI_TYPE_FILE_UPLOAD:
      return (
        <FileUpload
          currentFiles={nodeFiles?.find((f) => f.name === property.name)?.files}
          multiple={true}
          onChange={onFileUploaded}
          name={property.name}
          placeholder="Upload validator keys"
        />
      );
    case UiType.UI_TYPE_PASSWORD:
      return (
        <Textbox
          type="password"
          isRequired={property?.required && !property.value}
          name={property.name}
          onChange={onPropertyChanged}
        />
      );
    case UiType.UI_TYPE_TEXT:
      return (
        <Textbox
          defaultValue={property.value}
          type="text"
          isRequired={property?.required && !property.value}
          name={property.name}
          onChange={onPropertyChanged}
        />
      );
    case UiType.UI_TYPE_SWITCH:
      const value =
        property.value === 'true' ||
        (typeof property.value === 'boolean' && property.value === true);

      return (
        <Switch
          {...(!!property.disabled && { tabIndex: -1 })}
          defaultChecked={value}
          disabled={!!property.disabled}
          tooltip="Feature disabled during beta."
          name={property.name}
          onChange={onPropertyChanged}
        />
      );
  }
};
