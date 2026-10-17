"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  checkSessionExpiry,
  updateLastActivity,
  getAuthToken,
  getStoredUser,
  clearAuthToken,
} from "@/lib/api";
import { UserRole, isValidRole } from "@/lib/roles";

/**
 * SessionManager Component
 * 
 * Enforces role-based route protection across the two valid roles:
 * - 'student' -> /student/* routes only
 * - 'club_president' -> /president/* routes only
 *
 * If a student attempts to access president routes, redirects to /student.
 * If a president attempts to access student routes, redirects to /president.
 * Automatically checks for 30-day inactivity and maintains persistent active session.
 */
export default function SessionManager() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    const user = getStoredUser();

    // 1. Session Expiry Check
    if (token) {
      const expired = checkSessionExpiry();
      if (expired) {
        clearAuthToken();
        if (pathname?.startsWith("/student") || pathname?.startsWith("/president")) {
          router.push("/Login?reason=inactive");
          return;
        }
      } else {
        updateLastActivity(true);
      }
    }

    // 2. Cross-Role Protection (Enforced when an authenticated user session is active)
    if (user && user.role) {
      // Validate role integrity
      if (!isValidRole(user.role)) {
        clearAuthToken();
        router.push("/Login?reason=unauthorized");
        return;
      }

      const isStudentRoute = pathname?.startsWith("/student");
      const isPresidentRoute = pathname?.startsWith("/president");

      // Student trying to access president route
      if (user.role === UserRole.STUDENT && isPresidentRoute) {
        console.warn("Cross-Role Block: Student cannot access president portal.");
        router.replace("/student");
        return;
      }

      // President trying to access student route
      if (user.role === UserRole.CLUB_PRESIDENT && isStudentRoute) {
        console.warn("Cross-Role Block: President cannot access student portal.");
        router.replace("/president");
        return;
      }
    }

    // 3. User interaction activity tracker
    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart", "click"];
    const handleUserActivity = () => {
      updateLastActivity(false);
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // 4. Visibility change handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && getAuthToken()) {
        const expired = checkSessionExpiry();
        if (expired) {
          clearAuthToken();
          if (pathname?.startsWith("/student") || pathname?.startsWith("/president")) {
            router.push("/Login?reason=inactive");
          }
        } else {
          updateLastActivity(true);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 5. Periodic background expiry check
    const intervalId = setInterval(() => {
      if (getAuthToken()) {
        const expired = checkSessionExpiry();
        if (expired) {
          clearAuthToken();
          if (pathname?.startsWith("/student") || pathname?.startsWith("/president")) {
            router.push("/Login?reason=inactive");
          }
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
