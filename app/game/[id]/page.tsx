import { GameDetail } from "@/components/games/GameDetail";
import { Navbar } from "@/components/navbar/navbar";
import { getGameById } from "@/lib/api";

interface Props {
    params: {
        id: number
    }
}

export default async function GamePage({ params }: Props) {

    const { id } = await params

    const game = await getGameById(id)

    return (
    <>
      <Navbar />
      <main>
        <GameDetail game={game} />
      </main>
    </>
  )
}

