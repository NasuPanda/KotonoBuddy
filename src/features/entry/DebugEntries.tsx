// src/features/entry/DebugEntries.tsx
import { useEntryStore } from './entry.slice';

export default function DebugEntries() {
  console.log('🔍 DebugEntries render');
  const entries = useEntryStore(s => s.entries);

  if (entries.length === 0) {
    return <p><em>No entries yet—type something above and hit Enter.</em></p>;
  }

  return (
    <ul className="entriesList">
      {entries.map((e, i) => (
        <li key={i} style={{ marginBottom: '0.5rem' }}>
          {i + 1}. "{e}"
        </li>
      ))}
    </ul>
  );
}
