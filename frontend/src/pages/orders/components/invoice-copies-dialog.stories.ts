import { Meta, StoryObj } from "@storybook/react";
import { InvoiceCopiesDialog } from ".";
import { fn } from "@storybook/test";

const meta = {
  title: "Orders/Detail/InvoiceCopiesDialog",
  component: InvoiceCopiesDialog,
  args: {
    show: true,
    onSubmit: fn(),
    onDismiss: fn(),
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InvoiceCopiesDialog>;

export default meta;
type Story = StoryObj<typeof InvoiceCopiesDialog>;

export const Default: Story = {
  args: {},
};
