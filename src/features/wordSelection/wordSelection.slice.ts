// src/features/wordSelection/wordSelection.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WordSelectionState {
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
  audio: {}
};

const wordSelectionSlice = createSlice({
  name: 'wordSelection',
  initialState,
  reducers: {
    setSentence(state, action: PayloadAction<string>) {
      state.sentence = action.payload;
    },
    addSelectedWord(state, action: PayloadAction<string>) {
      if (!state.selectedWords.includes(action.payload)) {
        state.selectedWords.push(action.payload);
      }
    },
    removeSelectedWord(state, action: PayloadAction<string>) {
      state.selectedWords = state.selectedWords.filter(word => word !== action.payload);
    },
    setTranslation(state, action: PayloadAction<{ word: string; translation: string }>) {
      state.translations[action.payload.word] = action.payload.translation;
    },
    setImage(state, action: PayloadAction<{ word: string; imageUrl: string }>) {
      state.images[action.payload.word] = action.payload.imageUrl;
    },
    setAudio(state, action: PayloadAction<{ word: string; audioUrl: string }>) {
      state.audio[action.payload.word] = action.payload.audioUrl;
    },
    clearWordSelection(state) {
      state.sentence = '';
      state.selectedWords = [];
      state.translations = {};
      state.images = {};
      state.audio = {};
    }
  }
});

export const {
  setSentence,
  addSelectedWord,
  removeSelectedWord,
  setTranslation,
  setImage,
  setAudio,
  clearWordSelection
} = wordSelectionSlice.actions;

export default wordSelectionSlice.reducer;
