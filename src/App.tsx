// src/App.tsx
import { useState } from 'react';
import EntryCanvas from "./features/entry/EntryCanvas";
import DebugEntries from './features/entry/DebugEntries';
import Header from './components/Header';
import { WordSelectionScreen } from './features/wordSelection';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'entry' | 'wordSelection'>('entry');
  const [currentSentence, setCurrentSentence] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

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
            <h1>KotonoBuddy – Entry Test</h1>
            <EntryCanvas onSentenceSubmit={handleSentenceSubmit} />

            <div className="debug-section">
              <div className="debug-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Debug: Entries So Far
              </div>
              <DebugEntries />
            </div>
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
