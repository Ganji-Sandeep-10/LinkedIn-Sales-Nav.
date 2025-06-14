"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import FilterChip from "./FilterChip";
import SuggestionDropdown from "./SuggestionDropdown";
import styles from "@/styles/filters.module.css";

type Props = {
  label: string;
  endpoint: string;
};

export default function FilterSection({ label, endpoint }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filters, setFilters] = useState<
    { value: string; type: "include" | "exclude" }[]
  >([]);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // ✅ useCallback memoized function to avoid useEffect warning
  const fetchSuggestions = useCallback(
    async (q: string) => {
      try {
        const res = await fetch(`/api/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error("Suggestion fetch error:", err);
        setSuggestions([]);
      }
    },
    [endpoint]
  );

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fetchSuggestions(query), 400);
  }, [query, fetchSuggestions]); // ✅ safe & clean

  const addFilter = (val: string, type: "include" | "exclude") => {
    if (!filters.find((f) => f.value === val)) {
      setFilters((prev) => [...prev, { value: val, type }]);
    }
    setQuery("");
    setSuggestions([]);
  };

  const toggleFilter = (val: string) => {
    setFilters((prev) =>
      prev.map((f) =>
        f.value === val
          ? { ...f, type: f.type === "include" ? "exclude" : "include" }
          : f
      )
    );
  };

  const removeFilter = (val: string) => {
    setFilters((prev) => prev.filter((f) => f.value !== val));
  };

  return (
    <div className={styles.filterBlock}>
      <div className={styles.labelRow}>
        <h4>{label}</h4>
        <div className={styles.inputWrapper}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.inputBox}
            placeholder={`Search ${label.toLowerCase()}...`}
          />
          {suggestions.length > 0 && (
            <SuggestionDropdown
              suggestions={suggestions}
              onInclude={(val) => addFilter(val, "include")}
              onExclude={(val) => addFilter(val, "exclude")}
            />
          )}
        </div>
      </div>

      {/* ✅ Chips start aligned with filter title */}
      <div className={styles.chipContainer}>
        {filters.map((f, idx) => (
          <FilterChip
            key={idx}
            value={f.value}
            type={f.type}
            onToggle={() => toggleFilter(f.value)}
            onRemove={() => removeFilter(f.value)}
          />
        ))}
      </div>
    </div>
  );
}
