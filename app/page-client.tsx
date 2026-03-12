'use client'

import type { Game } from '@/types/game'
import { useState, useEffect } from 'react'
import { getGames } from "@/lib/api";
import { Navbar } from "@/components/navbar/navbar";
import Link from "next/link";
import { useFilteredGames } from '@/hooks/useGame';

export function HomeClient({ gamesInitial }: { gamesInitial: Game[] }) {

    const [games, setGames] = useState<Game[]>(gamesInitial);

    const [search, setSearch] = useState('');

    const filtered = useFilteredGames(games, search)

    return (

        <main>
            <Navbar onSearch={setSearch} />
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
        </main>
    );
}