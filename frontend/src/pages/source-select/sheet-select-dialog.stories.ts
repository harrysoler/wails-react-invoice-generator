import { Meta, StoryObj } from "@storybook/react";
import { SheetSelectDialog } from "./sheet-select-dialog.component";
import { fn } from "@storybook/test";

const meta = {
  title: "Source/SheetSelectDialog",
  component: SheetSelectDialog,
  parameters: {
    layout: "centered",
  },
  args: {
    show: true,
    onSubmit: fn(),
    onDismiss: fn(),
  },
} satisfies Meta<typeof SheetSelectDialog>;

export default meta;
type Story = StoryObj<typeof SheetSelectDialog>;

export const Default: Story = {
  args: {
    sheets: [
      "HOJA1",
      "HOJA2",
      "HOJA3",
    ],
  },
};
