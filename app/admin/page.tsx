import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export default async function AdminIndex() {
  const cookieStore = await cookies();
  const authenticated = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  redirect(authenticated ? "/admin/dashboard" : "/admin/login");
}
