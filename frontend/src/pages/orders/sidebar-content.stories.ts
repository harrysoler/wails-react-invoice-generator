import { Meta, StoryObj } from "@storybook/react";
import { OrdersSidebarContent } from "./sidebar-content.component";
import { getMockOrder } from "@/helpers";

const mockOrders = [...Array(10)].map(getMockOrder);

const meta = {
  title: "Orders/SidebarContent",
  component: OrdersSidebarContent,
  args: {
    orders: mockOrders,
  },
} satisfies Meta<typeof OrdersSidebarContent>;

export default meta;
type Story = StoryObj<typeof OrdersSidebarContent>;

export const Default: Story = {
  args: {},
};
