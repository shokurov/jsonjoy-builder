import type { Meta, StoryObj } from "@storybook/react";
import { SchemaBuilder, type JsonSchema } from "../src/index.ts";

/**
 * Story demonstrating a custom field type — requires PR 3 (fields/widgets).
 *
 * When fields are available, uncomment the `fields` registry entry:
 *
 * ```tsx
 * registry={{
 *   fields: {
 *     "x-vendor:slug": { label: "Slug", baseType: "string", component: SlugEditor },
 *   },
 * }}
 * ```
 *
 * This story currently shows the default SchemaBuilder as a placeholder.
 */

const sampleSchema: JsonSchema = {
  type: "object",
  properties: {
    slug: { type: "string" },
  },
};

const meta: Meta<typeof SchemaBuilder> = {
  title: "SchemaBuilder/Custom Field (placeholder)",
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