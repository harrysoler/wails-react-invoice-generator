import { Skeleton } from "@/components/ui/skeleton";

export function OrderCardSkeleton() {
  return (
    <li className="flex flex-col gap-4 p-4">
      <Skeleton className="h-5 w-full" />
      <ul className="flex flex-col gap-2">
        <CardDetailSkeleton/>
        <CardDetailSkeleton/>
        <CardDetailSkeleton/>
      </ul>
      <div className="flex flex-row flex-wrap gap-2">
        <Skeleton className="h-6 w-20"/>
        <Skeleton className="h-6 w-20"/>
      </div>
    </li>
  );
}

function CardDetailSkeleton() {
  return (
    <li className="flex items-start gap-4">
        <Skeleton className="h-4 w-4 rounded-full"/>
        <Skeleton className="h-4 w-3/4"/>
    </li>
  );
}
