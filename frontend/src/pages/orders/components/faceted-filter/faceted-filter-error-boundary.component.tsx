import { Button } from "@/components/ui/button";
import { handleError } from "@/helpers/error-handler";
import { CircleAlert } from "lucide-react";

type FacetedFilterErrorBoundaryProps = {
  title: string;
  error: unknown;
  resetErrorBoundary: () => void;
};

export function FacetedFilterErrorBoundary(
  props: FacetedFilterErrorBoundaryProps,
) {
  function onClick() {
    handleError(props.error, {
      label: "Try Again",
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
      {props.title}
    </Button>
  );
}
