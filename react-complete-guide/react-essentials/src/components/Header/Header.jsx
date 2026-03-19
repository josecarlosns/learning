import './Header.css';
import reactImg from '../../assets/react-core-concepts.png';

export const descriptions = [
  'Crucial',
  'Important',
  'Essential',
  'Key',
  'Vital',
  'Fundamental',
];

export function getrandomint(max) {
  return Math.floor(Math.random() * (max + 1));
}

export function Header() {
  const prefix = descriptions[getrandomint(descriptions.length - 1)];

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {prefix} React concepts you will need for almost any app you are going
        to build!
      </p>
    </header>
  );
}
