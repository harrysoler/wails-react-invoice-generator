import { err, ok } from "neverthrow";

export function mapToErrorIfUndefined<T>(value: T | undefined) {
  return value === undefined ? err() : ok(value);
}

export function mapToErrorIfEmpty(value: string) {
  return value === "" ? err() : ok(value);
}
