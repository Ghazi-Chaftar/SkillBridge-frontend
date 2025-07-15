import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check, LoaderCircle } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-button-text  hover:opacity-75',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-primary text-primary bg-white hover:bg-accent hover:text-accent-foreground',
        secondaryOutline:
          'border  text-secondary bg-white hover:bg-secondary hover:text-accent-foreground',
        secondary:
          'bg-secondary text-white ring-secondary ring-2  hover:opacity-75',
        ghost: 'hover:bg-transparent hover:text-primary ',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isSuccess?: boolean
  isPending?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isSuccess,
      isPending,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isSubmit = props.type === 'submit'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {isSubmit ? (
          <>
            {isPending && (
              <span className='absolute inset-0 flex items-center justify-center'>
                <LoaderCircle className='h-6 w-6 animate-spin' />
              </span>
            )}
            <span
              className={cn(
                isPending ? 'invisible' : 'visible',
                'flex items-center gap-1'
              )}
            >
              {children}
              {isSuccess && !isPending && (
                <Check className='h-5 w-5 animate-pop' />
              )}
            </span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
