// src/features/entry/EntryCanvas.tsx
import { useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import styles from './EntryCanvas.module.css';
import { useEntryStore } from './entry.slice';
import PaperPage from '../../components/PaperPage';

interface EntryCanvasProps {
  onSentenceSubmit: (sentence: string) => void;
}

export default function EntryCanvas({ onSentenceSubmit }: EntryCanvasProps) {
  const draft = useEntryStore((s) => s.draft);
  const addEntry = useEntryStore((s) => s.addEntry);
  const setDraft = useEntryStore((s) => s.setDraft);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleInput = () => setDraft(ref.current?.innerText || '');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = draft.trim();
      if (text) {
        addEntry(text);
        setDraft('');
        if (ref.current) ref.current.innerText = '';
        onSentenceSubmit(text);
      }
    }
  };

  return (
    <PaperPage>
      <motion.div
        className={styles.inner}
        animate={{ backgroundPositionX: [0, 1, 0] }}
        transition={{ duration: 0.3 }}
      >
        <div
          ref={ref}
          tabIndex={0}
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
    </PaperPage>
  );
}
