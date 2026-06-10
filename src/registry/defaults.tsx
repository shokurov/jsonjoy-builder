import {
  Badge as DefaultBadge,
} from "../components/ui/badge.tsx";
import { Button as DefaultButton } from "../components/ui/button.tsx";
import { ButtonToggle as DefaultButtonToggle } from "../components/ui/button-toggle.tsx";
import { Input as DefaultInput } from "../components/ui/input.tsx";
import { Label as DefaultLabel } from "../components/ui/label.tsx";
import { Switch as DefaultSwitch } from "../components/ui/switch.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog.tsx";
import type {
  SchemaBuilderComponents,
  SchemaBuilderRegistry,
  SchemaBuilderSlots,
  SchemaDialogProps,
} from "./types.ts";

/**
 * Default registry — built-in UI primitives, layout slots, and empty maps.
 *
 * IMPORTANT: This file does NOT import any type editor or validator component.
 * Built-in editors remain lazy imports in TypeEditor.tsx; built-in validators
 * live locally in each editor module.
 */

// ── Default components ───────────────────────

const DefaultSchemaDialog: React.FC<SchemaDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  footer,
  className,
  children,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={className}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
      {footer && <DialogFooter>{footer}</DialogFooter>}
    </DialogContent>
  </Dialog>
);

export const defaultComponents: SchemaBuilderComponents = {
  Button: DefaultButton,
  Input: DefaultInput,
  Switch: DefaultSwitch,
  Label: DefaultLabel,
  Badge: DefaultBadge,
  ButtonToggle: DefaultButtonToggle,
  SchemaDialog: DefaultSchemaDialog,
};

// ── Default slots ────────────────────────────

const DefaultFieldFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

const DefaultSlot = ({
  children,
}: { children?: React.ReactNode }) => <>{children}</>;

export const defaultSlots: SchemaBuilderSlots = {
  Root: DefaultSlot,
  MobileModeSwitch: DefaultSlot,
  FullscreenToggle: DefaultSlot,
  FieldFrame: DefaultFieldFrame,
  FieldHeader: DefaultSlot,
  FieldMain: DefaultSlot,
  FieldActions: DefaultSlot,
  FieldBody: DefaultSlot,
};

// ── Default root registry ────────────────────

export const defaultRegistry: SchemaBuilderRegistry = {
  components: defaultComponents,
  slots: defaultSlots,
  slotProps: {},
  validators: {},
  widgets: {},
  fields: {},
};