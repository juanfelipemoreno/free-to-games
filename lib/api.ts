export async function getGames() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const url = `${baseUrl}/api/games`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Error al obtener los datos");
    }

    return res.json();
}

export async function getGamesByCategory(category: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const url = `${baseUrl}/api/games?category=${category}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Error al obtener los datos");
    }

    return res.json();
}

export async function getGamesByPlatform(platform: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(
        `${baseUrl}/api/games?platform=${platform}`
    );

    if (!res.ok) throw new Error("Error al obtener juegos");

    return res.json();
}

export async function getSortedGames(sort: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(
        `${baseUrl}/api/games?sort-by=${sort}`
    );

    if (!res.ok) throw new Error("Error al obtener juegos");

    return res.json();
}

export async function getGameById(id: number) {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    const res = await fetch(
        `${baseUrl}/api/game?id=${id}`
    );

    if (!res.ok) throw new Error("Error al obtener el juego");

    return res.json();
}