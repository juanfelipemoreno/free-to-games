'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthContextValue } from '@/types/auth'
import { authenticateUser, validateToken, getUserFromToken } from '@/lib/authService'
import { setAuthCookie, removeAuthCookie } from '@/lib/authCookies'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restaurar sesión desde localStorage al montar
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

    if (storedToken && validateToken(storedToken)) {
      setToken(storedToken)
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } else {
      // Limpiar datos inválidos
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authenticateUser(email, password)
      
      // Guardar en estado
      setToken(response.token)
      setUser(response.user)

      // Persistir en localStorage
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('auth_user', JSON.stringify(response.user))

      // Guardar en cookies del servidor
      await setAuthCookie(response.token)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error de autenticación'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    removeAuthCookie()
    setError(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const clearError = () => {
    setError(null)
  }

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    error,
    login,
    logout,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
