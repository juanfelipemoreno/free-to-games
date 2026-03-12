import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try{
        const { searchParams } = new URL(request.url)

        const category = searchParams.get("category");
        const platform = searchParams.get("platform");
        const sortBy = searchParams.get("sort-by");

        const baseUrl = "https://www.freetogame.com/api/games";

        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (platform) params.append("platform", platform);
        if (sortBy) params.append("sort-by", sortBy);
        
        const url = `${baseUrl}?${params.toString()}`;

        const response = await fetch(url, {
            next: { revalidate : 60 }
        });

        if(!response.ok){
            throw new Error("Error al obtener juegos externos");
        }

        const data = await response.json();

        return NextResponse.json(data);

    }catch(error){
        return NextResponse.json(
            { error : "Error al obtener los juegos" + error},
            { status: 500}
        )
    }
}