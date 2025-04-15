import { SidebarHeader } from "@/components/ui/sidebar";
import { ReactNode } from "react";

import { ReturnButton } from "@/pages/orders/components";
import logo from "@/assets/images/logo.webp";

export function OrdersSidebarHeader(
  { children }: { children: ReactNode | ReactNode[] },
) {
  return (
    <SidebarHeader className="gap-3.5 border-b p-4">
      <div className="w-full h-9 flex justify-between">
        <ReturnButton />
        <img src={logo} className="h-full w-auto" />
      </div>
      {children}
    </SidebarHeader>
  );
}
