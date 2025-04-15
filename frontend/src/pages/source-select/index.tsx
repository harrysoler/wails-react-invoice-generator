import { useLocation } from "wouter";
import { Cloud } from "lucide-react";

import { OrdersSourceCard, SourceButton, SourceButtonRow } from "@/pages/source-select/components";
import { getSheetsFromFile, parseOrdersFile } from "@/pages/source-select/api";
import { FileSourceButton } from "@/pages/source-select/containers";
import { useSelectSheet } from "@/pages/source-select/hooks";
import { handleError } from "@/utils";
import logo from "@/assets/images/logo.webp";

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
