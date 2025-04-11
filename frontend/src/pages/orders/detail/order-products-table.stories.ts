import { Meta, StoryObj } from "@storybook/react";
import { getMockOrder } from "@/helpers";
import { OrderProductsTable } from "./order-products-table.component";

const meta = {
  title: "Orders/Detail/OrderProductsTable",
  component: OrderProductsTable,
  parameters: {
    layout: "centered",
  },
  args: {
    products: getMockOrder().Products,
  },
} satisfies Meta<typeof OrderProductsTable>;

export default meta;
type Story = StoryObj<typeof OrderProductsTable>;

export const Default: Story = {
  args: {},
};
