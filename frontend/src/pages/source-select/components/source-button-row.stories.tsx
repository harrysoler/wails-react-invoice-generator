import { Meta, StoryObj } from "@storybook/react";
import { SourceButtonRow } from "./source-button-row.component";
import { Cloud, Folder } from "lucide-react";
import { SourceButton } from "./source-button.component";

const meta = {
  title: "Source/SourceButtonRow",
  component: SourceButtonRow,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SourceButtonRow>;

export default meta;
type Story = StoryObj<typeof SourceButtonRow>;

export const Default: Story = {
  args: {
    children: [
      <SourceButton icon={Cloud} title="Nube" disabled />,
      <SourceButton icon={Folder} title="Archivo local" />,
    ],
  },
};
