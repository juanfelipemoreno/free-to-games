'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface WishlistContextValue {
    wishlist: number[]
    toggle: (id: number) => void
    isInWishlist: (id: number) => boolean
    count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<number[]>([])
    const { user, isAuthenticated } = useAuth()

    // Cargar wishlist cuando usuario cambia
    useEffect(() => {
        if (isAuthenticated && user?.id) {
            // Usar el ID del usuario como clave
            const wishlistKey = `nexus_wishlist_${user.id}`
            const stored = localStorage.getItem(wishlistKey)
            if (stored) {
                try {
                    setWishlist(JSON.parse(stored))
                } catch {
                    setWishlist([])
                }
            } else {
                setWishlist([])
            }
        } else {
            // Limpiar wishlist si no hay usuario autenticado
            setWishlist([])
        }
    }, [isAuthenticated, user?.id])

    const toggle = (id: number) => {
        if (!user?.id) return

        setWishlist((prev) => {
            const next = prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
            // Guardar con la clave del usuario
            const wishlistKey = `nexus_wishlist_${user.id}`
            localStorage.setItem(wishlistKey, JSON.stringify(next))
            return next
        })
    }

    const isInWishlist = (id: number) => wishlist.includes(id)

    return (
        <WishlistContext.Provider value={{ wishlist, toggle, isInWishlist, count: wishlist.length }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const ctx = useContext(WishlistContext)
    if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
    return ctx
}
