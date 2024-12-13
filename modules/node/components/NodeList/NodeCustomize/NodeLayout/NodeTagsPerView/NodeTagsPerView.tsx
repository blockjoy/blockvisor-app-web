import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useDebounce } from '@shared/index';
import { Tooltip } from '@shared/components';
import { layoutSelectors } from '@modules/layout';
import { useSettings } from '@modules/settings';
import { styles } from './NodeTagsPerView.styles';

export const NodeTagsPerView = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tagsPerView = useRecoilValue(layoutSelectors.tableTagsPerView);

  const [currentTagsPerView, setCurrentTagsPerView] = useState(tagsPerView);
  const debouncedTagsPerView = useDebounce(currentTagsPerView, 500);

  const { updateSettings } = useSettings();

  useEffect(() => {
    if (tagsPerView !== debouncedTagsPerView) {
      updateSettings('layout', {
        'nodes.table.tagsPerView': debouncedTagsPerView,
      });
    }
  }, [debouncedTagsPerView]);

  const handleTagsPerView = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 20) {
      e.preventDefault();

      return;
    }

    setCurrentTagsPerView(value);
  };

  return (
    <div css={styles.wrapper} onClick={() => inputRef.current?.focus()}>
      <label htmlFor="tag-count" css={styles.label}>
        Number of tags
      </label>
      <input
        ref={inputRef}
        id="tag-count"
        type="number"
        value={currentTagsPerView}
        css={styles.input}
        onChange={handleTagsPerView}
        min={1}
        max={20}
      />
      <Tooltip
        noWrap
        top="-30px"
        left="50%"
        tooltip="Min 1, max 20 tags per view"
      />
    </div>
  );
};
