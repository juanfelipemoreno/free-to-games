import { getGames } from '@/lib/api'
import { CatalogoClient } from './catalogo-client'

export const dynamic = 'force-dynamic';

export default async function CatalogoPage() {
  const [games] = await Promise.all([getGames()])

  return <CatalogoClient gamesInitial={games} />
}
