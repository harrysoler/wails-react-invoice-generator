import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { domain } from "@wailsjs/go/models";

type OrderProductsTableProps = {
  products: domain.Product[];
};

export function OrderProductsTable({ products }: OrderProductsTableProps) {
  return (
    <Table>
      <TableCaption>Productos en la orden de compra</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-muted-foreground">Producto</TableHead>
          <TableHead className="text-center text-muted-foreground">Cantidad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.Name + index}>
            <TableCell className="whitespace-normal">{product.Name}</TableCell>
            <TableCell className="text-center">{product.Quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
