export const AUTH_KEY = 'identity';

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

const deleteUser = () => {
  if (isBrowser) {
    localStorage.removeItem(AUTH_KEY);
  }
};

export {
  getUser,
  deleteUser,
  saveUser,
  saveDefaultOrgToStorage,
  getDefaultOrgFromStorage,
};
