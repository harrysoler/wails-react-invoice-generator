import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CitySelect() {
  return (
    <Select>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Ciudad" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciudades</SelectLabel>
          <SelectItem value="tunja">Tunja</SelectItem>
          <SelectItem value="bogota">Bogota</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
