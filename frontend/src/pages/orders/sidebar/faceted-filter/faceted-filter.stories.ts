import { Meta, StoryObj } from "@storybook/react";
import { FacetedFilter } from "./faceted-filter.component";
import { fn } from "@storybook/test";

const meta = {
  title: "Orders/Sidebar/FacetedFilter",
  component: FacetedFilter,
  parameters: {
      layout: 'centered'
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
