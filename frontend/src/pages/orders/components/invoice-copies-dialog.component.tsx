import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type InvoiceCopiesDialogProps = {
  show: boolean;
  onSubmit: (copies: number) => void;
  onDismiss: () => void;
};

export function InvoiceCopiesDialog(props: InvoiceCopiesDialogProps) {
  const onOpenChange = (isOpen: boolean) => isOpen ? {} : props.onDismiss();

  return (
    <Dialog open={props.show} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-4">
        <DialogTitle>Cuantas copias?</DialogTitle>
        <InvoiceCopiesForm onSubmit={props.onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

const FormSchema = z.object({
  copies: z.coerce.number({
    required_error: "Se requiere un número",
    invalid_type_error: "La cantidad debe ser un número",
  })
    .int("La cantidad debe ser un número entero")
    .positive("Digita mínimo 1 copia")
    .lte(30, "Máximo 30 copias"),
});

export function InvoiceCopiesForm(
  props: { onSubmit: (copies: number) => void },
) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { copies: 1 },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    props.onSubmit(data.copies);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Copias" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-start">Aceptar</Button>
      </form>
    </Form>
  );
}
