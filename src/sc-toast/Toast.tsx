import ReactDOM from 'react-dom'
import { toast, Toaster } from 'react-hot-toast'

import { Colors } from '../sc-design/colors'

export default function Toast() {
  return ReactDOM.createPortal(
    <Toaster
      toastOptions={{
        icon: null,
        style: {
          fontFamily: 'Assistant',
          fontWeight: '600',
        },
        error: {
          style: {
            background: Colors.red,
            color: Colors.white,
          },
        },
        success: {
          style: {
            background: Colors.green,
            color: Colors.white,
          },
        },
      }}
    />,
    document.body
  )
}

export { toast }
