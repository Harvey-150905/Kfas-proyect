import { NextResponse } from "next/server";
import { validateCredentials } from "../../../../lib/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json({ error: "Ingresa tus credenciales" }, { status: 400 });
    }

    const user = await validateCredentials(email, password);

    if (!user) {
      return NextResponse.json({ error: "Email o contraseña incorrectos" }, { status: 401 });
    }

    const response = NextResponse.json({ user }, { status: 200 });
    response.cookies.set("conecta_auth", user.id, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
