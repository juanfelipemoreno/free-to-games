'use client'

import { useWishlist } from '@/context/WishlistContext'

interface WishlistButtonProps {
    gameId: number
    variant?: 'icon' | 'full'
}

export function WishlistButton({ gameId, variant = 'icon' }: WishlistButtonProps) {
    const { isInWishlist, toggle } = useWishlist()
    const active = isInWishlist(gameId)

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        toggle(gameId)
    }

    if (variant === 'full') {
        return (
            <button
                onClick={handleClick}
                className={`w-full py-3 font-orbitron text-xs font-bold tracking-widest transition-all flex items-center justify-center gap-2 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] ${active
                        ? 'bg-pink-500/20 border border-pink-500 text-pink-400 shadow-[0_0_30px_rgba(255,0,110,0.3)]'
                        : 'bg-transparent border border-pink-500/40 text-pink-400 hover:bg-pink-500/10 hover:shadow-[0_0_20px_rgba(255,0,110,0.2)]'
                    }`}
            >
                ♥ {active ? 'EN WISHLIST' : 'AGREGAR'}
            </button>
        )
    }

    return (
        <button
            onClick={handleClick}
            className={`w-7 h-7 flex items-center justify-center text-sm border transition-all [clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%,0_4px)] ${active
                    ? 'text-pink-400 bg-pink-500/10 border-pink-500'
                    : 'text-slate-600 border-pink-500/30 hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500'
                }`}
        >
            ♥
        </button>
    )
}
