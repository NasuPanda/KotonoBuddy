// src/components/ui/Toolbar.tsx
import { useRef, useEffect, ReactNode } from 'react';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  position: { x: number; y: number };
  children: ReactNode;
}

export default function Toolbar({
  position,
  children
}: ToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Ensure toolbar stays within viewport bounds
  useEffect(() => {
    if (toolbarRef.current) {
      const toolbar = toolbarRef.current;
      const rect = toolbar.getBoundingClientRect();

      // Get the parent container boundaries
      const parentElem = toolbar.parentElement;
      if (!parentElem) return;
      const parentRect = parentElem.getBoundingClientRect();

      // Adjust x position if toolbar would go out of bounds
      let adjustedX = position.x;
      if (position.x - rect.width / 2 < 0) {
        adjustedX = rect.width / 2;
      } else if (position.x + rect.width / 2 > parentRect.width) {
        adjustedX = parentRect.width - rect.width / 2;
      }

      // Update position
      toolbar.style.left = `${adjustedX}px`;
      toolbar.style.top = `${position.y}px`;
    }
  }, [position]);

  return (
    <div
      className={styles.toolbar}
      ref={toolbarRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {children}
    </div>
  );
}
