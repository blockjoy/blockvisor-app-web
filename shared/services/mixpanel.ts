import mixpanel, { Dict } from 'mixpanel-browser';

const isDisabled =
  process.env.NODE_ENV === 'development' ||
  !process?.env?.NEXT_PUBLIC_MIXPANEL_TOKEN;

if (!isDisabled) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!, {
    api_host: process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_URL,
  });
}

export const Mixpanel = {
  identify: (id: string) => {
    if (isDisabled) return;
    mixpanel.identify(id);
  },
  track: (name: string, props?: Dict) => {
    if (isDisabled) return;
    console.log('track: ', name, props ?? '');
    mixpanel.track(name, props);
  },
};
