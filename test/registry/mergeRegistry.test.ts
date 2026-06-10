import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { mergeRegistry } from "../../src/registry/mergeRegistry.ts";
import type { SchemaBuilderRegistry } from "../../src/registry/types.ts";

const empty: SchemaBuilderRegistry = {};

describe("mergeRegistry", () => {
  test("undefined override returns base", () => {
    const base: SchemaBuilderRegistry = {
      components: { Button: (() => null) as never },
    };
    const result = mergeRegistry(base, undefined);
    assert.equal(result.components?.Button, base.components?.Button);
  });

  test("undefined base returns override", () => {
    const override: SchemaBuilderRegistry = {
      components: { Button: (() => null) as never },
    };
    const result = mergeRegistry(undefined, override);
    assert.equal(result.components?.Button, override.components?.Button);
  });

  test("both undefined returns empty object", () => {
    const result = mergeRegistry(undefined, undefined);
    assert.deepEqual(result, {});
  });

  test("component override replaces without affecting other components", () => {
    const base: SchemaBuilderRegistry = {
      components: {
        Button: (() => "BaseButton") as never,
        Input: (() => "BaseInput") as never,
      },
    };
    const override: SchemaBuilderRegistry = {
      components: { Button: (() => "OverrideButton") as never },
    };
    const result = mergeRegistry(base, override);
    assert.equal(result.components?.Button, override.components?.Button);
    assert.equal(result.components?.Input, base.components?.Input);
  });

  test("validator same-key override replaces default entry", () => {
    const base: SchemaBuilderRegistry = {
      validators: {
        string: { length: (() => "default") as never },
      },
    };
    const override: SchemaBuilderRegistry = {
      validators: {
        string: { length: (() => "override") as never },
      },
    };
    const result = mergeRegistry(base, override);
    const lengthVal = (result.validators?.string as Record<string, unknown>)
      ?.length;
    assert.equal(lengthVal, override.validators?.string?.length);
  });

  test("custom validator key is added alongside defaults", () => {
    const base: SchemaBuilderRegistry = {
      validators: {
        string: { length: (() => "length") as never },
      },
    };
    const override: SchemaBuilderRegistry = {
      validators: {
        string: { unique: (() => "unique") as never },
      },
    };
    const result = mergeRegistry(base, override);
    const merged = result.validators?.string as Record<string, unknown>;
    assert.ok(merged?.length);
    assert.ok(merged?.unique);
  });

  test("widgets are separate from fields", () => {
    const base: SchemaBuilderRegistry = {
      widgets: { string: (() => null) as never },
      fields: { "x-vendor:slug": null as never },
    };
    const override: SchemaBuilderRegistry = {
      widgets: { number: (() => null) as never },
    };
    const result = mergeRegistry(base, override);
    assert.ok(result.widgets?.string);
    assert.ok(result.widgets?.number);
    assert.ok(result.fields?.["x-vendor:slug"] !== undefined);
  });

  test("slotProps shallow merges per slot", () => {
    const base: SchemaBuilderRegistry = {
      slotProps: { FieldFrame: { variant: "default", size: "md" } },
    };
    const override: SchemaBuilderRegistry = {
      slotProps: { FieldFrame: { variant: "compact" } },
    };
    const result = mergeRegistry(base, override);
    assert.equal(
      (result.slotProps?.FieldFrame as Record<string, unknown>).variant,
      "compact",
    );
    assert.equal(
      (result.slotProps?.FieldFrame as Record<string, unknown>).size,
      "md",
    );
  });
});