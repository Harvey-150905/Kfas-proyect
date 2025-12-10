import crypto from "crypto";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.NEXTAUTH_SECRET || process.env.SECRET_KEY;
  if (!secret) {
    // Fallback dev-only secret to avoid crashes; debería configurarse en entorno real.
    return "dev-secret-change-me";
  }
  return secret;
}

export function createSessionToken(userId: string): string {
  const secret = getSessionSecret();
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `${userId}.${issuedAt}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function parseSessionToken(token: string): { userId: string } | null {
  const [userId, issuedAtStr, signature] = token.split(".");
  if (!userId || !issuedAtStr || !signature) return null;

  const issuedAt = Number(issuedAtStr);
  if (Number.isNaN(issuedAt)) return null;

  if (issuedAt + SESSION_MAX_AGE < Math.floor(Date.now() / 1000)) return null;

  const secret = getSessionSecret();
  const payload = `${userId}.${issuedAt}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    return null;
  }

  return { userId };
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
