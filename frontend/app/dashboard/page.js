"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/student");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center text-xs text-neutral-400">
      Redirecting to Student Hub...
    </div>
  );
}
