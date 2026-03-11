
import { Navbar } from "@/components/navbar/navbar";
import { getGames } from "@/lib/api";
import { Game } from "@/types/game";

export default async function Home() {
  const games: Game[] = await getGames();

  return (
   
    <main>
      <Navbar/>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.slice(0, 12).map((game) => (
          <div
            key={game.id}
            className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <img src={game.thumbnail} alt={game.title} />
            <div className="p-4">
              <h2 className="font-bold">{game.title}</h2>
              <p className="text-sm text-gray-400">{game.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}