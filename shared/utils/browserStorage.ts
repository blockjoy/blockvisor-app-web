export const AUTH_KEY = 'identity';
export const HOST_PROVISIONS_KEY = 'hostProvisionKeys';

function isUser(value: unknown): value is User {
  return (value as User).accessToken !== undefined;
}

const isBrowser = typeof window !== 'undefined';

const saveDefaultOrgToStorage = (name: string, id: string) => {
  const user = getUser();

  if (user && isBrowser) {
    user.defaultOrganization = {
      name,
      id,
    };
    saveUser(user);
  }
};

const getDefaultOrgFromStorage = () => {
  if (isBrowser) {
    return getUser()?.defaultOrganization;
  }
};

const getUser = () => {
  if (isBrowser) {
    const item = localStorage.getItem(AUTH_KEY);
    if (item) {
      const parsed = JSON.parse(item);
      if (isUser(parsed)) {
        return parsed;
      }
      return null;
    }

    return null;
  }
  return null;
};

const saveUser = (value: User): void => {
  if (isBrowser) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(value));
  }
};

const updateAccessToken = (token: string): void => {
  if (isBrowser) {
    const item = localStorage.getItem(AUTH_KEY);

    if (item) {
      const parsed = JSON.parse(item);
      if (isUser(parsed)) {
        parsed.accessToken = token;

        saveUser(parsed);
      }
    }
  }
};

const updateUser = (user: User) => {
  if (isBrowser) {
    const item = localStorage.getItem(AUTH_KEY);

    if (item) {
      const parsed = JSON.parse(item);
      if (isUser(parsed)) {
        const updated = { ...parsed, ...user };

        saveUser(updated);
      }
    }
  }
};
const deleteUser = () => {
  if (isBrowser) {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(HOST_PROVISIONS_KEY);
  }
};

export {
  getUser,
  deleteUser,
  saveUser,
  updateUser,
  updateAccessToken,
  saveDefaultOrgToStorage,
  getDefaultOrgFromStorage,
};
