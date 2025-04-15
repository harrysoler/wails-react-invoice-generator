import { Meta, StoryObj } from "@storybook/react";
import { FacetedFilterSkeleton } from "./faceted-filter-skeleton.component";

const meta = {
  title: "Orders/Sidebar/FacetedFilterSkeleton",
  component: FacetedFilterSkeleton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FacetedFilterSkeleton>;

export default meta;
type Story = StoryObj<typeof FacetedFilterSkeleton>;

export const Default: Story = {
  args: {},
};
