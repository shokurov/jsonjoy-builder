import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SchemaBuilder, type JsonSchema } from "../src/index.ts";

/**
 * Example demonstrating `registry.components` to replace leaf primitives.
 *
 * In a real app you would use your design-system components here.
 */

// Simulated design-system adapters
function DSButton({
  children,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      style={{
        background: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: 6,
        padding: "4px 12px",
        fontSize: 13,
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function DSInput(props: {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
}) {
  return (
    <input
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 13,
        width: "100%",
      }}
      {...props}
    />
  );
}

function DSSwitch(props: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onCheckedChange?.(e.target.checked)}
        style={{ accentColor: "#6366f1" }}
      />
    </label>
  );
}

const meta: Meta<typeof SchemaBuilder> = {
  title: "SchemaBuilder/MUI Theme (simulated)",
  component: SchemaBuilder,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SchemaBuilder>;

const sampleSchema: JsonSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    isActive: { type: "boolean" },
  },
  required: ["name", "email"],
};

export const WithCustomComponents: Story = {
  args: {
    value: sampleSchema,
    onChange: (v: JsonSchema) => console.log("changed", v),
    registry: {
      components: {
        Button: DSButton as never,
        Input: DSInput as never,
        Switch: DSSwitch as never,
      },
    },
  },
};