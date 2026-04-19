'use client'

import type { Game } from '@/types/game'
import { useState, useEffect } from 'react'
import { getGames } from "@/lib/api";
import { Navbar } from "@/components/navbar/navbar";
import Link from "next/link";
import { useFilteredGames } from '@/hooks/useGame';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function HomeClient({ gamesInitial }: { gamesInitial: Game[] }) {

    const [games, setGames] = useState<Game[]>(gamesInitial);

    const [search, setSearch] = useState('');

    const filtered = useFilteredGames(games, search)
    
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    return (

        <main>
            <Navbar onSearch={setSearch} />
            
            {isAuthenticated ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {filtered.slice(0, 24).map((game) => (
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
            ) : (
              <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-950 via-blue-950 to-zinc-950">
                <div className="text-center max-w-md">
                  <h1 className="text-5xl font-bold text-white mb-4 font-orbitron">
                    Bienvenido a <span className="text-blue-500">GAME FREE</span>
                  </h1>
                  <p className="text-gray-400 mb-8">Descubre cientos de juegos gratis sin pagar nada.</p>
                  <button
                    onClick={() => router.push('/login')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition transform hover:scale-105 active:scale-95"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            )}
        </main>
    );
}