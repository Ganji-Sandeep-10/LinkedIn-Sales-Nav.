import styles from '@/styles/filters.module.css';

type Props = {
  value: string;
  type: 'include' | 'exclude';
  onToggle: () => void;
  onRemove: () => void;
};

export default function FilterChip({ value, type, onToggle, onRemove }: Props) {
  return (
    <div className={`${styles.chip} ${type === 'include' ? styles.include : styles.exclude}`}>
      <span>{value}</span>
      <button onClick={onToggle}>
        {type === 'include' ? 'Exclude' : 'Include'}
      </button>
      <button onClick={onRemove} className={styles.close}>×</button>
    </div>
  );
}
