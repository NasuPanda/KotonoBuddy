// src/features/entry/FontToggle.tsx
import React from 'react';

interface FontToggleProps {
  value: 'sans' | 'hand';
  onChange: (font: 'sans' | 'hand') => void;
}

export default function FontToggle({ value, onChange }: FontToggleProps) {
  // for now, do nothing
  return null;
}
