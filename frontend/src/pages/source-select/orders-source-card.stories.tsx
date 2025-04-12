import { Meta, StoryObj } from "@storybook/react";
import { OrdersSourceCard } from "./orders-source-card.component";
import { SourceButton } from "./source-button.component";
import { Cloud } from "lucide-react";
import { SourceButtonRow } from "./source-button-row.component";

const meta = {
  title: "Source/OrdersSourceCard",
  component: OrdersSourceCard,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof OrdersSourceCard>;

export default meta;
type Story = StoryObj<typeof OrdersSourceCard>;

export const Default: Story = {
  args: {
    children: [
      <SourceButtonRow>
        <SourceButton icon={Cloud} title="Google Drive" />
        <SourceButton icon={Cloud} title="OneDrive" />
      </SourceButtonRow>,
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          O tambien
        </span>
      </div>,
    ],
    className: "grid gap-6"
  },
};
