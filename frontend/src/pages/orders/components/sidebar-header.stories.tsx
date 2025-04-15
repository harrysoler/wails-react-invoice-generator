import { Meta, StoryObj } from "@storybook/react";
import { OrdersSidebarHeader } from ".";

const meta = {
  title: "Orders/Sidebar/Header",
  component: OrdersSidebarHeader,
  args: {},
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrdersSidebarHeader>;

export default meta;
type Story = StoryObj<typeof OrdersSidebarHeader>;

export const Default: Story = {
  args: {},
};
