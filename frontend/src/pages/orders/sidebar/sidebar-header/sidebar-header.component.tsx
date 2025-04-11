import { SidebarHeader } from "@/components/ui/sidebar";
import { SearchOrderInput } from "./search-order-input.component";
import { ReturnButton } from "./return-button.component";

import { caching } from "@wailsjs/go/models";
import { FacetedFilter } from "./faceted-filter";
import logo from "@/assets/images/logo.webp";

type SidebarHeaderProps = {
  setFilter: React.Dispatch<React.SetStateAction<caching.OrderFilter>>;
  platforms: Set<string>;
  cities: Set<string>;
};

export function OrdersSidebarHeader(props: SidebarHeaderProps) {
  const onSearch = (value: string) =>
    props.setFilter((filter) => ({ ...filter, FullTextSearch: value }));

  const onPlatformsChange = (platforms: string[]) =>
    props.setFilter((filter) => ({ ...filter, Platforms: platforms }));

  const onCitiesChange = (cities: string[]) =>
    props.setFilter((filter) => ({ ...filter, Cities: cities }));

  return (
    <SidebarHeader className="gap-3.5 border-b p-4">
      <div className="w-full h-9 flex justify-between">
        <ReturnButton />
        <img src={logo} className="h-full w-auto" />
      </div>
      <SearchOrderInput onSearch={onSearch} />
      <div className="w-full flex flex-col gap-2">
        <FacetedFilter
          title="Plataforma"
          options={props.platforms}
          onChange={onPlatformsChange}
        />
        <FacetedFilter
          title="Ciudad"
          options={props.cities}
          onChange={onCitiesChange}
        />
      </div>
    </SidebarHeader>
  );
}
