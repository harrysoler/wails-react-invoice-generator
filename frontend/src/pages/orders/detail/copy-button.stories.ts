import { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "./copy-button.component";

const meta = {
  title: "Orders/Detail/CopyButton",
  component: CopyButton,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    value: "Copied!",
  },
};
