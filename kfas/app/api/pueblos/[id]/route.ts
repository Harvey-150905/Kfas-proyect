import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parseSessionToken } from "@/lib/auth";
import { deletePueblo, getPuebloById, updatePueblo } from "@/lib/pueblos";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const pueblo = await getPuebloById(params.id);
  if (!pueblo) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json({ pueblo });
}

export async function PUT(request: Request, { params }: Params) {
  const session = cookies().get("conecta_auth");
  const parsed = session?.value ? parseSessionToken(session.value) : null;
  if (!parsed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  await updatePueblo(params.id, body);
  const updated = await getPuebloById(params.id);
  return NextResponse.json({ pueblo: updated });
}

export async function DELETE(_: Request, { params }: Params) {
  const session = cookies().get("conecta_auth");
  const parsed = session?.value ? parseSessionToken(session.value) : null;
  if (!parsed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  await deletePueblo(params.id);
  return NextResponse.json({ ok: true });
}
