import { Pencil, ScanEye, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { cn, getFileUrl } from '@/lib/utils'
import {
  Avatar,
  AvatarImage,
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/src/app/shared/components'
import { usePathname } from '@/src/navigation'
import { pathnameType } from '@/src/types'

import AddressIcon from '../../icons/adressIcon'
import PhoneIcon from '../../icons/phoneIcon'
import { useLocalizedUrl } from '../hooks/initUrlWithLang'

type CarouselCardProps = {
  profileCard?: boolean
  imageWidth: number
  imageHeight: number
  link: string
  images: { id: number; image: string }[]
  title: string
  subtitle: string
  handleDeleteProductOpen?: () => void
  handleSelectProduct?: (value: number) => void
  productId?: number
  profileImage?: string
  address?: string
  phoneNumber?: string
  blockModify?: boolean
  className?: string
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  imageWidth,
  imageHeight,
  images,
  title,
  link,
  subtitle,
  handleDeleteProductOpen,
  handleSelectProduct,
  productId,
  profileCard,
  profileImage,
  address,
  phoneNumber,
  blockModify,
  className
}) => {
  const getLocalizedUrl = useLocalizedUrl()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const pathname = usePathname()
  const isArchitectSpace = pathname.includes('/architect-space/')

  useEffect(() => {
    if (!carouselApi) return

    const onSelect = (): void => {
      const index = carouselApi.selectedScrollSnap()
      setSelectedIndex(index)
    }

    carouselApi.on('select', onSelect)
    onSelect()

    return () => {
      carouselApi.off('select', onSelect)
    }
  }, [carouselApi])

  const router = useRouter()
  const handleLeavePage = (): void => {
    const url = getLocalizedUrl(link)
    router.push(`${url.href}` as pathnameType, { scroll: false })
  }

  return (
    <div
      className={cn(
        'group w-fit max-w-sm list-none justify-start rounded-2xl bg-white pb-3 shadow-[0_12px_24px_-4px_rgba(145,158,171,0.12)] ',
        profileCard && 'w-full rounded-b-lg lg:max-w-[544px]',

        className
      )}
    >
      <div className='flex w-full flex-col items-start gap-4  '>
        <div
          style={
            !profileCard
              ? { width: imageWidth, height: imageHeight }
              : undefined
          }
          className={cn(
            profileCard && 'w-full lg:h-[229px] lg:w-full',
            images.length === 0 && 'flex flex-col items-center'
          )}
        >
          {images.length === 0 ? (
            <Image
              className='rounded-xl border-b-[1px] border-solid border-b-background'
              src='/images/supplier/emptyProduct.webp'
              alt='emty product'
              height={150}
              width={230}
            />
          ) : (
            <Carousel setApi={setCarouselApi} className='relative rounded-3xl '>
              <CarouselContent className='rounded-xl'>
                {images?.map(item => (
                  <CarouselItem
                    key={item.id}
                    className={`relative rounded-xl border-b-[1px] border-solid border-b-background`}
                    style={{
                      height: `${imageHeight}px`,
                      width: `${imageWidth}px`
                    }}
                  >
                    <Image
                      className='border-b-line-gray absolute rounded-2xl border-b-[1px] border-solid object-fill'
                      src={getFileUrl(item.image) as string}
                      alt='img'
                      fill
                      priority
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {images?.length > 1 && (
                <>
                  <CarouselPrevious className='left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  <CarouselNext className='right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                  <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2'>
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          'h-[5px] w-[5px] rounded-full transition-all duration-300',
                          selectedIndex === index
                            ? 'scale-110 bg-primary shadow-md'
                            : 'bg-primary opacity-70'
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </Carousel>
          )}
        </div>

        {profileCard && (
          <Avatar className='-mt-24 ml-2 h-[100px] w-[100px] rounded-[10px] bg-white p-[6px] sm:ml-4'>
            <AvatarImage
              src={getFileUrl(profileImage as string)}
              alt='profile'
              className='h-[90px] w-[90px] rounded-[10px]'
            />
          </Avatar>
        )}

        <div
          className={cn(
            `flex w-full flex-col gap-0  px-5 pt-2`,
            profileCard && '-mt-5'
          )}
        >
          <div className='flex w-full justify-between'>
            <p className='truncate text-left text-xl font-semibold text-secondary'>
              {title}
            </p>
            {!profileCard && !blockModify && (
              <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F5F5]'>
                <ScanEye
                  className='h-4 w-4 cursor-pointer'
                  onClick={() => {
                    const loginUri = getLocalizedUrl(
                      `/${isArchitectSpace ? 'architect' : 'supplier'}-space/product-details/${productId?.toString()}`
                    )
                    if (loginUri && productId) {
                      window.location.href = loginUri.toString()
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className='mt-3 flex w-full items-center justify-between '>
            <div
              className={cn(
                ' flex items-center justify-start whitespace-normal text-left text-xl text-[#11abec] hover:underline lg:text-sm',
                profileCard && ' mb-3'
              )}
            >
              <p>
                {!isNaN(Number(subtitle))
                  ? `${Number(subtitle) % 1 === 0 ? Number(subtitle) : Number(subtitle).toFixed(2)}`
                  : subtitle}
              </p>
            </div>
            {!profileCard && blockModify && (
              <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F5F5]'>
                <ScanEye
                  className='h-4 w-4 cursor-pointer'
                  onClick={() => {
                    const loginUri = getLocalizedUrl(
                      `/${isArchitectSpace ? 'architect' : 'supplier'}-space/product-details/${productId?.toString()}`
                    )
                    if (loginUri && productId) {
                      window.location.href = loginUri.toString()
                    }
                  }}
                />
              </div>
            )}
            {!profileCard && !blockModify && (
              <div className='  flex gap-2'>
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F5F5]'>
                  <Pencil
                    className='h-4 w-4 cursor-pointer'
                    onClick={() => {
                      const loginUri = getLocalizedUrl(
                        `/supplier-space/edit-product/${productId?.toString()}`
                      )
                      if (loginUri && productId) {
                        loginUri.searchParams.append('id', productId.toString())
                        window.location.href = loginUri.toString()
                      }
                    }}
                  />
                </div>
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F5F5]'>
                  <Trash
                    color='#FC5C63'
                    className='h-4 w-4 cursor-pointer'
                    // className='h-7 cursor-pointer fill-[#FC5C63] '
                    onClick={() => {
                      if (
                        handleDeleteProductOpen &&
                        handleSelectProduct &&
                        productId
                      ) {
                        handleDeleteProductOpen()
                        handleSelectProduct(productId)
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {profileCard && (
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-4'>
                <AddressIcon className='h-5 w-5' />
                <p className='justify-start whitespace-normal text-left text-sm font-bold text-secondary'>
                  {address}
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <PhoneIcon className='h-5 w-5' />
                <p className='justify-start whitespace-normal text-left text-sm font-bold text-secondary'>
                  {phoneNumber}
                </p>
              </div>
              <Button onClick={handleLeavePage}>Voir catalogue</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarouselCard
