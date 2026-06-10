import type { z } from "zod/mini";
import type {
  ObjectJsonSchema,
  SchemaEditorType,
} from "../types/jsonSchema.ts";
import type { ValidationTreeNode } from "../types/validation.ts";
import type { TypeEditorProps } from "../components/SchemaEditor/TypeEditor.tsx";

// ──────────────────────────────────────────────
// Component prop types (adapter contracts)
// ──────────────────────────────────────────────

/**
 * Minimal prop contract for adapter components.
 * Users wrap their design-system primitives to match these shapes.
 */

/** @public */
export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/** @public */
export interface InputProps {
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  id?: string;
  autoFocus?: boolean;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  step?: string | number;
  min?: string | number;
  max?: string | number;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
}

/** @public */
export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/** @public */
export interface LabelProps {
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

/** @public */
export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

/** @public */
export interface ButtonToggleProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

/** @public */
export interface SchemaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/** @public */
export interface SchemaBuilderComponents {
  Button: React.ComponentType<ButtonProps>;
  Input: React.ComponentType<InputProps>;
  Switch: React.ComponentType<SwitchProps>;
  Label: React.ComponentType<LabelProps>;
  Badge: React.ComponentType<BadgeProps>;
  ButtonToggle: React.ComponentType<ButtonToggleProps>;
  SchemaDialog: React.ComponentType<SchemaDialogProps>;
}

// ──────────────────────────────────────────────
// Slots
// ──────────────────────────────────────────────

/** @public */
export interface SlotChildrenProps {
  children: React.ReactNode;
  className?: string;
}

/** @public */
export type MobileMode = "visual" | "json";

/** @public */
export interface MobileModeSwitchSlotProps {
  mode: MobileMode;
  onChange: (mode: MobileMode) => void;
  children?: React.ReactNode;
}

/** @public */
export interface FullscreenToggleSlotProps {
  isFullscreen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

/** @public */
export interface FieldFrameSlotProps extends SlotChildrenProps {
  depth?: number;
  expanded?: boolean;
  hasErrors?: boolean;
}

/** @public */
export type FieldHeaderSlotProps = SlotChildrenProps;

/** @public */
export type FieldMainSlotProps = SlotChildrenProps;

/** @public */
export type FieldActionsSlotProps = SlotChildrenProps;

/** @public */
export type FieldBodySlotProps = SlotChildrenProps;

/** @public */
export interface SchemaBuilderSlots {
  Root: React.ComponentType<SlotChildrenProps>;
  MobileModeSwitch: React.ComponentType<MobileModeSwitchSlotProps>;
  FullscreenToggle: React.ComponentType<FullscreenToggleSlotProps>;
  FieldFrame: React.ComponentType<FieldFrameSlotProps>;
  FieldHeader: React.ComponentType<FieldHeaderSlotProps>;
  FieldMain: React.ComponentType<FieldMainSlotProps>;
  FieldActions: React.ComponentType<FieldActionsSlotProps>;
  FieldBody: React.ComponentType<FieldBodySlotProps>;
}

/** @public */
export type SchemaBuilderSlotProps = Partial<{
  [K in keyof SchemaBuilderSlots]: Record<string, unknown>;
}>;

// ──────────────────────────────────────────────
// Validators
// ──────────────────────────────────────────────

/** @public */
export interface ValidatorEditorProps {
  schema: ObjectJsonSchema;
  onChange: (next: ObjectJsonSchema) => void;
  readOnly: boolean;
  /** Pre-filtered errors matching this validator's `errorPaths`. */
  errors: z.core.$ZodIssue[];
  schemaKey: string | undefined;
  schemaType: string;
  validationNode?: ValidationTreeNode;
}

/** @public */
export type ValidatorEditorComponent =
  React.ComponentType<ValidatorEditorProps>;

/** @public */
export interface ValidatorDefinition {
  component: ValidatorEditorComponent;
  order?: number;
  /** First path segments in `validationNode.validation.errors` that belong to this validator. */
  errorPaths?: string[];
}

/** @public */
export type ValidatorMap = Record<
  string,
  ValidatorDefinition | ValidatorEditorComponent
>;

/** @public */
export type ValidatorRegistry = Partial<{
  string: ValidatorMap;
  number: ValidatorMap;
  integer: ValidatorMap;
  array: ValidatorMap;
  object: ValidatorMap;
  boolean: ValidatorMap;
  any: ValidatorMap;
}>;

// ──────────────────────────────────────────────
// Widgets
// ──────────────────────────────────────────────

/** @public */
export type WidgetRegistry = Partial<
  Record<SchemaEditorType, React.ComponentType<TypeEditorProps>>
>;

// ──────────────────────────────────────────────
// Fields
// ──────────────────────────────────────────────

/** @public */
export interface FieldDefinition {
  component: React.ComponentType<TypeEditorProps>;
  label: string;
  description?: string;
  baseType: SchemaEditorType;
  group?: "custom" | "basic" | "composition";
  createSchema?: (ctx: {
    name: string;
    description: string;
    required: boolean;
  }) => ObjectJsonSchema;
}

/** @public */
export type FieldRegistry = Record<string, FieldDefinition>;

// ──────────────────────────────────────────────
// Root registry
// ──────────────────────────────────────────────

/** @public */
export interface SchemaBuilderRegistry {
  components?: Partial<SchemaBuilderComponents>;
  slots?: Partial<SchemaBuilderSlots>;
  slotProps?: SchemaBuilderSlotProps;
  validators?: ValidatorRegistry;
  widgets?: WidgetRegistry;
  fields?: FieldRegistry;
}