import { getServerSession } from "@/features/auth/api";
import { ProfilePage } from "@/features/profile/pages";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return <ProfilePage />;
}
