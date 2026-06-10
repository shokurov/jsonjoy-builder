export { SchemaBuilderRegistryProvider } from "./SchemaBuilderRegistryContext.tsx";
export { useRegistry, useComponent, useSlot, useSlotProps, useValidators, useWidgetRegistry, useFieldRegistry } from "./SchemaBuilderRegistryContext.tsx";

export { mergeRegistry } from "./mergeRegistry.ts";
export { normalizeValidatorDefinition, mergeValidatorDefinitions, orderValidators, getValidatorErrors } from "./validatorsHelpers.ts";
export { defaultRegistry, defaultComponents, defaultSlots } from "./defaults.tsx";

export type {
  // Component adapters
  ButtonProps,
  InputProps,
  SwitchProps,
  LabelProps,
  BadgeProps,
  ButtonToggleProps,
  SchemaDialogProps,
  SchemaBuilderComponents,

  // Slots
  SlotChildrenProps,
  MobileMode,
  MobileModeSwitchSlotProps,
  FullscreenToggleSlotProps,
  FieldFrameSlotProps,
  FieldHeaderSlotProps,
  FieldMainSlotProps,
  FieldActionsSlotProps,
  FieldBodySlotProps,
  SchemaBuilderSlots,
  SchemaBuilderSlotProps,

  // Validators
  ValidatorEditorProps,
  ValidatorEditorComponent,
  ValidatorDefinition,
  ValidatorMap,
  ValidatorRegistry,

  // Widgets
  WidgetRegistry,

  // Fields
  FieldDefinition,
  FieldRegistry,

  // Root
  SchemaBuilderRegistry,
} from "./types.ts";