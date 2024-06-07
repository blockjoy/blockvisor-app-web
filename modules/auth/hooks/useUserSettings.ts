import { useRecoilState, useRecoilValue } from 'recoil';
import { userClient } from '@modules/grpc';
import { authAtoms } from '@modules/auth';

type UseUserSettingsHook = {
  userSettings: UserSettings;
  getUserSettings: () => Promise<void>;
  updateUserSettings: (
    name: keyof UserSettings,
    value: string,
  ) => Promise<void>;
  deleteUserSettings: (name: keyof UserSettings) => Promise<void>;
};

export const useUserSettings = (): UseUserSettingsHook => {
  const user = useRecoilValue(authAtoms.user);
  const [userSettings, setUserSettings] = useRecoilState(
    authAtoms.userSettings,
  );

  const getUserSettings = async () => {
    try {
      const response = await userClient.getSettings(user?.id!);

      setUserSettings(response);
    } catch (err: any) {
      console.log('Error while fetching User settings', err);
    }
  };

  const updateUserSettings = async (name: string, value: string) => {
    try {
      const response = await userClient.updateSettings(user?.id!, name, value);

      setUserSettings((userSettings) => ({
        ...userSettings,
        ...response,
      }));
    } catch (err: any) {
      console.log('Error while updating User settings', err);
    }
  };

  const deleteUserSettings = async (name: string) => {
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

  return {
    userSettings,

    getUserSettings,
    updateUserSettings,
    deleteUserSettings,
  };
};
