import { useRecoilValue } from 'recoil';
import { useUserSettings } from '@modules/auth';
import { layoutSelectors } from '@modules/layout';

type UseLayoutHook = {
  updateLayout: (key: LayoutSettings, value: boolean | View) => void;
};

export const useLayout = (): UseLayoutHook => {
  const layout = useRecoilValue(layoutSelectors.layout);
  const { updateUserSettings } = useUserSettings();

  const updateLayout = async (key: string, value: any) => {
    const updatedLayout = {
      ...layout,
      [key]: value,
    };

    const updatedLayoutString = JSON.stringify(updatedLayout);

    await updateUserSettings('layout', updatedLayoutString);
  };

  return {
    updateLayout,
  };
};
