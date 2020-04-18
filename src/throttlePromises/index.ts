/**
 * Function to throttle concurrent execution of promises. Starts X concurrent promises, with each promise triggering
 * the next promise from the top of the queued promises until there are none left. When all threads have reached the
 * end of the queue, Promise.all resolves and the function returns.
 *
 * @param deferredPromises
 * @param concurrencyLimit
 */
export async function throttlePromises<PromiseResult>(
  deferredPromises: (() => Promise<PromiseResult>)[],
  concurrencyLimit: number,
): Promise<PromiseResult[]> {
  const promisesQueue = [...deferredPromises];
  const promiseResults: PromiseResult[] = [];

  // Recursive function chains the next promise after each execution completes
  const beginNext = async (): Promise<void> => {
    const nextPromise = promisesQueue.shift();

    if (nextPromise === undefined) {
      return Promise.resolve();
    }

    try {
      const promiseResult = await nextPromise();

      promiseResults.push(promiseResult);
    } catch ({ message }) {
      console.error(message);
    }

    return beginNext();
  };

  // Start off the first X promises
  await Promise.all(deferredPromises.slice(0, concurrencyLimit).map(beginNext));

  return promiseResults;
}
