import { usePromiseModal } from "@prezly/react-promise-modal";
import { SheetSelectDialog } from "./sheet-select-dialog.component";
import { err, ok, ResultAsync } from "neverthrow";

export function useSelectSheet() {
  const sheetSelectDialog = usePromiseModal<string, { sheets: string[] }>(
    (props) => <SheetSelectDialog {...props} />,
  );

  function selectSheet(sheets: string[]) {
    return ResultAsync.fromPromise(
      sheetSelectDialog.invoke({ sheets }),
      () => {},
    ).andThen(voidErrorIfUndefined);
  }

  return [sheetSelectDialog.modal, selectSheet] as const;
}

const voidErrorIfUndefined = <T,>(v: T | undefined) =>
  v === undefined ? err() : ok(v);
