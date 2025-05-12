// src/components/ui/ToolbarButton.tsx
import { ButtonHTMLAttributes } from 'react';
import styles from './ToolbarButton.module.css';

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  title: string;
}

export default function ToolbarButton({
  icon,
  title,
  onClick,
  ...props
}: ToolbarButtonProps) {
  return (
    <button
      className={styles.toolbarButton}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      title={title}
      {...props}
    >
      {icon}
    </button>
  );
}
