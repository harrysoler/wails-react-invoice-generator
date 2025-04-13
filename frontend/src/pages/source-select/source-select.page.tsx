import { OrdersSourceCard } from "./orders-source-card.component";
import { FileSourceButton } from "./file-source-button.component";
import { SourceButtonRow } from "./source-button-row.component";
import { SourceButton } from "./source-button.component";
import { useSelectSheet } from "./use-select-sheet";
import { Cloud } from "lucide-react";

import logo from "@/assets/images/logo.webp";
import { getSheetsFromFile, parseOrdersFile } from "./file-source.api";
import { handleError } from "@/helpers/error-handler";
import { useLocation } from "wouter";

export function SourceSelectPage() {
  const [sheetDialog, selectSheet] = useSelectSheet();
  const [_, navigate] = useLocation();

  async function onSelectFile(path: string) {
    const parseResult = await getSheetsFromFile(path)
      .andThen(selectSheet)
      .andThen((sheet) => parseOrdersFile(path, sheet));

    parseResult.match(
      () => navigate("/orders"),
      handleError,
    );
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex flex-col items-center w-full max-w-sm flex-col gap-6">
        <img src={logo} alt="" className="w-36" />
        <OrdersSourceCard>
          <SourceButtonRow>
            <FileSourceButton onSelectFile={onSelectFile} />
            <SourceButton icon={Cloud} title="OneDrive" disabled />
          </SourceButtonRow>
          {sheetDialog}
        </OrdersSourceCard>
      </div>
    </main>
  );
}
