import { useDeferredValue, useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";

import {
  SidebarOrderListContainer,
  OrdersSidebarHeaderContainer,
} from "@/pages/orders/containers";
import { caching } from "@wailsjs/go/models";

export function OrdersSidebarContainer() {
  const [filter, setFilter] = useState<caching.OrderFilter>(
    new caching.OrderFilter(),
  );

  const deferredFilter = useDeferredValue(filter);

  return (
    <Sidebar className="flex flex-1">
      <OrdersSidebarHeaderContainer setFilter={setFilter} />
      <SidebarOrderListContainer filter={deferredFilter} />
    </Sidebar>
  );
}
