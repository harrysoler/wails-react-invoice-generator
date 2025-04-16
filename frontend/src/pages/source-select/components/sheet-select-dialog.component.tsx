import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type SheetSelectDialogProps = {
  sheets: string[];
  show: boolean;
  onSubmit: (selectedSheet: string) => void;
  onDismiss: () => void;
};

export function SheetSelectDialog(props: SheetSelectDialogProps) {
  // TODO: Handle case of sheets lenght of 1
  const [selectedSheet, setSelectedSheet] = useState<string>(props.sheets[0]);

  const onOpenChange = (isOpen: boolean) => isOpen ? {} : props.onDismiss();
  const onClickAccept = () => props.onSubmit(selectedSheet);
  const onSelectChange = (value: string) => setSelectedSheet(value);

  return (
    <Dialog open={props.show} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-4">
        <DialogTitle>Selecciona un libro del archivo</DialogTitle>
        <Select
          value={selectedSheet}
          onValueChange={onSelectChange}
        >
          <SelectTrigger className="w-full" id="sheet-select">
            <SelectValue placeholder="Selecciona una hoja" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Libros</SelectLabel>
              {props.sheets.map((sheet) => (
                <SelectItem value={sheet} key={"sheet-select-" + sheet}>
                  {sheet}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="self-end">
          <Button onClick={onClickAccept}>Aceptar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
