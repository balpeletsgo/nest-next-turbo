"use client";

import { useGetProfile } from "../api/getProfile";

export function ProfilePage() {
  const { data } = useGetProfile();

  return <pre className="font-mono">{JSON.stringify(data, null, 2)}</pre>;
}
