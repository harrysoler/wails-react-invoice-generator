import { Meta, StoryObj } from "@storybook/react";
import { SidebarOrderListErrorBoundary } from "./sidebar-order-list-error.component";
import { fn } from "@storybook/test";

const meta = {
  title: "Orders/Sidebar/ListError",
  component: SidebarOrderListErrorBoundary,
  args: {
    resetErrorBoundary: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarOrderListErrorBoundary>;

export default meta;
type Story = StoryObj<typeof SidebarOrderListErrorBoundary>;

export const Default: Story = {
  args: {
    error: new Error(
      "Simulating Lost connection to api function getOrdersByFilter",
    ),
  },
};
