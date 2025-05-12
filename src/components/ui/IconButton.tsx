// src/components/ui/IconButton.tsx
import { ButtonHTMLAttributes } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  alt?: string;
  label: string;
  className?: string;
}

export default function IconButton({
  icon,
  alt = '',
  label,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${className}`}
      aria-label={label}
      {...props}
    >
      <img src={icon} alt={alt} />
    </button>
  );
}
