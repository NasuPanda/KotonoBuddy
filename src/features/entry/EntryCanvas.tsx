// src/features/entry/EntryCanvas.tsx

import { useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import styles from './EntryCanvas.module.css';
import { useEntryStore } from './entry.slice';

interface EntryCanvasProps {
  onSentenceSubmit: (sentence: string) => void;
}

export default function EntryCanvas({ onSentenceSubmit }: EntryCanvasProps) {
  const draft = useEntryStore((s) => s.draft);
  const addEntry = useEntryStore((s) => s.addEntry);
  const setDraft = useEntryStore((s) => s.setDraft);

  // Create a ref to your contentEditable div
  const ref = useRef<HTMLDivElement>(null);

  // Auto‐focus on mount
  useEffect(() => {
    // small delay sometimes helps if you have other animations
    ref.current?.focus();
  }, []);

  const handleInput = () => {
    setDraft(ref.current?.innerText || '');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = draft.trim();
      if (text) {
        addEntry(text);
        setDraft('');
        ref.current!.innerText = '';
        onSentenceSubmit(text);
      }
    }
  };

  return (
    <motion.div
      className={styles.canvas}
      animate={{ backgroundPositionX: [0, 1, 0] }}
      transition={{ duration: 0.3 }}
    >
      <div
        ref={ref}
        tabIndex={0}                   /* ← allow focus */
        className={`
          ${styles.typingArea}
          ${!draft ? styles.placeholder : ''}
        `}
        contentEditable
        data-placeholder="Today I noticed…"
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
    </motion.div>
  );
}
