import type {
  ValidatorDefinition,
  ValidatorEditorComponent,
  ValidatorMap,
} from "./types.ts";

/**
 * Normalize a ValidatorMap entry to a ValidatorDefinition.
 * If the user passes a bare component, wrap it as `{ component }`.
 */
export function normalizeValidatorDefinition(
  value: ValidatorDefinition | ValidatorEditorComponent,
): ValidatorDefinition {
  if (typeof value === "function") {
    return { component: value as ValidatorEditorComponent };
  }
  return value;
}

/**
 * Merge local default validators with user overrides from the registry.
 * Per-key shallow replace: if the user provides `length`, it replaces the default `length`.
 * New keys (e.g. `unique`) are appended.
 */
export function mergeValidatorDefinitions(
  defaults: Record<string, ValidatorDefinition>,
  overrides: ValidatorMap,
): Record<string, ValidatorDefinition> {
  const result: Record<string, ValidatorDefinition> = { ...defaults };
  for (const [key, value] of Object.entries(overrides)) {
    result[key] = normalizeValidatorDefinition(value);
  }
  return result;
}

/**
 * Sort an ordered map of validator definitions by `order`.
 * Entries without `order` appear after ordered ones, in insertion order.
 */
export function orderValidators(
  defs: Record<string, ValidatorDefinition>,
): string[] {
  const entries = Object.entries(defs);
  const ordered = entries.filter(([, v]) => v.order !== undefined);
  const unordered = entries.filter(([, v]) => v.order === undefined);

  ordered.sort((a, b) => (a[1].order as number) - (b[1].order as number));

  return [...ordered, ...unordered].map(([key]) => key);
}

/**
 * Get errors pre-filtered for a given set of error path prefixes.
 */
export function getValidatorErrors(
  errors: Array<{ path: (string | number)[] }> | undefined,
  errorPaths: string[] | undefined,
): Array<{ path: (string | number)[] }> {
  if (!errors || !errorPaths || errorPaths.length === 0) return [];
  return errors.filter((err) => {
    const first = String(err.path[0] ?? "");
    return errorPaths.includes(first);
  });
}