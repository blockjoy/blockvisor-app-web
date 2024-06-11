import { useUserSettings } from '@modules/auth';

type UseSettingsHook = {
  updateSettings: <T extends keyof UserSettingsUI>(
    name: T,
    value: Partial<UserSettingsUI[T]>,
  ) => Promise<void>;
  removeSettings: <T extends keyof UserSettingsUI>(name: T) => Promise<void>;
};

export const useSettings = (): UseSettingsHook => {
  const { userSettings, updateUserSettings, deleteUserSettings } =
    useUserSettings();

  const updateSettings = async <T extends keyof UserSettingsUI>(
    name: T,
    value: Partial<UserSettingsUI[T]>,
  ) => {
    console.log('%cUPDATE_SETTINGS', 'color: #f00', name, value);
    const settings = userSettings[name] ?? '{}';
    const parsedSettings = JSON.parse(settings);

    const updatedSettings = { ...parsedSettings, ...value };
    const updatedSettingsString = JSON.stringify(updatedSettings);

    await updateUserSettings(name, updatedSettingsString);
  };

  const removeSettings = async <T extends keyof UserSettingsUI>(name: T) => {
    console.log('%cDELETE_SETTINGS', 'color: #f00', name);

    await deleteUserSettings(name);
  };

  return { updateSettings, removeSettings };
};
