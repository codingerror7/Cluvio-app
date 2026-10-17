"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSessionExpiry, updateLastActivity, getAuthToken } from "@/lib/api";

/**
 * SessionManager Component
 * 
 * Ensures that logged-in users (Student, Member, Club Head) retain their active
 * session for 30 days. Automatically checks for 30-day inactivity on user
 * interactions, visibility changes, and periodic background timer.
 * Automatically clears session and redirects if inactive for 30+ days.
 */
export default function SessionManager() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 1. Initial check on mount / route change
    // In UI demonstration mode, /student and /president are accessible without backend authentication
    const isProtected = pathname?.startsWith("/dashboard/legacy");

    // 2. Track user interactions to update last active timestamp
    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart", "click"];
    const handleUserActivity = () => {
      updateLastActivity(false);
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // 3. Check when tab becomes visible after being backgrounded
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (getAuthToken()) {
          const expired = checkSessionExpiry();
          if (expired && isProtected) {
            router.push("/Login?reason=inactive");
          } else if (!expired) {
            updateLastActivity(true);
          }
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 4. Periodic background check every 5 minutes
    const intervalId = setInterval(() => {
      if (getAuthToken()) {
        const expired = checkSessionExpiry();
        if (expired && isProtected) {
          router.push("/Login?reason=inactive");
        }
      }
    }, 5 * 60 * 1000);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [pathname, router]);

  return null;
}
