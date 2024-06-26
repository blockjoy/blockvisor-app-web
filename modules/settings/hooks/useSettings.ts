import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { userClient } from '@modules/grpc';

type UseSettingsHook = {
  updateSettings: <T extends keyof UserSettingsUI>(
    name: T,
    value: Partial<UserSettingsUI[T]>,
    onSuccess?: VoidFunction,
  ) => Promise<void>;
  removeSettings: <T extends keyof UserSettingsUI>(name: T) => Promise<void>;
};

export const useSettings = (): UseSettingsHook => {
  const user = useRecoilValue(authAtoms.user);
  const [userSettings, setUserSettings] = useRecoilState(
    authAtoms.userSettings,
  );

  const updateSettings = async <T extends keyof UserSettingsUI>(
    name: T,
    value: Partial<UserSettingsUI[T]>,
    onSuccess?: VoidFunction,
  ) => {
    console.log('%cUPDATE_SETTINGS', 'color: #f00', name, value);
    const settings = userSettings?.[name] ?? '{}';
    const parsedSettings = JSON.parse(settings);

    const [key, val] = Object.entries(value)[0];

    const updatedSettings = { ...parsedSettings };
    if (!val) delete updatedSettings[key];
    else updatedSettings[key] = val;

    const updatedSettingsString = JSON.stringify(updatedSettings);

    try {
      const response = await userClient.updateSettings(
        user?.id!,
        name,
        updatedSettingsString,
      );

      setUserSettings((userSettings) => ({
        ...userSettings,
        ...response,
      }));

      onSuccess?.();
    } catch (err: any) {
      console.log('Error while updating User settings', err);
    }
  };

  const removeSettings = async <T extends keyof UserSettingsUI>(name: T) => {
    console.log('%cDELETE_SETTINGS', 'color: #f00', name);
    try {
      await userClient.deleteSettings(user?.id!, name);
      setUserSettings((userSettings) => {
        const updatedSettings = { ...userSettings };
        delete updatedSettings[name];
        return updatedSettings;
      });
    } catch (err: any) {
      console.log('Error while deleting User settings', err);
    }
  };

  return { updateSettings, removeSettings };
};
