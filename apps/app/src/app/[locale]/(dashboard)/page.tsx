import { SignOut } from "@/components/sign-out";
import { getI18n } from "@/locales/server";
import { getUser } from "@v1/supabase/queries";
import React from "react";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const { data } = await getUser();
  const t = await getI18n();

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>{t("welcome", { name: data?.user?.email ?? 'Guest' })}</p>
        <SignOut />
      </div>
    </main>
  );
}
