'use client';

import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import createCache from '@emotion/cache';

type EmotionProviderProps = {
  children: React.ReactNode;
};

const isBrowser = typeof document !== 'undefined';

// workaround for emotion support, taken from https://github.com/emotion-js/emotion/issues/2928

const createEmotionCache = () => {
  let insertionPoint: HTMLMetaElement | undefined;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );

    insertionPoint = emotionInsertionPoint ?? undefined;
  }
  const cache = createCache({ key: 'css', insertionPoint });
  cache.compat = true;
  const prevInsert = cache.insert;
  let inserted: string[] = [];
  cache.insert = (...args) => {
    const serialized = args[1];
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }
    return prevInsert(...args);
  };
  const flush = () => {
    const prevInserted = inserted;
    inserted = [];
    return prevInserted;
  };
  return { cache, flush };
};

export const EmotionProvider = (props: EmotionProviderProps) => {
  const [{ cache, flush }] = useState(createEmotionCache);

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache} {...props} />;
};
