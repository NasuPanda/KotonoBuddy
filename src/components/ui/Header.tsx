// src/components/ui/Header.tsx
import styles from './Header.module.css';
import backArrow from '../../assets/icons/back-arrow.svg';
import gear from '../../assets/icons/gear.svg';

interface HeaderProps {
  title?: string;
  onBackClick?: () => void;
  onSettingsClick?: () => void;
  transparent?: boolean;
}

export default function Header({
  title = 'KotonoBuddy',
  onBackClick,
  onSettingsClick,
  transparent = false
}: HeaderProps) {
  return (
    <header className={`${styles.headerBar} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.leftSection}>
        <button
          className={styles.backButton}
          onClick={onBackClick}
          aria-label="Back"
        >
          <img src={backArrow} alt="Back" />
        </button>
      </div>

      <div className={styles.centerSection}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.rightSection}>
        <button
          className={styles.settingsButton}
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          <img src={gear} alt="Settings" />
        </button>
      </div>
    </header>
  );
}
