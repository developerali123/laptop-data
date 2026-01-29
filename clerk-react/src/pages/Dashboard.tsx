import React from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";

export default function Dashboard() {
  const { isLoaded, user } = useUser();
  if (!isLoaded) return <div>Loading user...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>Signed in as: {user?.primaryEmailAddress?.emailAddress ?? user?.firstName}</div>
      <SignOutButton />
    </div>
  );
}
