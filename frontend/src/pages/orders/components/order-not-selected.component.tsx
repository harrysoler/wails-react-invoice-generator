import { SquareMousePointer } from "lucide-react";

export function OrderNotSelected() {
  return (
    <main className="min-h-svh w-full flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <SquareMousePointer size={80} className="text-primary" />
      <h1>
        Selecciona una orden
      </h1>
    </main>
  );
}
