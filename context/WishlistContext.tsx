'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface WishlistContextValue {
    wishlist: number[]
    toggle: (id: number) => void
    isInWishlist: (id: number) => boolean
    count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<number[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('nexus_wishlist')
        if (stored) setWishlist(JSON.parse(stored))
    }, [])

    const toggle = (id: number) => {
        setWishlist((prev) => {
            const next = prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
            localStorage.setItem('nexus_wishlist', JSON.stringify(next))
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
