import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-base ring-offset-white transition-all gap-2  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'text-text bg-main border-2 border-neon dark:border-darkBorder shadow-neon dark:shadow-neon hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none',
        noShadow:
          'text-text bg-main border-2 border-border dark:border-darkBorder',
        neutral:
          'bg-white dark:bg-secondaryBlack text-text dark:text-darkText border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none',
        reverse:
          'text-text bg-main border-2 border-border dark:border-darkBorder hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-light dark:hover:shadow-dark',
        outline:
          "border border-input bg-accent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "text-primary",
        link: "text-accent underline-offset-4 hover:underline",
        navbar: "hover:shadow flex flex-col text-white rounded-xl hover:bg-purple-700",
        auth: 'text-xl font-semibold rounded-full w-full text-text border-2 border-neon dark:border-darkBorder shadow-neon dark:shadow-neon hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none',
      },
      size: {
        default: 'px-4 py-3',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'p-4',

        // default: "px-4 py-2",
        // sm: "h-8 rounded-md px-3 text-xs",
        // lg: "h-10 rounded-md px-8",
        // icon: "h-9 w-9",
        ghost: "h-0 w-0",
        rounded: "rounded-full p-2"
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
