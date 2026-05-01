/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

type AuthContextValue = {
  isSignedIn: boolean
  signIn: (user: any) => void
  signOut: () => void
  getUser: () => any
}

const AUTH_STORAGE_KEY = 'swi-auth-user'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  })

  const value = useMemo(
    () => ({
      isSignedIn: !!user,
      signIn: (newUser: any) => {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
        setUser(newUser)
      },
      signOut: () => {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        setUser(null)
      },
      getUser: () => user,
    }),
    [user],
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
