import {
  SidebarOrderList,
  SidebarOrderListErrorBoundary,
  SidebarOrderListSkeleton,
} from "@/pages/orders/components";
import { getOrdersByFilter } from "@/pages/orders/api";
import { caching } from "@wailsjs/go/models";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

type SidebarOrderListProps = {
  filter: caching.OrderFilter;
};

function SidebarOrderListContainerImpl({ filter }: SidebarOrderListProps) {
  const { data: orders } = useSuspenseQuery({
    queryKey: ["orders", filter],
    queryFn: () => getOrdersByFilter(filter),
    retry: 1,
    retryDelay: 0,
  });

  return <SidebarOrderList orders={orders} />;
}

export function SidebarOrderListContainer(props: SidebarOrderListProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      FallbackComponent={SidebarOrderListErrorBoundary}
      onReset={reset}
    >
      <Suspense fallback={<SidebarOrderListSkeleton />}>
        <SidebarOrderListContainerImpl {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
