import styles from '@/styles/filters.module.css';

export default function TopActions({ onReset, onApply }: {
  onReset: () => void;
  onApply: () => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
      <button className={styles.button} onClick={onReset}>Reset</button>
      <button className={styles.button} onClick={onApply}>Apply Filters</button>
    </div>
  );
}
