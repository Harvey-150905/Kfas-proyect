export async function GET() {
  return Response.json({
    ok: true,
    project: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "LOADED" : "MISSING",
    service: process.env.FIREBASE_SERVICE_ACCOUNT ? "LOADED" : "MISSING",
  });
}
