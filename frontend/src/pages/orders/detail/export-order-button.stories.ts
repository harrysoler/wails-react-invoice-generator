import { Meta, StoryObj } from "@storybook/react";
import { ExportOrderButton } from "./export-order-button.component";
import { getMockOrder } from "@/helpers";
import { fn } from "@storybook/test";

const meta = {
  title: "Orders/ExportOrderButton",
  component: ExportOrderButton,
  parameters: {
    layout: "centered",
  },
  args: {
    order: getMockOrder(),
    onExport: fn(),
  },
} satisfies Meta<typeof ExportOrderButton>;

export default meta;
type Story = StoryObj<typeof ExportOrderButton>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
