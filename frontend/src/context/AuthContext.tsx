/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

type AuthContextValue = {
  isSignedIn: boolean
  signIn: () => void
  signOut: () => void
}

const AUTH_STORAGE_KEY = 'swi-auth-signed-in'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(
    () => window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  )

  const value = useMemo(
    () => ({
      isSignedIn,
      signIn: () => {
        window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
        setIsSignedIn(true)
      },
      signOut: () => {
        window.localStorage.setItem(AUTH_STORAGE_KEY, 'false')
        setIsSignedIn(false)
      },
    }),
    [isSignedIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
