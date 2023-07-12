type ErrorHandler<Error, Result> = (
  error: Error,
  resolve: (value: Result | PromiseLike<Result>) => void,
  reject: (reason?: any) => void,
) => void;

export const handleErrorCode: ErrorHandler<any, any | null> = (
  error,
  resolve,
  reject,
) => {
  if (error.error_code === 'resource_not_found') {
    resolve(null);
  } else {
    reject(error);
  }
};
