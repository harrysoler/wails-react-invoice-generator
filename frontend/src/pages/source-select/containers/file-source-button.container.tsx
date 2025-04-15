import { File } from "lucide-react";

import { SourceButton } from "@/pages/source-select/components";
import { handleError } from "@/utils";
import { openFile } from "@/pages/source-select/api";

type FileSourceButtonProps = {
  onSelectFile: (path: string) => void;
};

export function FileSourceButton(props: FileSourceButtonProps) {
  async function onClick() {
    const openResult = await openFile();

    openResult.match(
      props.onSelectFile,
      handleError,
    );
  }

  return <SourceButton icon={File} title="Archivo local" onClick={onClick} />;
}
