import { Meta, StoryObj } from "@storybook/react";
import { SidebarOrderList } from "./sidebar-order-list.component";
import { getMockOrder } from "@/helpers";

const meta = {
  title: "Orders/Sidebar/List",
  component: SidebarOrderList,
  args: {},
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarOrderList>;

export default meta;
type Story = StoryObj<typeof SidebarOrderList>;

export const Default: Story = {
  args: {
    orders: [...Array(10)].map(getMockOrder),
  },
};
