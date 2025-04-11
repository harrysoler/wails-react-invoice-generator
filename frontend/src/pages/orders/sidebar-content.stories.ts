import { Meta, StoryObj } from "@storybook/react";
import { domain } from "@wailsjs/go/models";
import { OrdersSidebarContent } from "./sidebar-content.component";

const mockOrder: domain.Order = new domain.Order({
  OdooReference: "S273709",
  ClientReference: "1512934699623-01",
  ClientName: "MARIA ALEJANDRA VALERO CALDERON",
  PlatformName: "Facebook",
  Address:
    "Carrera 72C No. 22A-74 APARTAMENTO 921 CONJUNTO RESIDENCIAL EL OASIS LA FELICIDAD",
  City: "Tunja",
  PhoneNumber: "3142295714 - 3114731034",
  Products: [
    {
      Name: "CAMA LANUS DOBLE BLANCO - MATIZ NATURAL",
      Quantity: 1,
    },
    {
      Name: "POLTRONA TOULOUSE DICOSTA BEIGE (MATIZ NATURAL)",
      Quantity: 1,
    },
    {
      Name: "MESA DE NOCHE LIBIA BLANCO-DUNA (MATIZ NATURAL)",
      Quantity: 2,
    },
    {
      Name: "FLETE",
      Quantity: 1,
    },
  ],
});

const meta = {
  title: "Orders/SidebarContent",
  component: OrdersSidebarContent,
  args: {
      orders: Array(10).fill(mockOrder)
  },
} satisfies Meta<typeof OrdersSidebarContent>;

export default meta;
type Story = StoryObj<typeof OrdersSidebarContent>;

export const Default: Story = {
  args: {},
};
