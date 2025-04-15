import { Meta, StoryObj } from "@storybook/react";
import { SidebarOrderListSkeleton } from "./sidebar-order-list-skeleton.component";

const meta = {
  title: "Orders/Sidebar/List",
  component: SidebarOrderListSkeleton,
  args: {},
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarOrderListSkeleton>;

export default meta;
type Story = StoryObj<typeof SidebarOrderListSkeleton>;

export const Loading: Story = {
  args: {},
};
