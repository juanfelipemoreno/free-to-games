'use client'

// ============================================================
// app/wishlist/page.tsx — Wishlist page
// ============================================================

import { useEffect, useState } from 'react'
import { useWishlist } from '@/context/WishlistContext'
import { getGames } from '@/lib/api'
import type { Game } from '@/types/game'
import { Navbar } from '@/components/navbar/navbar'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlist } = useWishlist()
  const [allGames, setAllGames] = useState<Game[]>([])

  useEffect(() => {
    getGames().then(setAllGames).catch(console.error)
  }, [])

  const saved = allGames.filter((g) => wishlist.includes(g.id))

  return (
    <>
      <Navbar />
      <main>
        <div className="px-8 pt-10 pb-5">
          <div className="flex items-center gap-3 font-['Orbitron'] text-base tracking-[3px] text-slate-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ff006e] animate-pulse" />
            MI WISHLIST
          </div>
          <p className="font-['Share_Tech_Mono'] text-[11px] tracking-wide text-slate-600">
            Juegos que quieres jugar más tarde
          </p>
        </div>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl opacity-20">♡</span>
            <h2 className="font-['Orbitron'] text-lg tracking-[3px] text-slate-600">WISHLIST VACÍA</h2>
            <p className="font-['Share_Tech_Mono'] text-xs tracking-wide text-slate-700">
              Agrega juegos usando el ícono ♥ en las cards
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {saved.slice(0, 24).map((game) => (
                    <Link
                        href={`/game/${game.id}`}
                        key={game.id}
                        className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition"
                    >
                        <img src={game.thumbnail} alt={game.title} />

                        <div className="p-4">
                            <h2 className="font-bold">{game.title}</h2>
                            <p className="text-sm text-gray-400">{game.genre}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </main>
    </>
  )
}
