// src/App.tsx
import EntryCanvas from "./features/entry/EntryCanvas";
import DebugEntries from './features/entry/DebugEntries';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />

      <div className="content-container">
        <h1>KotonoBuddy – Entry Test</h1>
        <EntryCanvas />

        <div className="debug-section">
          <div className="debug-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Debug: Entries So Far
          </div>
          <DebugEntries />
        </div>
      </div>
    </div>
  );
}

export default App;
