import { mapToErrorIfUndefined } from "@/utils";
import { SheetSelectDialog } from "./sheet-select-dialog.component";
import { usePromiseModal } from "@prezly/react-promise-modal";
import { ResultAsync } from "neverthrow";

export function useSelectSheet() {
  const sheetSelectDialog = usePromiseModal<string, { sheets: string[] }>(
    (props) => <SheetSelectDialog {...props} />,
  );

  function selectSheet(sheets: string[]) {
    return ResultAsync.fromPromise(
      sheetSelectDialog.invoke({ sheets }),
      () => {},
    ).andThen(mapToErrorIfUndefined);
  }

  return [sheetSelectDialog.modal, selectSheet] as const;
}
