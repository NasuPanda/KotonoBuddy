// src/components/Header.tsx
import backArrow from '../assets/icons/back-arrow.svg';
import gear from '../assets/icons/gear.svg';

export default function Header() {
  return (
    <header className="header-bar">
      <button className="back-button" aria-label="Back">
        <img src={backArrow} alt="" />
      </button>

      <h2>KotonoBuddy</h2>

      <button className="settings-button" aria-label="Settings">
        <img src={gear} alt="" />
      </button>
    </header>
  );
}
