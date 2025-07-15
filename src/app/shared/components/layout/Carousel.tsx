'use client'

import useEmblaCarousel, {
  type UseEmblaCarouselType
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/src/app/shared/components'

import { useCarousel } from '../../hooks/useCarousel'
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CarouselApi = UseEmblaCarouselType[1]
type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useCarousel>['carouselRef']
  api: ReturnType<typeof useCarousel>['api']
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarouselContext(): CarouselContextProps {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarouselContext must be used within a <Carousel />')
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const {
      carouselRef,
      api,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext
    } = useCarousel({ opts, plugins, orientation })

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        }}
      >
        <div
          ref={ref}
          className={cn('relative', className)}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarouselContext()

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '' : ' flex-col',
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarouselContext()

  return (
    <div
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarouselContext()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute  h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className='h-4 w-4' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarouselContext()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className='h-4 w-4' />
      <span className='sr-only'>Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = 'CarouselNext'

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
}
