import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FacetedFilter } from "./faceted-filter.component";

const meta = {
  title: "Orders/Sidebar/FacetedFilter",
  component: FacetedFilter,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[19rem] flex flex-col">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FacetedFilter>;

export default meta;
type Story = StoryObj<typeof FacetedFilter>;

export const Default: Story = {
  args: {
    title: "Plataforma",
    options: [
      "Facebook",
      "Falabella",
      "Homecenter",
    ],
  },
};
