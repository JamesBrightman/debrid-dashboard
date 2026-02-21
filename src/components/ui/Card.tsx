import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { panelClassNames } from "@/components/ui/panelClassNames";

export type CardVariant = keyof typeof panelClassNames;

type CardProps<T extends ElementType = "section"> = {
  as?: T;
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export const Card = <T extends ElementType = "section">({
  as,
  variant = "default",
  className,
  children,
  ...rest
}: CardProps<T>) => {
  const Component = as ?? "section";
  const classes = [panelClassNames[variant], className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
