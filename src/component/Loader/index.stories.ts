import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./index";

const meta = {
  title: "Component/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowSpinner: Story = {
  args: {
    type: "arrow",
  },
};

export const GradientSpinner: Story = {
  args: {
    type: "gradient",
  },
};
