import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const id = searchParams.get("id");

        if(!id){
            return NextResponse.json(
                { error : "El id del juego es obligatorio"},
                { status: 400}
            );
        }

        const url = "https://www.freetogame.com/api/game?id=" + id;

        const response = await fetch(url,{
            next : { revalidate : 60}
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