import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, PlusCircle } from "lucide-react";
import { useFilterValues } from "./use-filter-values";

type FacetedFilterProps = {
  title: string;
  options: string[];
  onChange: (values: string[]) => void;
};

export function FacetedFilter(props: FacetedFilterProps) {
  const {
    array: selected,
    hasValue: isSelected,
    toggleValue: onSelectOption,
    clearValues: onSelectClear,
  } = useFilterValues(props.onChange);

  return (
    <Popover>
      <FacetedFilterTrigger
        selectedValuesSize={selected.length}
        title={props.title}
      />
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={props.title} />
          <CommandList>
            <CommandEmpty>Sin resultados</CommandEmpty>
            <CommandGroup>
              {props.options.map((option) => (
                <FacetedFilterItem
                  option={option}
                  isSelected={isSelected}
                  onSelect={onSelectOption}
                />
              ))}
            </CommandGroup>
            {selected.length > 0 && (
              <FacetedFilterClear onSelectClear={onSelectClear} />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type FacetedFilterTriggerProps = {
  selectedValuesSize: number;
  title: string;
};

function FacetedFilterTrigger(props: FacetedFilterTriggerProps) {
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="h-8 border-dashed grow flex-1 justify-start"
      >
        <PlusCircle />
        {props.title}
        {props.selectedValuesSize > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal"
            >
              {props.selectedValuesSize}
            </Badge>
          </>
        )}
      </Button>
    </PopoverTrigger>
  );
}

type FacetedFilterItemProps = {
  isSelected: (value: string) => boolean;
  onSelect: (value: string) => void;
  option: string;
};

function FacetedFilterItem(props: FacetedFilterItemProps) {
  return (
    <CommandItem key={props.option} onSelect={props.onSelect}>
      <div
        className={cn(
          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
          props.isSelected(props.option)
            ? "bg-primary text-primary-foreground"
            : "opacity-50 [&_svg]:invisible",
        )}
      >
        <Check color="white" />
      </div>
      <span>{props.option}</span>
    </CommandItem>
  );
}

function FacetedFilterClear({ onSelectClear }: { onSelectClear: () => void }) {
  return (
    <>
      <CommandSeparator />
      <CommandGroup>
        <CommandItem
          onSelect={onSelectClear}
          className="justify-center text-center"
        >
          Limpiar filtros
        </CommandItem>
      </CommandGroup>
    </>
  );
}
