import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground border-primary/80 shadow-[3px_3px_0_theme(colors.primary/0.5)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_theme(colors.primary/0.5)]",
                destructive:
                    "bg-destructive text-destructive-foreground border-destructive/80 shadow-[3px_3px_0_theme(colors.destructive/0.5)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_theme(colors.destructive/0.5)]",
                outline:
                    "border-border bg-card shadow-[3px_3px_0_theme(colors.border)] hover:bg-card-hover hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_theme(colors.border)]",
                secondary:
                    "bg-secondary text-secondary-foreground border-border shadow-[3px_3px_0_theme(colors.border)] hover:bg-secondary/80 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_theme(colors.border)]",
                ghost: "border-transparent hover:bg-card-hover hover:text-foreground shadow-none active:shadow-none active:translate-x-0 active:translate-y-0",
                link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none active:shadow-none active:translate-x-0 active:translate-y-0",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-xl px-8 text-base",
                icon: "h-10 w-10 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
