import { cva } from 'class-variance-authority'

import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'absolute top-0 -right-4 inline-flex items-center rounded-base border-2 border-border px-2.5 font-base py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-main text-mtext',
        neutral: 'bg-bw text-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }