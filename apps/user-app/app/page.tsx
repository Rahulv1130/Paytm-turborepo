import { getServerSession } from "next-auth"
import { authOptions } from "./api/lib/auth"
import { redirect } from "next/navigation";


export default async function () {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  redirect("/api/auth/signin");
}