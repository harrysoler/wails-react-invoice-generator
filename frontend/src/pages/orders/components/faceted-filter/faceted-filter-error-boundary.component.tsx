import { Button } from "@/components/ui/button";
import { handleError } from "@/helpers/error-handler";
import { CircleAlert } from "lucide-react";

type FacetedFilterErrorBoundaryProps = {
  error: unknown;
  resetErrorBoundary: () => void;
};

export function FacetedFilterErrorBoundary(
  props: FacetedFilterErrorBoundaryProps,
) {
  function onClick() {
    handleError("No se pudo traer filtro: " + props.error, {
      label: "Reintentar",
      onClick: props.resetErrorBoundary,
    });
  }

  return (
    <Button
      className="h-8 w-full justify-start"
      variant="destructive"
      onClick={onClick}
    >
      <CircleAlert />
      Error
    </Button>
  );
}
