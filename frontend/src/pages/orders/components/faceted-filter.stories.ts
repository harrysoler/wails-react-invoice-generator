import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FacetedFilter } from ".";

const meta = {
  title: "Orders/Sidebar/FacetedFilter",
  component: FacetedFilter,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(),
  },
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
