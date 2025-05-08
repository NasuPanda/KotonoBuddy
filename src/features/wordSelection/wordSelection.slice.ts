// src/features/wordSelection/wordSelection.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WordSelectionState {
  sentence: string;
  selectedWords: string[];
  translations: Record<string, string>;
  images: Record<string, string>;
  audio: Record<string, string>;
}

const initialState: WordSelectionState = {
  sentence: '',
  selectedWords: [],
  translations: {},
  images: {},
  audio: {},
};

const wordSelectionSlice = createSlice({
  name: 'wordSelection',
  initialState,
  reducers: {
    setSentence(
      state: WordSelectionState,
      action: PayloadAction<string>
    ) {
      state.sentence = action.payload;
    },
    addSelectedWord(
      state: WordSelectionState,
      action: PayloadAction<string>
    ) {
      const word = action.payload;
      if (!state.selectedWords.includes(word)) {
        state.selectedWords.push(word);
      }
    },
    removeSelectedWord(
      state: WordSelectionState,
      action: PayloadAction<string>
    ) {
      const word = action.payload;
      state.selectedWords = state.selectedWords.filter(w => w !== word);
    },
    setTranslation(
      state: WordSelectionState,
      action: PayloadAction<{ word: string; translation: string }>
    ) {
      const { word, translation } = action.payload;
      state.translations[word] = translation;
    },
    setImage(
      state: WordSelectionState,
      action: PayloadAction<{ word: string; imageUrl: string }>
    ) {
      const { word, imageUrl } = action.payload;
      state.images[word] = imageUrl;
    },
    setAudio(
      state: WordSelectionState,
      action: PayloadAction<{ word: string; audioUrl: string }>
    ) {
      const { word, audioUrl } = action.payload;
      state.audio[word] = audioUrl;
    },
    clearWordSelection(state: WordSelectionState) {
      state.sentence = '';
      state.selectedWords = [];
      state.translations = {};
      state.images = {};
      state.audio = {};
    },
  },
});

export const {
  setSentence,
  addSelectedWord,
  removeSelectedWord,
  setTranslation,
  setImage,
  setAudio,
  clearWordSelection,
} = wordSelectionSlice.actions;

export default wordSelectionSlice.reducer;
