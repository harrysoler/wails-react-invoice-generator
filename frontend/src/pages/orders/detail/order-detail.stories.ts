import { Meta, StoryObj } from "@storybook/react";
import { getMockOrder } from "@/helpers";
import { OrderDetail } from "./order-detail.component";
import { fn } from "@storybook/test";

const meta = {
  title: "Orders/Detail",
  component: OrderDetail,
  args: {
    onExport: fn(),
  },
  argTypes: {
      order: {
          control: 'object'
      }
  }
} satisfies Meta<typeof OrderDetail>;

export default meta;
type Story = StoryObj<typeof OrderDetail>;

export const Default: Story = {
  args: {
    isExportLoading: false,
    order: getMockOrder(),
  },
};
