import { NodeProperty, UiType } from '@modules/grpc/library/blockjoy/v1/node';
import { FileUpload, Switch, Textbox } from '@shared/components';

export const renderControls = (
  property: NodeProperty,
  nodeFiles: NodeFiles[],
  onFileUploaded: (e: any) => void,
  onPropertyChanged: (e: any) => void,
) => {
  switch (property.uiType) {
    case UiType.UI_TYPE_FILE_UPLOAD:
      return (
        <FileUpload
          tabIndex={5}
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
          tabIndex={5}
          type="password"
          isRequired={property?.required && !property.value}
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
    case UiType.UI_TYPE_TEXT:
      return (
        <Textbox
          tabIndex={5}
          type="text"
          isRequired={property?.required && !property.value}
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
    case UiType.UI_TYPE_SWITCH:
      return (
        <Switch
          tabIndex={!!property.disabled ? -1 : 5}
          disabled={!!property.disabled}
          tooltip="Self hosting will be available after BETA."
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
  }
};
