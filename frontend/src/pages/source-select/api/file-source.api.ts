import { ResultAsync } from "neverthrow";
import {
  OpenExcelFile,
  ParseOrdersExcelFile,
  SheetsFromExcelFile,
} from "@wailsjs/go/main/App";
import { mapToErrorIfEmpty } from "@/utils";

export function openFile(): ResultAsync<string, unknown> {
  return ResultAsync.fromPromise(
    OpenExcelFile(),
    (error) => error,
  ).andThen(mapToErrorIfEmpty);
}

export function getSheetsFromFile(
  path: string,
): ResultAsync<string[], unknown> {
  return ResultAsync.fromPromise(
    SheetsFromExcelFile(path),
    (error) => error,
  );
}

export function parseOrdersFile(
  path: string,
  sheet: string,
): ResultAsync<void, unknown> {
  return ResultAsync.fromPromise(
    ParseOrdersExcelFile(path, sheet),
    (error) => error,
  );
}
