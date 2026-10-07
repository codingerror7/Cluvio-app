'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  Calendar,
  Users,
  Megaphone,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Shield,
  Activity,
  Award,
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { mockPresidents, President } from '@/lib/mockData';

interface PresidentDetailViewProps {
  presidentId: string;
}

export const PresidentDetailView: React.FC<PresidentDetailViewProps> = ({
  presidentId,
}) => {
  const president: President =
    mockPresidents.find((p) => p.id === presidentId) || mockPresidents[0];

  const permissionsList = [
    { label: 'Club Charter & Profile Management', enabled: president.permissions.clubManagement, desc: 'Can edit club description, charter, meeting times, and rooms' },
    { label: 'Event Creation & Scheduling', enabled: president.permissions.eventManagement, desc: 'Can publish workshops, competitions, and request campus venues' },
    { label: 'Member Induction & Roster', enabled: president.permissions.memberManagement, desc: 'Can approve applicant registrations and export membership rosters' },
    { label: 'Campus-wide Announcements', enabled: president.permissions.announcements, desc: 'Can push notifications to student club members' },
    { label: 'Budget & Financial Grants', enabled: president.permissions.budgetAccess, desc: 'Can submit fund requests and purchase receipts to Student Council' },
    { label: 'Analytics & Export Rights', enabled: president.permissions.analyticsExport, desc: 'Can access attendance telemetry and export engagement logs' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/presidents"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all presidents</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/clubs/${president.clubId}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <span>View Assigned Club</span>
            <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
          </Link>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Modify Access</span>
          </button>
        </div>
      </div>

      {/* Profile Header Banner */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar
              name={president.name}
              src={president.avatar}
              size="xl"
              status="online"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {president.name}
                </h1>
                <StatusBadge status={president.status} size="md" />
              </div>

              <p className="mt-1 text-sm text-gray-600 font-medium">
                President,{' '}
                <Link
                  href={`/clubs/${president.clubId}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {president.clubName}
                </Link>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span className="font-mono text-gray-600">{president.studentId}</span>
                <span>•</span>
                <span>{president.department}</span>
                <span>•</span>
                <span>{president.year}</span>
                <span>•</span>
                <span className="font-mono">{president.email}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-3.5 text-xs text-gray-600 shrink-0">
            <p className="font-semibold text-gray-900">Term Validation</p>
            <p className="mt-0.5 text-gray-400">Appointed on {president.joinedDate}</p>
            <p className="mt-1 text-[11px] text-emerald-700 font-medium">Verified by Dean of Student Affairs</p>
          </div>
        </div>
      </div>

      {/* Leadership Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Club Members"
          value={president.clubMembers}
          supportingText="Under current term"
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Events Created"
          value={president.eventsCreated}
          supportingText="Authorized & conducted"
          icon={<Calendar className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Announcements"
          value={president.announcements}
          supportingText="Published to students"
          icon={<Megaphone className="h-5 w-5 text-amber-600" />}
        />
        <StatCard
          title="Club Engagement"
          value={president.engagement}
          trend="+5.2%"
          trendType="positive"
          supportingText="Retention index"
          icon={<Activity className="h-5 w-5 text-emerald-600" />}
        />
      </div>

      {/* Main Grid: Permissions & Activity & Performance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Permissions and Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Permissions Overview Panel */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Governance & Role Permissions</h3>
                <p className="text-xs text-gray-500">Security permissions granted under Cluvio Student Leadership protocol</p>
              </div>
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 font-mono">
                Role: President
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {permissionsList.map((perm, idx) => (
                <div key={idx} className="flex items-start justify-between py-3.5">
                  <div className="pr-4">
                    <p className="text-xs font-semibold text-gray-900">{perm.label}</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">{perm.desc}</p>
                  </div>
                  <div className="shrink-0 pt-0.5">
                    {perm.enabled ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Enabled</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Disabled</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Semester Performance Appraisal</h3>
            <p className="text-xs text-gray-500 mb-4">Official club audit benchmarks for Academic Year 2026</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-3.5">
                <p className="text-xs text-gray-500">Attendance Compliance</p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-mono">96.4%</p>
                <p className="mt-1 text-[11px] text-emerald-600 font-medium">Exceeds threshold</p>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-3.5">
                <p className="text-xs text-gray-500">Event Delivery Score</p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-mono">4.8 / 5.0</p>
                <p className="mt-1 text-[11px] text-emerald-600 font-medium">Student ratings</p>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-3.5">
                <p className="text-xs text-gray-500">Budget Reconciliation</p>
                <p className="mt-1 text-xl font-bold text-gray-900 font-mono">100%</p>
                <p className="mt-1 text-[11px] text-emerald-600 font-medium">All invoices submitted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Recent Activity */}
        <div className="lg:col-span-1 space-y-6">
          <ActivityFeed
            activities={
              president.recentActivity.length > 0
                ? president.recentActivity
                : [
                    {
                      id: 'pa-def-1',
                      title: 'Presided over Club General Body',
                      description: 'Conducted semester induction address',
                      timestamp: '2 days ago',
                      type: 'president',
                    },
                    {
                      id: 'pa-def-2',
                      title: 'Submitted Venue Booking',
                      description: 'Reserved Seminar Hall for next event',
                      timestamp: '5 days ago',
                      type: 'event',
                    },
                  ]
            }
            title="President Action Log"
          />

          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Student Council Notes
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              President credentials renewed successfully for the current semester. No compliance flags or disciplinary notices on file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
