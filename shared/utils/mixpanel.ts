import mixpanel, { Dict } from 'mixpanel-browser';

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!, {
  api_host: process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_URL,
});

export const Mixpanel = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  track: (name: string, props?: Dict) => {
    console.log('track: ', name, props ?? '');
    mixpanel.track(name, props);
  },
};
