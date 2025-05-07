// src/features/entry/EntryCanvas.tsx

import { useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import styles from './EntryCanvas.module.css';
import { useEntryStore } from './entry.slice';

interface EntryCanvasProps {
  onSentenceSubmit: (sentence: string) => void;
}

export default function EntryCanvas({ onSentenceSubmit }: EntryCanvasProps) {
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

  // On Enter, capture the entry, clear, and notify parent
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = draft.trim();
      if (text) {
        // Add to local store
        addEntry(text);
        // Clear draft for next entry
        setDraft('');
        if (ref.current) {
          ref.current.innerText = '';
        }
        // Notify parent (App) that a new sentence was submitted
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
