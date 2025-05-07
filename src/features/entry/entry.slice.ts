import { create } from 'zustand'; // ✅ use the named import

interface EntryState {
  draft: string;
  entries: string[];
  setDraft: (t: string) => void;
  addEntry: (sentence: string) => void;
}

export const useEntryStore = create<EntryState>((set) => ({
  draft: '',
  entries: [],
  setDraft: (draft) => set({ draft }),
  addEntry: (sentence) =>
    set((state) => ({ entries: [...state.entries, sentence] })),
}));
