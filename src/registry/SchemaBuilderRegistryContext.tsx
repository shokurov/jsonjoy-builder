import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type {
  SchemaBuilderComponents,
  SchemaBuilderRegistry,
  SchemaBuilderSlots,
  ValidatorRegistry,
  WidgetRegistry,
  FieldRegistry,
  ValidatorMap,
} from "./types.ts";
import { defaultRegistry } from "./defaults.tsx";
import { mergeRegistry } from "./mergeRegistry.ts";

// ── Context ──────────────────────────────────

const SchemaBuilderRegistryContext = createContext<SchemaBuilderRegistry>(
  defaultRegistry,
);

// ── Provider ─────────────────────────────────

export function SchemaBuilderRegistryProvider({
  value,
  children,
}: {
  value?: SchemaBuilderRegistry;
  children: ReactNode;
}) {
  const parent = useContext(SchemaBuilderRegistryContext);
  const merged = useMemo(
    () => mergeRegistry(parent, value),
    [parent, value],
  );
  return (
    <SchemaBuilderRegistryContext value={merged}>
      {children}
    </SchemaBuilderRegistryContext>
  );
}

// ── Hooks ────────────────────────────────────

/** Read the current registry tree. */
export function useRegistry(): SchemaBuilderRegistry {
  return useContext(SchemaBuilderRegistryContext);
}

/** Get a single component from the registry. Falls back to the default. */
export function useComponent<
  K extends keyof SchemaBuilderComponents,
>(name: K): SchemaBuilderComponents[K] {
  const reg = useContext(SchemaBuilderRegistryContext);
  const overridden = reg.components?.[name];
  if (overridden) return overridden as SchemaBuilderComponents[K];
  return defaultRegistry.components[name] as SchemaBuilderComponents[K];
}

/** Get a single slot from the registry. Falls back to the default. */
export function useSlot<K extends keyof SchemaBuilderSlots>(
  name: K,
): SchemaBuilderSlots[K] {
  const reg = useContext(SchemaBuilderRegistryContext);
  const overridden = reg.slots?.[name];
  if (overridden) return overridden as SchemaBuilderSlots[K];
  return defaultRegistry.slots[name] as SchemaBuilderSlots[K];
}

/** Get slotProps for a given slot name. Merges defaults with user-provided props. */
export function useSlotProps(
  slotName: string,
): Record<string, unknown> {
  const reg = useContext(SchemaBuilderRegistryContext);
  return reg.slotProps?.[slotName] ?? {};
}

/** Get the validator map for a given schema type. */
export function useValidators(type: string): ValidatorMap {
  const reg = useContext(SchemaBuilderRegistryContext);
  const v = (reg.validators as ValidatorRegistry | undefined)?.[
    type as keyof ValidatorRegistry
  ];
  return v ?? {};
}

/** Get the widget registry. */
export function useWidgetRegistry(): WidgetRegistry {
  const reg = useContext(SchemaBuilderRegistryContext);
  return reg.widgets ?? {};
}

/** Get the field registry. */
export function useFieldRegistry(): FieldRegistry {
  const reg = useContext(SchemaBuilderRegistryContext);
  return reg.fields ?? {};
}