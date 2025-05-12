// src/components/PaperPage.tsx
import { ReactNode } from 'react';
import styles from './PaperPage.module.css';

interface PaperPageProps {
  children: ReactNode;
}

export default function PaperPage({ children }: PaperPageProps) {
  return <div className={styles.page}>{children}</div>;
}
