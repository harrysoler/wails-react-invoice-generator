import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { OrdersSourceCard } from "./orders-source-card.component";

const meta = {
  title: "Source/OrdersSourceCard",
  component: OrdersSourceCard,
  parameters: {
    layout: "centered",
  },
  args: {
    onClickLocalFile: fn(),
  },
} satisfies Meta<typeof OrdersSourceCard>;

export default meta;
type Story = StoryObj<typeof OrdersSourceCard>;

export const Default: Story = {
  args: {},
};
