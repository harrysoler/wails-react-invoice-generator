import { useState } from "react";

export function useToggleArray<T>(values?: T[], onChange?: (values: T[]) => void) {
  const [array, setArray] = useState<T[]>(values ?? []);
  const has = (value: T) => array.includes(value);

  function toggle(value: T) {
    setArray((prevArray) => {
      const newValues = toggleArrayValue(prevArray, value);
      onChange?.(newValues);
      return newValues;
    });
  }

  function clear() {
    setArray([]);
    onChange?.([]);
  }

  return { array, has, toggle, clear } as const;
}

function toggleArrayValue<T>(array: T[], value: T) {
  return array.includes(value)
    ? array.filter((toCompare) => value !== toCompare)
    : [...array, value];
}
