import { useQuery } from "@tanstack/react-query";
import { FacetedFilter } from "../components";

type AsyncFacetedFilterProps = {
  title: string;
  resolver: () => Promise<string[]>;
  onChange: (values: string[]) => void;
};

export function AsyncFacetedFilter(props: AsyncFacetedFilterProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["faceted-filter", props.title],
    queryFn: props.resolver,
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <FacetedFilter
      onChange={props.onChange}
      options={data ?? []}
      title={props.title}
    />
  );
}
