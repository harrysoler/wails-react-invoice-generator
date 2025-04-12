import { SidebarInput } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

type SearchInputProps = {
  onSearch: (value: string) => void;
};

export function SearchOrderInput({ onSearch }: SearchInputProps) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    onSearch(event.currentTarget.value);

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <SidebarInput onChange={onChange} placeholder="Filtrar ordenes..." className="pl-8" />
    </div>
  );
}
