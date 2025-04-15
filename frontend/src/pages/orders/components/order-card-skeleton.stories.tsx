import { Meta, StoryObj } from "@storybook/react";
import { OrderCardSkeleton } from ".";

const meta = {
  title: "Orders/Sidebar/OrderCard",
  component: OrderCardSkeleton,
  args: {},
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrderCardSkeleton>;

export default meta;
type Story = StoryObj<typeof OrderCardSkeleton>;

export const Loading: Story = {
  args: {},
};
