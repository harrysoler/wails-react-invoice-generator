import useSWRImmutable from "swr/immutable";
import useSWR from "swr";

import { OrdersSidebarContent } from "./sidebar-content.component";
import {
  getCities,
  getOrdersByFilter,
  getPlatformNames,
} from "@/pages/orders/orders.api";
import { OrdersSidebarHeader } from "./sidebar-header";
import { Sidebar } from "@/components/ui/sidebar";
import { caching } from "@wailsjs/go/models";
import { useDeferredValue, useState } from "react";

export function OrdersSidebar() {
  const [filter, setFilter] = useState<caching.OrderFilter>(
    new caching.OrderFilter(),
  );

  const deferredFilter = useDeferredValue(filter);

  const { data: platforms } = useSWRImmutable('orders-platforms', getPlatformNames);
  const { data: cities } = useSWRImmutable('orders-cities', getCities);

  return (
    <Sidebar className="flex flex-1">
      <OrdersSidebarHeader
        setFilter={setFilter}
        platforms={platforms ? platforms : []}
        cities={cities ? cities : []}
      />
      <ContentContainer filter={deferredFilter} />
    </Sidebar>
  );
}

function ContentContainer({ filter }: { filter: caching.OrderFilter }) {
  const { data: orders, error, isLoading } = useSWR(
    ["orders", filter],
    ([_, filter]) => getOrdersByFilter(filter),
  );

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orders) return <p>Undefined orders</p>;

  return <OrdersSidebarContent orders={orders} />;
}
