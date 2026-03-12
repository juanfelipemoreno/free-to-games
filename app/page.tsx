
import { getGames } from '@/lib/api'
import { HomeClient } from "./page-client";

export default async function Home() {
  const [games] = await Promise.all([getGames()])

  return <HomeClient gamesInitial={games}/>
}