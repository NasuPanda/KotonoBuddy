// src/components/ui/DebugCard.tsx
import { ReactNode } from 'react';
import styles from './DebugCard.module.css';

interface DebugCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function DebugCard({ title, icon, children }: DebugCardProps) {
  return (
    <div className={styles.debugSection}>
      <div className={styles.debugTitle}>
        {icon || (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        )}
        {title}
      </div>
      <div className={styles.debugContent}>
        {children}
      </div>
    </div>
  );
}
