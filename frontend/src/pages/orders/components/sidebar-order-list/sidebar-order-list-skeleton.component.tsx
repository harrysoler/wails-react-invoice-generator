import { OrderCardSkeleton } from "@/pages/orders/components";

export function SidebarOrderListSkeleton() {
  return (
    <ul>
        <OrderCardSkeleton/>
        <OrderCardSkeleton/>
        <OrderCardSkeleton/>
    </ul>
  );
}
