import styles from '@/styles/filters.module.css';

type Props = {
  suggestions: string[];
  onInclude: (val: string) => void;
  onExclude: (val: string) => void;
};

export default function SuggestionDropdown({ suggestions, onInclude, onExclude }: Props) {
  return (
    <ul className={styles.dropdown}>
      {suggestions.map((s, i) => (
        <li key={i} className={styles.dropdownItem}>
          {s}
          <span className={styles.dropdownActions}>
            <button onClick={() => onInclude(s)} className={styles.includeAction}>Include</button> |{' '}
            <button onClick={() => onExclude(s)} className={styles.excludeAction}>Exclude</button>
          </span>
        </li>
      ))}
    </ul>
  );
}
