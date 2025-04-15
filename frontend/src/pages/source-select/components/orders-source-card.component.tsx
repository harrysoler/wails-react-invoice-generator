import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

type OrdersSourceCardProps = {
  children: ReactNode | ReactNode[];
  className?: string
};

export function OrdersSourceCard(
  props: OrdersSourceCardProps,
) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Bienvenido</CardTitle>
        <CardDescription>
          Selecciona tu archivo localmente o de la nube
        </CardDescription>
      </CardHeader>
      <CardContent className={props.className}>
        {props.children}
      </CardContent>
    </Card>
  );
}
