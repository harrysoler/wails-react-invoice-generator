import { Meta, StoryObj } from "@storybook/react";
import { OrderNotSelected } from ".";

const meta = {
  title: "Orders/Detail",
  component: OrderNotSelected,
  args: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OrderNotSelected>;

export default meta;
type Story = StoryObj<typeof OrderNotSelected>;

export const NotSelected: Story = {
  args: {},
};
