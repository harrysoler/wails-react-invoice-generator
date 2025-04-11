import { Meta, StoryObj } from "@storybook/react";
import { OrderDetailsList } from "./order-details-list.component";
import { getMockOrder } from "@/helpers";

const meta = {
  title: "Orders/Detail/OrderDetailsList",
  component: OrderDetailsList,
  parameters: {
    layout: "centered",
  },
  args: {
    order: getMockOrder(),
  },
} satisfies Meta<typeof OrderDetailsList>;

export default meta;
type Story = StoryObj<typeof OrderDetailsList>;

export const Default: Story = {
  args: {},
};
