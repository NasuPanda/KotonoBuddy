// src/features/wordSelection/WordSelectionScreen.tsx

import { useState, useRef, useEffect } from 'react';
import styles from './WordSelectionScreen.module.css';
import WordToolbar from './WordToolbar';

interface WordSelectionScreenProps {
  sentence: string;
  onComplete: (selectedWords: string[]) => void;
  onBack: () => void;
}

const WordSelectionScreen: React.FC<WordSelectionScreenProps> = ({
  sentence,
  onComplete,
  onBack
}) => {
  const [words, setWords] = useState<string[]>([]);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Split sentence into words when component mounts
  useEffect(() => {
    // Simple word splitting (for more complex languages, this would need enhancement)
    const wordArray = sentence.trim().split(/\s+/);
    setWords(wordArray);
  }, [sentence]);

  // Handle word selection
  const handleWordClick = (index: number, event: React.MouseEvent) => {
    const wordElement = event.currentTarget as HTMLElement;
    const rect = wordElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect() || { top: 0, left: 0 };

    // Calculate position for toolbar (centered under the word)
    const newPosition = {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.bottom - containerRect.top + 8
    };

    if (selectedWordIndex === index) {
      // Toggle selection off if clicking the same word
      setSelectedWordIndex(null);
      setToolbarVisible(false);
    } else {
      // Select new word
      setSelectedWordIndex(index);
      setToolbarPosition(newPosition);
      setToolbarVisible(true);
    }
  };

  // Handle background click to hide toolbar
  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (event.target === containerRef.current) {
      setToolbarVisible(false);
      setSelectedWordIndex(null);
    }
  };

  // Toggle word selection for saving
  const toggleWordSelection = (index: number) => {
    const word = words[index];
    setSelectedWords(prev => {
      if (prev.includes(word)) {
        return prev.filter(w => w !== word);
      } else {
        return [...prev, word];
      }
    });
  };

  // Handle toolbar actions
  const handleTranslation = () => {
    if (selectedWordIndex !== null) {
      toggleWordSelection(selectedWordIndex);
    }
  };

  const handleImage = () => {
    // Image/sketch functionality would be implemented here
    console.log("Image action for:", words[selectedWordIndex!]);
  };

  const handleAudio = () => {
    // Audio pronunciation functionality would be implemented here
    console.log("Audio action for:", words[selectedWordIndex!]);
  };

  // Complete selection process
  const handleComplete = () => {
    onComplete(selectedWords);
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onClick={handleBackgroundClick}
    >
      <div className={styles.sentenceBlock}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`
              ${styles.word}
              ${selectedWordIndex === index ? styles.activeWord : ''}
              ${selectedWords.includes(word) ? styles.selectedWord : ''}
            `}
            onClick={(e) => handleWordClick(index, e)}
          >
            {word}
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
        <button className={styles.backButton} onClick={onBack}>
          Back
        </button>
        <button className={styles.doneButton} onClick={handleComplete}>
          Done
        </button>
      </div>
    </div>
  );
};

export default WordSelectionScreen;
