declare module 'react-signature-canvas' {
  import * as React from 'react'

  export interface ReactSignatureCanvasProps {
    penColor?: string

    [key: string]: any
  }

  export default class ReactSignatureCanvas extends React.Component<ReactSignatureCanvasProps> {
    _canvas: HTMLCanvasElement
    clear(): void
  }
}

declare module 'trim-canvas'
