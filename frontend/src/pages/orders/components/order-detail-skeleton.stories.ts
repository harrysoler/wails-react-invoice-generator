import { Meta, StoryObj } from "@storybook/react";
import { getMockOrder } from "@/helpers";
import { OrderDetailSkeleton } from ".";

const meta = {
  title: "Orders/Detail",
  component: OrderDetailSkeleton,
  args: {},
} satisfies Meta<typeof OrderDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof OrderDetailSkeleton>;

export const Loading: Story = {
  args: {
    isExportLoading: false,
    order: getMockOrder(),
  },
};
