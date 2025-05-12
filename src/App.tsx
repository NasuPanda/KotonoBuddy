// src/App.tsx
import { useState } from 'react';
import { EntryCanvas, DebugEntries } from './features/entry';
import { Header } from './components/ui';
import { WordSelectionScreen } from './features/wordSelection';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'entry' | 'wordSelection'>('entry');
  const [currentSentence, setCurrentSentence] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  console.log("selected words are:", selectedWords);

  // Handler for when a sentence is submitted from EntryCanvas
  const handleSentenceSubmit = (sentence: string) => {
    setCurrentSentence(sentence);
    setCurrentScreen('wordSelection');
  };

  // Handler for word selection completion
  const handleSelectionComplete = (words: string[]) => {
    setSelectedWords(words);
    setCurrentScreen('entry');
    // Here you would typically save the entry with the selected words
  };

  // Handler to go back to entry screen
  const handleBack = () => {
    setCurrentScreen('entry');
  };

  return (
    <div className="app-container">
      <Header />

      <div className="content-container">
        {currentScreen === 'entry' ? (
          <>
            <h1>A book title</h1>
            <EntryCanvas onSentenceSubmit={handleSentenceSubmit} />

            <DebugEntries />
          </>
        ) : (
          <WordSelectionScreen
            sentence={currentSentence}
            onComplete={handleSelectionComplete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}

export default App;
