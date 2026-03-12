'use client'

import { useMemo } from 'react'
import type { Game } from '@/types/game'

export function useFilteredGames(games: Game[], search: string) {
  return useMemo(() => {
    let filtered = games
    
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (g) => g.title.toLowerCase().includes(q) || g.short_description.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [games, search])
}