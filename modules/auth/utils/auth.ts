const isUserLoggedIn = (user: User | null) => Boolean(user?.accessToken);

const isUserVerified = (user: User | null) =>
  isUserLoggedIn(user) && Boolean(user?.verified);

export { isUserVerified, isUserLoggedIn };
