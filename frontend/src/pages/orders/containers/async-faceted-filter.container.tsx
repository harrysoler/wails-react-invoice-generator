import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import {
  FacetedFilter,
  FacetedFilterErrorBoundary,
  FacetedFilterSkeleton,
} from "@/pages/orders/components";

type AsyncFacetedFilterProps = {
  title: string;
  resolver: () => Promise<string[]>;
  onChange: (values: string[]) => void;
};

function AsyncFacetedFilterImpl(props: AsyncFacetedFilterProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["faceted-filter", props.title],
    queryFn: props.resolver,
    staleTime: Infinity,
    retry: 1,
  });

  return (
    <FacetedFilter
      onChange={props.onChange}
      options={data}
      title={props.title}
    />
  );
}

export function AsyncFacetedFilter(props: AsyncFacetedFilterProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={FacetedFilterErrorBoundary}
    >
      <Suspense fallback={<FacetedFilterSkeleton />}>
        <AsyncFacetedFilterImpl {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
