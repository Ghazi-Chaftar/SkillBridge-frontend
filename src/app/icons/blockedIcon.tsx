interface BlockedIconProps {
  className?: string
  // other props
}
const BlockedIcon: React.FC<BlockedIconProps> = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_5484_4136)'>
        <path
          d='M14.1667 9.16667V10.8333H5.83333V9.16667H14.1667ZM20 10C20 15.5142 15.5142 20 10 20C4.48583 20 0 15.5142 0 10C0 4.48583 4.48583 0 10 0C15.5142 0 20 4.48583 20 10ZM15.8333 9.16667C15.8333 8.2475 15.0858 7.5 14.1667 7.5H5.83333C4.91417 7.5 4.16667 8.2475 4.16667 9.16667V10.8333C4.16667 11.7525 4.91417 12.5 5.83333 12.5H14.1667C15.0858 12.5 15.8333 11.7525 15.8333 10.8333V9.16667Z'
          fill='#08D3BB'
        />
      </g>
      <defs>
        <clipPath id='clip0_5484_4136'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default BlockedIcon
