type Country = {
  code: string;
  name: string;
};

type State = { code: string; name: string };

type States = {
  [countryCode: string]: (State | string)[];
};
