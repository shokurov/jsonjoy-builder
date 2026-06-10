import type {
  SchemaBuilderRegistry,
  SchemaBuilderComponents,
  SchemaBuilderSlots,
  ValidatorRegistry,
  WidgetRegistry,
  FieldRegistry,
} from "./types.ts";

/**
 * Deep-ish merge of two registries.
 *
 * Merge contract (per namespace):
 * - `components`:      shallow per-key replace
 * - `slots`:           shallow per-key replace
 * - `slotProps`:       shallow per-slot merge
 * - `validators`:      shallow per type, shallow per validator-key replace
 * - `widgets`:         shallow per type replace
 * - `fields`:          shallow per field-key replace
 *
 * No recursive deep merge inside a component/validator definition.
 */

function mergeComponents(
  base: Partial<SchemaBuilderComponents> | undefined,
  override: Partial<SchemaBuilderComponents> | undefined,
): Partial<SchemaBuilderComponents> | undefined {
  if (!override) return base;
  if (!base) return override;
  return { ...base, ...override };
}

function mergeSlots(
  base: Partial<SchemaBuilderSlots> | undefined,
  override: Partial<SchemaBuilderSlots> | undefined,
): Partial<SchemaBuilderSlots> | undefined {
  if (!override) return base;
  if (!base) return override;
  return { ...base, ...override };
}

function mergeSlotProps(
  base: Record<string, Record<string, unknown>> | undefined,
  override: Record<string, Record<string, unknown>> | undefined,
): Record<string, Record<string, unknown>> | undefined {
  if (!override) return base;
  if (!base) return override;
  const result: Record<string, Record<string, unknown>> = { ...base };
  for (const key of Object.keys(override)) {
    result[key] = { ...(result[key] || {}), ...override[key] };
  }
  return result;
}

function mergeValidators(
  base: ValidatorRegistry | undefined,
  override: ValidatorRegistry | undefined,
): ValidatorRegistry | undefined {
  if (!override) return base;
  if (!base) return override;
  const result: ValidatorRegistry = {};
  const allKeys = new Set([
    ...Object.keys(base),
    ...Object.keys(override),
  ] as Array<keyof ValidatorRegistry>);
  for (const key of allKeys) {
    const baseMap = base[key];
    const overrideMap = override[key];
    if (!overrideMap) {
      if (baseMap) result[key] = baseMap;
    } else if (!baseMap) {
      result[key] = overrideMap;
    } else {
      // Per-validator-key shallow replace
      result[key] = { ...baseMap, ...overrideMap };
    }
  }
  return result;
}

function mergeWidgets(
  base: WidgetRegistry | undefined,
  override: WidgetRegistry | undefined,
): WidgetRegistry | undefined {
  if (!override) return base;
  if (!base) return override;
  return { ...base, ...override };
}

function mergeFields(
  base: FieldRegistry | undefined,
  override: FieldRegistry | undefined,
): FieldRegistry | undefined {
  if (!override) return base;
  if (!base) return override;
  return { ...base, ...override };
}

/** @public */
export function mergeRegistry(
  base: SchemaBuilderRegistry | undefined,
  override: SchemaBuilderRegistry | undefined,
): SchemaBuilderRegistry {
  if (!override) return base || {};
  if (!base) return override;
  return {
    components: mergeComponents(base.components, override.components),
    slots: mergeSlots(base.slots, override.slots),
    slotProps: mergeSlotProps(base.slotProps, override.slotProps),
    validators: mergeValidators(base.validators, override.validators),
    widgets: mergeWidgets(base.widgets, override.widgets),
    fields: mergeFields(base.fields, override.fields),
  };
}