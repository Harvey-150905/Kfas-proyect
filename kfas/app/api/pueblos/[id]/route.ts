import { NextResponse } from "next/server";
import { getPuebloById } from "../../../../lib/pueblos";

type Params = { params: { id: string } };

export async function GET(_request: Request, context: Params) {
  const pueblo = await getPuebloById(context.params.id);

  if (!pueblo) {
    return NextResponse.json({ error: "Pueblo no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ pueblo });
}

