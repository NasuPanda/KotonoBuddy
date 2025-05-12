// src/features/wordSelection/WordToolbar.tsx
import { Toolbar, ToolbarButton } from '../../components/ui';

interface WordToolbarProps {
  position: { x: number; y: number };
  onTranslation: () => void;
  onImage: () => void;
  onAudio: () => void;
}

const WordToolbar: React.FC<WordToolbarProps> = ({
  position,
  onTranslation,
  onImage,
  onAudio
}) => {
  return (
    <Toolbar position={position}>
      <ToolbarButton
        icon="📖"
        title="Translation/Definition"
        onClick={onTranslation}
      />
      <ToolbarButton
        icon="🖼"
        title="Image/Sketch"
        onClick={onImage}
      />
      <ToolbarButton
        icon="🔊"
        title="Audio Pronunciation"
        onClick={onAudio}
      />
    </Toolbar>
  );
};

export default WordToolbar;
