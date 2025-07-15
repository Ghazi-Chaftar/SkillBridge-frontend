import React from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle
} from '@/src/app/shared/components'

interface PopupProps {
  title?: React.ReactNode
  isOpen: boolean
  handleOpen: () => void
  children: React.ReactNode
  className?: string
  handleClose?: () => void
  withoutCloseIcon?: boolean
  disableOutsideClick?: boolean
  disableKeyboardClose?: boolean
}

export const Popup: React.FC<PopupProps> = ({
  title,
  isOpen,
  handleOpen,
  children,
  className,
  handleClose,
  withoutCloseIcon = false,
  disableOutsideClick = false,
  disableKeyboardClose = false
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={handleClose ? handleClose : handleOpen}>
      <DialogContent
        className={className}
        withoutCloseButton={withoutCloseIcon}
        disableOutsideClick={disableOutsideClick}
        onEscapeKeyDown={
          disableKeyboardClose ? e => e.preventDefault() : undefined
        }
      >
        <DialogTitle>{title}</DialogTitle>
        {children}
        {!withoutCloseIcon && (
          <DialogClose onClose={handleClose ? handleClose : handleOpen} />
        )}
      </DialogContent>
    </Dialog>
  )
}
