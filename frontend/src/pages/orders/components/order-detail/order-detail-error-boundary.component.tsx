import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

type OrderDetailErrorBoundaryProps = {
  error: unknown;
  resetErrorBoundary: () => void;
};

export function OrderDetailErrorBoundary(props: OrderDetailErrorBoundaryProps) {
  return (
    <main className="min-h-svh w-full flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <PackageX size={80} className="text-destructive" />
      <h1>
        No se entontró la orden, intenta seleccionar otra o reintentar
      </h1>
      <Button onClick={props.resetErrorBoundary}>Reintentar</Button>
      <pre className="mt-2 w-[50ch] rounded-md bg-background p-4 whitespace-normal">
          <code className="text-destructive">{String(props.error)}</code>
      </pre>
    </main>
  );
}
