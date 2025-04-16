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
import { Check, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useToggleArray } from "@/pages/orders/hooks";
import { cn } from "@/lib/utils";

type FacetedFilterProps = {
  title: string;
  options: string[];
  onChange: (values: string[]) => void;
};

export function FacetedFilter(props: FacetedFilterProps) {
  const {
    array: selectedValues,
    has: isSelected,
    toggle: onSelectOption,
    clear: onClear,
  } = useToggleArray(undefined, props.onChange);

  return (
    <Popover>
      <FacetedFilterTrigger
        valuesLength={selectedValues.length}
        title={props.title}
      />
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={props.title} />
          <CommandList>
            <CommandEmpty>Sin resultados</CommandEmpty>
            <CommandGroup>
              {[...props.options].map((option) => (
                <FacetedFilterItem
                  option={option}
                  isSelected={isSelected}
                  onSelect={onSelectOption}
                />
              ))}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <FacetedFilterClear onClear={onClear} />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type FacetedFilterTriggerProps = {
  valuesLength: number;
  title: string;
};

function FacetedFilterTrigger(props: FacetedFilterTriggerProps) {
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="h-8 border-dashed justify-start"
      >
        <PlusCircle />
        {props.title}
        {props.valuesLength > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4 justify-self-end" />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal justify-self-end"
            >
              {props.valuesLength}
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
      <span className="break-all">{props.option}</span>
    </CommandItem>
  );
}

function FacetedFilterClear({ onClear }: { onClear: () => void }) {
  return (
    <>
      <CommandSeparator />
      <CommandGroup>
        <CommandItem
          onSelect={onClear}
          className="justify-center text-center"
        >
          Limpiar filtros
        </CommandItem>
      </CommandGroup>
    </>
  );
}
