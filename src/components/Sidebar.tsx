'use client';

import TopActions from './TopActions';
import FilterSection from './FilterSection';
import styles from '@/styles/filters.module.css';

export default function Sidebar() {
  const handleReset = () => window.location.reload();
  const handleApply = () => alert('Filters applied');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterPanel}>
        <TopActions onReset={handleReset} onApply={handleApply} />
        <FilterSection label="Job Title" endpoint="job-titles" />
        <FilterSection label="Company" endpoint="companies" />
        <FilterSection label="Location" endpoint="locations" />
        <FilterSection label="Experience Level" endpoint="experience" />
      </div>
    </aside>
  );
}
