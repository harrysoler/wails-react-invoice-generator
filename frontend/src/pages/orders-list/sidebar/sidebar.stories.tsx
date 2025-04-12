import { Meta, StoryObj } from "@storybook/react";
import { OrdersSidebar } from "./sidebar.component";
import { SidebarProvider } from "@/components/ui/sidebar";
import { fn } from "@storybook/test";
import { getMockOrder } from "@/helpers";

const mockOrders = [...Array(10)].map(getMockOrder);

const meta = {
  title: "Orders/Sidebar",
  component: OrdersSidebar,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  args: {
    setFilter: fn(),
  },
} satisfies Meta<typeof OrdersSidebar>;

export default meta;
type Story = StoryObj<typeof OrdersSidebar>;

export const Default: Story = {
  args: {
    orders: mockOrders,
  },
};

export const Empty: Story = {
  args: {
    orders: [],
  },
};
