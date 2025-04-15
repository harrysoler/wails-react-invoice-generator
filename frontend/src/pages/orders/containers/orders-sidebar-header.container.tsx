import { OrdersSidebarHeader, SearchInput } from "@/pages/orders/components";
import { getCities, getPlatformNames } from "@/pages/orders/api";
import { AsyncFacetedFilter } from "@/pages/orders/containers";
import { caching } from "@wailsjs/go/models";

type OrdersSidebarHeaderProps = {
  setFilter: React.Dispatch<React.SetStateAction<caching.OrderFilter>>;
};

export function OrdersSidebarHeaderContainer(
  { setFilter }: OrdersSidebarHeaderProps,
) {
  const onSearch = (FullTextSearch: string) =>
    setFilter((filter) => ({ ...filter, FullTextSearch }));

  const onSelectedPlatformsChange = (Platforms: string[]) =>
    setFilter((filter) => ({ ...filter, Platforms }));

  const onSelectedCitiesChange = (Cities: string[]) =>
    setFilter((filter) => ({ ...filter, Cities }));

  return (
    <OrdersSidebarHeader>
      <SearchInput onSearch={onSearch} placeholder="Filtrar ordenes..." />
      <div className="w-full flex flex-col gap-2">
        <AsyncFacetedFilter
          title="Plataforma"
          resolver={getPlatformNames}
          onChange={onSelectedPlatformsChange}
        />
        <AsyncFacetedFilter
          title="Ciudad"
          resolver={getCities}
          onChange={onSelectedCitiesChange}
        />
      </div>
    </OrdersSidebarHeader>
  );
}
