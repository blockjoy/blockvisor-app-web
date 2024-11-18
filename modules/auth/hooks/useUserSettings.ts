import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { userClient } from '@modules/grpc';
import { authAtoms } from '@modules/auth';

type UseUserSettingsHook = {
  userSettings: UserSettings | null;
  userSettingsLoadingState: LoadingState;
};

export const useUserSettings = (): UseUserSettingsHook => {
  const user = useRecoilValue(authAtoms.user);
  const [userSettings, setUserSettings] = useRecoilState(
    authAtoms.userSettings,
  );
  const [userSettingsLoadingState, setUserSettingsLoadingState] =
    useRecoilState(authAtoms.userSettingsLoadingState);

  const fetcher = async () => {
    setUserSettingsLoadingState('loading');

    return await userClient.getSettings(user?.userId!);
  };

  useSWR(user?.userId ? `settings_${user?.userId}` : null, fetcher, {
    revalidateOnFocus: false,

    onSuccess: (data) => {
      console.log('getUserSettingsResponse: ', data);
      setUserSettings(data);
      setUserSettingsLoadingState('finished');
    },
    onError: (error) => {
      console.log('getUserSettingsError: ', error);
      setUserSettings({});
      setUserSettingsLoadingState('finished');
    },
  });

  return {
    userSettings,
    userSettingsLoadingState,
  };
};
