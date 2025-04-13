import { Button } from "@/components/ui/button";
import { domain } from "@wailsjs/go/models";
import { ExternalLink, Loader2 } from "lucide-react";

type ExportOrderButtonProps = {
  order: domain.Order;
  onExport: (order: domain.Order) => void;
  isLoading: boolean;
};

export function ExportOrderButton(props: ExportOrderButtonProps) {
  function onClick() {
    props.onExport(props.order);
  }

  if (props.isLoading) {
    return (
      <Button disabled>
        <Loader2 className="animate-spin" />
        Generar Guia(s)
      </Button>
    );
  }

  return (
    <Button onClick={onClick}>
      <ExternalLink />
      Generar Guia(s)
    </Button>
  );
}
