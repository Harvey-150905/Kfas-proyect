import { NextResponse } from "next/server";
import { createPueblo, getPueblos } from "../../../lib/pueblos";

export async function GET() {
  const pueblos = await getPueblos();
  return NextResponse.json({ pueblos });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.nombre || !body?.descripcion || !body?.imagen_url || body.latitud === undefined || body.longitud === undefined) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const nuevo = await createPueblo({
      nombre: body.nombre,
      descripcion: body.descripcion,
      distancia_km: body.distancia_km ?? null,
      imagen_url: body.imagen_url,
      latitud: Number(body.latitud),
      longitud: Number(body.longitud),
    });

    return NextResponse.json({ pueblo: nuevo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

