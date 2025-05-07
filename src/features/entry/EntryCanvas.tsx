// src/features/entry/EntryCanvas.tsx

import React, { useRef, useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import styles from './EntryCanvas.module.css';
import { useEntryStore } from './entry.slice';
import FontToggle from './FontToggle';

export default function EntryCanvas() {
  // Local UI state for font choice
  const [font, setFont] = useState<'sans' | 'hand'>('sans');
  // Global entry state via Zustand
  const draft = useEntryStore((s) => s.draft);
  const addEntry = useEntryStore((s) => s.addEntry);
  const setDraft = useEntryStore((s) => s.setDraft);

  // Ref to our contentEditable div
  const ref = useRef<HTMLDivElement>(null);

  // Update draft text as user types
  const handleInput = () => {
    setDraft(ref.current?.innerText || '');
  };

  // On Enter, capture the entry and clear
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = draft.trim();
      if (text) {
        addEntry(text);
        setDraft('');
        if (ref.current) ref.current.innerText = '';
      }
    }
  };

  return (
    <>
      {/* Toggle between sans-serif and handwriting fonts */}
      <FontToggle value={font} onChange={setFont} />

      {/* Paper-like canvas with a subtle "inscribing" animation */}
      <motion.div
        className={styles.canvas}
        animate={{ backgroundPositionX: [0, 1, 0] }}
        transition={{ duration: 0.3 }}
      >
        <div
          ref={ref}
          className={`
            ${styles.typingArea}
            ${!draft ? styles.placeholder : ''}
            ${font === 'sans' ? 'sansFont' : 'handFont'}
          `}
          contentEditable
          data-placeholder="Today I noticed…"
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
      </motion.div>
    </>
  );
}
