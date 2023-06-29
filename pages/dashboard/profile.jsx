import React, { useEffect } from "react";
import useStore from "../../store";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function Profile() {
  const setActivePage = useStore((state) => state.setActivePage);

  useEffect(() => {
    setActivePage("Profile");
  }, [setActivePage]);

  return (
    <main>
      <ProfileForm />
    </main>
  );
}
