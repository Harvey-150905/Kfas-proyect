import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../../../../lib/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, password, confirmPassword, pueblo } = body ?? {};

    if (!nombre || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "Todos los campos obligatorios deben completarse" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Las contraseñas no coinciden" }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Ya existe una cuenta con este email" }, { status: 409 });
    }

    const newUser = await createUser({ nombre, email, password, pueblo });

    const response = NextResponse.json({ user: newUser }, { status: 201 });
    response.cookies.set("conecta_auth", newUser.id, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
