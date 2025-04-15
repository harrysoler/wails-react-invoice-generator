import { Button } from "@/components/ui/button";

type SidebarOrderListErrorBoundaryProps = {
  error: unknown;
  resetErrorBoundary: () => void;
};

export function SidebarOrderListErrorBoundary(
  props: SidebarOrderListErrorBoundaryProps,
) {
  return (
    <div className="w-full flex flex-col p-4 gap-2">
      <p>Ocurrio un error listando las ordenes:</p>
      <pre className="whitespace-pre-line text-destructive">{ String(props.error) }</pre>
      <Button onClick={props.resetErrorBoundary}>Reintentar</Button>
    </div>
  );
}
