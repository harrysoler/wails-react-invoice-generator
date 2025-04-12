import { OrdersSourceCard } from "./orders-source-card.component";
import logo from "@/assets/images/logo.webp";

export function SourceSelectPage() {
  function onClickLocalFile() {
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex flex-col items-center w-full max-w-sm flex-col gap-6">
        <img src={logo} alt="" className="w-36" />
        <OrdersSourceCard onClickLocalFile={onClickLocalFile} />
      </div>
    </main>
  );
}
