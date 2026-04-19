
import { getGames } from '@/lib/api'
import { HomeClient } from "./page-client";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [games] = await Promise.all([getGames()])

  return <HomeClient gamesInitial={games}/>
}