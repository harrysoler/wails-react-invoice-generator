import { Meta, StoryObj } from "@storybook/react";
import { FacetedFilterErrorBoundary } from "./faceted-filter-error-boundary.component";
import { fn } from "@storybook/test";
import { Toaster } from "sonner";

const meta = {
  title: "Orders/Sidebar/FacetedFilterError",
  component: FacetedFilterErrorBoundary,
  parameters: {
    layout: "centered",
  },
  args: {
    resetErrorBoundary: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[19rem]">
        <Story />
        <Toaster richColors />
      </div>
    ),
  ],
} satisfies Meta<typeof FacetedFilterErrorBoundary>;

export default meta;
type Story = StoryObj<typeof FacetedFilterErrorBoundary>;

export const Default: Story = {
  args: {
    error: new Error(
      "Simulating Lost connection to api function getFilter",
    ),
    title: "Plataforma",
  },
};
