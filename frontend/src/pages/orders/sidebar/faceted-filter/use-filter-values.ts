import { useState } from "react";

export function useFilterValues<T>(callback: (values: T[]) => void) {
  const [array, setArray] = useState<T[]>([]);

  const hasValue = (value: T) => array.includes(value);

  function toggleValue(value: T) {
    setArray((values) => {
      const newArray = values.includes(value)
        ? values.filter((toCompare) => value !== toCompare)
        : [...values, value];

      callback(newArray);

      return newArray;
    });
  }

  function clearValues() {
    setArray([]);
    callback([]);
  }

  return { array, hasValue, toggleValue, clearValues } as const;
}
