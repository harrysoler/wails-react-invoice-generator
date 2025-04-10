import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PlatformSelect() {
  return (
    <Select>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Plataforma" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Plataformas</SelectLabel>
          <SelectItem value="facebook">Facebook</SelectItem>
          <SelectItem value="home">HomeCenter</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
