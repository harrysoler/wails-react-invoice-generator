import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SourceButtonRow } from "./source-button-row.component";
import { SourceButton } from "./source-button.component";
import { Cloud, File } from "lucide-react";

type OrdersSourceCardProps = {
  onClickLocalFile: () => void;
};

export function OrdersSourceCard(
  { onClickLocalFile }: OrdersSourceCardProps,
) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Bienvenido</CardTitle>
        <CardDescription>
          Selecciona tu archivo localmente o de la nube
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SourceButtonRow>
          <SourceButton
            icon={File}
            title="Archivo local"
            onClick={onClickLocalFile}
          />
          <SourceButton icon={Cloud} title="OneDrive" disabled />
        </SourceButtonRow>
      </CardContent>
    </Card>
  );
}
