import { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from ".";
import { fn } from "@storybook/test";

const meta = {
  title: "Orders/Sidebar/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  args: {
    onSearch: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};
