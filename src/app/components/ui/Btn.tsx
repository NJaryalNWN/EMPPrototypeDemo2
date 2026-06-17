import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "filled" | "outlined" | "ghost" | "danger" | "icon";
type Size    = "sm" | "md" | "lg";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;        // leading icon slot
  iconOnly?: boolean;      // icon-only circular button (variant="icon")
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-1.5 font-medium select-none cursor-pointer " +
  "transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  filled:
    "rounded-lg bg-primary text-primary-foreground " +
    "hover:brightness-90",
  outlined:
    "rounded-lg border border-border bg-transparent text-foreground " +
    "hover:bg-accent hover:border-border",
  ghost:
    "rounded-lg bg-transparent text-muted-foreground " +
    "hover:bg-accent hover:text-foreground",
  danger:
    "rounded-lg bg-transparent text-destructive " +
    "hover:bg-destructive/10",
  icon:
    "rounded-full bg-transparent text-muted-foreground " +
    "hover:bg-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-7  px-3    text-[11px]",
  md: "h-9  px-4    text-[13px]",
  lg: "h-10 px-5    text-[14px]",
};

const iconSizes: Record<Size, string> = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-10 h-10",
};

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  (
    {
      variant = "filled",
      size = "md",
      icon,
      iconOnly = false,
      fullWidth = false,
      children,
      className = "",
      ...rest
    },
    ref
  ) => {
    const isIcon = variant === "icon" || iconOnly;
    const sizeClass = isIcon ? iconSizes[size] : sizes[size];

    return (
      <button
        ref={ref}
        className={[
          base,
          variants[variant],
          sizeClass,
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {!isIcon && children}
        {isIcon && (icon ?? children)}
      </button>
    );
  }
);

Btn.displayName = "Btn";
