import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { OrderDetailErrorBoundary } from ".";

const meta = {
  title: "Orders/Detail",
  component: OrderDetailErrorBoundary,
  args: {
    resetErrorBoundary: fn(),
  },
  parameters: {
      layout: 'fullscreen'
  }
} satisfies Meta<typeof OrderDetailErrorBoundary>;

export default meta;
type Story = StoryObj<typeof OrderDetailErrorBoundary>;

export const Failed: Story = {
  args: {
    error: new Error(
      "Simulating Lost connection to api function getOrderByOdoo",
    ),
  },
};
