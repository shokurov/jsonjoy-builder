import type { Meta, StoryObj } from "@storybook/react";
import { SchemaBuilder, type JsonSchema } from "../src/index.ts";

/**
 * Story demonstrating a custom validator — requires PR 2 (validators).
 *
 * When validators are available, uncomment the `validators` registry entry:
 *
 * ```tsx
 * registry={{
 *   validators: {
 *     string: {
 *       unique: MyUniqueValidator,
 *     },
 *   },
 * }}
 * ```
 *
 * This story currently shows the default SchemaBuilder as a placeholder.
 */

const sampleSchema: JsonSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};

const meta: Meta<typeof SchemaBuilder> = {
  title: "SchemaBuilder/Custom Validator (placeholder)",
  component: SchemaBuilder,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SchemaBuilder>;

export const Placeholder: Story = {
  args: {
    value: sampleSchema,
    onChange: (v: JsonSchema) => console.log("changed", v),
  },
};