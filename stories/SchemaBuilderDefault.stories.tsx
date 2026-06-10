import type { Meta, StoryObj } from "@storybook/react";
import { SchemaBuilder, type JsonSchema } from "../src/index.ts";

const meta: Meta<typeof SchemaBuilder> = {
  title: "SchemaBuilder/Default",
  component: SchemaBuilder,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SchemaBuilder>;

const sampleSchema: JsonSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, maxLength: 100 },
    age: { type: "integer", minimum: 0, maximum: 150 },
    email: { type: "string", format: "email" },
    role: {
      type: "string",
      enum: ["admin", "user", "guest"],
    },
    isActive: { type: "boolean" },
    tags: {
      type: "array",
      items: { type: "string" },
    },
    metadata: {
      type: "object",
      properties: {
        created: { type: "string", format: "date-time" },
      },
    },
  },
  required: ["name", "email"],
};

export const Empty: Story = {
  args: {
    value: { type: "object", properties: {} },
    onChange: (v: JsonSchema) => console.log("changed", v),
  },
};

export const WithSchema: Story = {
  args: {
    value: sampleSchema,
    onChange: (v: JsonSchema) => console.log("changed", v),
  },
};

export const ReadOnly: Story = {
  args: {
    value: sampleSchema,
    readOnly: true,
  },
};