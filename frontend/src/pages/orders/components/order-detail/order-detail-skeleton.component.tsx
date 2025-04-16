import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailSkeleton() {
  return (
    <main className="w-3xl mx-auto py-10">
      <div className="flex flex-row justify-between py-4">
        <Skeleton className="h-8 w-90 mb-3" />
        <Skeleton className="h-9 w-37" />
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <div className="flex flex-col px-2 py-4 gap-5">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <Skeleton className="self-center w-3/5 h-4" />
        </div>
        <div className="flex flex-col gap-4">
          <DetailItemSkeleton />
          <DetailItemSkeleton />
          <DetailItemSkeleton />
          <DetailItemSkeleton />
        </div>
      </div>
    </main>
  );
}

const TableRowSkeleton = () => <Skeleton className="w-full h-4" />;

const DetailItemSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-5 w-25" />
    <Skeleton className="h-5 w-60" />
  </div>
);
