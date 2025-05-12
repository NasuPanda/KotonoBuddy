// src/features/entry/DebugEntries.tsx
import { useEntryStore } from './entry.slice';
import { DebugCard } from '../../components/ui';

export default function DebugEntries() {
  console.log('🔍 DebugEntries render');
  const entries = useEntryStore(s => s.entries);

  return (
    <DebugCard title="Debug: Entries So Far">
      {entries.length === 0 ? (
        <p><em>No entries yet—type something above and hit Enter.</em></p>
      ) : (
        <ul className="entriesList">
          {entries.map((e, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>
              {i + 1}. "{e}"
            </li>
          ))}
        </ul>
      )}
    </DebugCard>
  );
}
