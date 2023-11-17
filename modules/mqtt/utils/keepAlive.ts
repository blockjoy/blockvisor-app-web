export const keepAlive = (interval = 15000) => {
  const ctx: Worker = self as any;

  const keepAliveInterval = setInterval(() => {
    ctx.postMessage('keep-alive');
  }, interval);

  return keepAliveInterval;
};

export const createWebWorker = (func: Function) => {
  if (typeof func !== 'function') {
    throw new TypeError('The argument must be a function.');
  }

  try {
    const worker = new Worker(
      URL.createObjectURL(
        new Blob(['(' + func.toString() + ')()'], { type: 'text/javascript' }),
      ),
    );

    return worker;
  } catch (error) {
    console.error('Failed to create web worker:', error);
    throw error;
  }
};
