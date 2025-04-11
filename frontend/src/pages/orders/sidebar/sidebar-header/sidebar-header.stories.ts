import { Meta, StoryObj } from "@storybook/react";
import { OrdersSidebarHeader } from "./sidebar-header.component";
import { fn } from "@storybook/test";

const platformOptions = new Set([
  "Facebook",
  "Falabella",
  "HomeCenter",
]);

const cityOptions = new Set([
  "Tunja",
  "Bogota",
  "Medellin",
]);

const meta = {
  title: "Orders/Sidebar/SidebarHeader",
  component: OrdersSidebarHeader,
  args: {
    setFilter: fn(),
    platforms: platformOptions,
    cities: cityOptions,
  },
} satisfies Meta<typeof OrdersSidebarHeader>;

export default meta;
type Story = StoryObj<typeof OrdersSidebarHeader>;

export const Default: Story = {
  args: {},
};
