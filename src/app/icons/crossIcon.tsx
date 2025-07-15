import React from 'react'

type CrossIconProps = {
  className?: string
  onClick?: () => void
}

const CrossIcon: React.FC<CrossIconProps> = ({ className, onClick }) => (
  <svg
    width='17'
    height='16'
    viewBox='0 0 16 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    onClick={onClick}
  >
    <path
      opacity='0.59'
      d='M3.89333 10.6755C6.04272 12.8249 9.52759 12.8249 11.677 10.6755C13.8264 8.52609 13.8264 5.04123 11.677 2.89183C9.52759 0.742432 6.04272 0.742432 3.89333 2.89183C1.74393 5.04123 1.74393 8.52609 3.89333 10.6755Z'
      fill='#344054'
    />
    <path
      d='M9.6521 5.01562L6.16635 8.54736'
      stroke='white'
      stroke-linecap='round'
    />
    <path
      d='M9.6521 8.54736L6.16635 5.01562'
      stroke='white'
      stroke-linecap='round'
    />
  </svg>
)

export default CrossIcon
