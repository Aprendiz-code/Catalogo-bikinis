import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Sin admin ni autenticación, solo pasamos la solicitud
  return NextResponse.next({ request });
}
