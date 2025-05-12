// src/features/wordSelection/WordSelectionScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import WordToolbar from './WordToolbar';
import styles from './WordSelectionScreen.module.css';
import { PaperPage, Button } from '../../components/ui';

interface WordSelectionScreenProps {
  sentence: string;
  onComplete: (selectedWords: string[]) => void;
  onBack: () => void;
}

export default function WordSelectionScreen({
  sentence,
  onComplete,
  onBack
}: WordSelectionScreenProps) {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWords(sentence.trim().split(/\s+/));
  }, [sentence]);

  const handleWordClick = (index: number, e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const parentRect = containerRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
    const pos = {
      x: rect.left + rect.width/2 - parentRect.left,
      y: rect.bottom - parentRect.top + 8
    };
    if (selectedWordIndex === index) {
      setSelectedWordIndex(null);
      setToolbarVisible(false);
    } else {
      setSelectedWordIndex(index);
      setToolbarPosition(pos);
      setToolbarVisible(true);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setToolbarVisible(false);
      setSelectedWordIndex(null);
    }
  };

  const toggleWordSelection = (index: number) => {
    const w = words[index];
    setSelectedWords(prev =>
      prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]
    );
  };

  const handleTranslation = () => {
      if (selectedWordIndex !== null) {
        toggleWordSelection(selectedWordIndex);
      }
    };
  const handleImage = () => { console.log('Image for', words[selectedWordIndex!]); };
  const handleAudio = () => { console.log('Audio for', words[selectedWordIndex!]); };
  const handleComplete = () => onComplete(selectedWords);

  return (
    <PaperPage>
      <div
        className={styles.containerInner}
        ref={containerRef}
        onClick={handleBackgroundClick}
      >
        <div className={styles.sentenceBlock}>
          {words.map((w, i) => (
            <span
              key={i}
              className={`
                ${styles.word}
                ${selectedWordIndex === i ? styles.activeWord : ''}
                ${selectedWords.includes(w) ? styles.selectedWord : ''}
              `}
              onClick={e => { e.stopPropagation(); handleWordClick(i, e); }}
            >
              {w}
            </span>
          ))}
        </div>

        {toolbarVisible && selectedWordIndex !== null && (
          <WordToolbar
            position={toolbarPosition}
            onTranslation={handleTranslation}
            onImage={handleImage}
            onAudio={handleAudio}
          />
        )}

        <div className={styles.actionButtons}>
            <Button className={styles.backButton} variant="back" onClick={onBack}>Back</Button>
            <Button className={styles.doneButton} variant="done" onClick={handleComplete}>Done</Button>
        </div>
      </div>
    </PaperPage>
  );
}
