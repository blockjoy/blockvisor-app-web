import { useRecoilCallback, useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { userClient } from '@modules/grpc';

type UseSettingsHook = {
  updateSettings: <T extends keyof UserSettingsUI>(
    name: T,
    value: Partial<UserSettingsUI[T]>,
    onSuccess?: VoidFunction,
    userId?: string,
  ) => Promise<void>;
  removeSettings: <T extends keyof UserSettingsUI>(name: T) => Promise<void>;
};

export const useSettings = (): UseSettingsHook => {
  const user = useRecoilValue(authAtoms.user);

  const updateSettings = useRecoilCallback(
    ({ snapshot, set }) =>
      async <T extends keyof UserSettingsUI>(
        name: T,
        value: Partial<UserSettingsUI[T]>,
        onSuccess?: VoidFunction,
        userId?: string,
      ) => {
        console.log('%cUPDATE_SETTINGS', 'color: #f00', name, value);

        const userSettings = await snapshot.getPromise(authAtoms.userSettings);

        const settings = userSettings?.[name] ?? '{}';
        const parsedSettings = JSON.parse(settings);

        const [key, val] = Object.entries(value)[0];

        const updatedSettings = { ...parsedSettings };
        if (!val) delete updatedSettings[key];
        else updatedSettings[key] = val;

        const updatedSettingsString = JSON.stringify(updatedSettings);

        try {
          const response = await userClient.updateSettings(
            userId || user?.userId!,
            name,
            updatedSettingsString,
          );

          set(authAtoms.userSettings, (prevSettings) => ({
            ...prevSettings,
            ...response,
          }));

          onSuccess?.();
        } catch (err: any) {
          console.log('Error while updating User settings', err);
        }
      },
    [user],
  );

  const removeSettings = useRecoilCallback(
    ({ set }) =>
      async <T extends keyof UserSettingsUI>(name: T) => {
        console.log('%cDELETE_SETTINGS', 'color: #f00', name);

        try {
          await userClient.deleteSettings(user?.userId!, name);
          set(authAtoms.userSettings, (prevSettings) => {
            const updatedSettings = { ...prevSettings };
            delete updatedSettings[name];
            return updatedSettings;
          });
        } catch (err: any) {
          console.log('Error while deleting User settings', err);
        }
      },
    [user],
  );

  return { updateSettings, removeSettings };
};
