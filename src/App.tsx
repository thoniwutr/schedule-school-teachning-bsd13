import React from 'react'
import GlobalStyle  from './sc-design/global'
import Routes from './router/Routes'
import { AuthProvider } from './sc-context/AuthContext'

export default function App() {
  return (
    <React.StrictMode>
        <GlobalStyle />
            <AuthProvider>
            <Routes />
            </AuthProvider>          
    </React.StrictMode>
  )
}
