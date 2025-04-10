import { Meta, StoryObj } from "@storybook/react";
import { OrdersSidebarHeader } from "./sidebar-header.component";

const meta = {
  title: "Orders/SidebarHeader",
  component: OrdersSidebarHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof OrdersSidebarHeader>;

export default meta;
type Story = StoryObj<typeof OrdersSidebarHeader>;

export const Default: Story = {
    args: {}
}
