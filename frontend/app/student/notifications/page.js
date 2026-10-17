"use client";

import React from "react";
import NotificationsList from "@/Components/student/NotificationsList";

export default function StudentNotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 border-b border-white/8 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Notifications
        </h1>
        <p className="text-xs text-neutral-400">
          Stay informed with official club announcements, workshop invitations, and campus updates.
        </p>
      </div>

      <NotificationsList />
    </div>
  );
}
