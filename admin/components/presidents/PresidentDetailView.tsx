'use client';

import React, { useState, useEffect } from 'react';
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
  Loader2,
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { api } from '@/lib/api';
import { mockPresidents, President } from '@/lib/mockData';

interface PresidentDetailViewProps {
  presidentId: string;
}

export const PresidentDetailView: React.FC<PresidentDetailViewProps> = ({
  presidentId,
}) => {
  const [president, setPresident] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresident = async () => {
      try {
        setLoading(true);
        const res = await api.presidents.getById(presidentId);
        if (res.success && res.president) {
          setPresident(res.president);
          return;
        }
      } catch (err) {
        console.warn('Backend fetch failed, using fallback mock president:', err);
      } finally {
        setLoading(false);
      }

      const fallback = mockPresidents.find((p) => p.id === presidentId) || mockPresidents[0];
      setPresident(fallback);
    };

    fetchPresident();
  }, [presidentId]);

  if (loading && !president) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const currentPresident = president || mockPresidents[0];
  const permissions = currentPresident.permissions || {
    clubManagement: true,
    eventManagement: true,
    memberManagement: true,
    announcements: true,
    budgetAccess: true,
    analyticsExport: true,
  };

  const permissionsList = [
    { label: 'Club Charter & Profile Management', enabled: permissions.clubManagement, desc: 'Can edit club description, charter, meeting times, and rooms' },
    { label: 'Event Creation & Scheduling', enabled: permissions.eventManagement, desc: 'Can publish workshops, competitions, and request campus venues' },
    { label: 'Member Induction & Roster', enabled: permissions.memberManagement, desc: 'Can approve applicant registrations and export membership rosters' },
    { label: 'Campus-wide Announcements', enabled: permissions.announcements, desc: 'Can push notifications to student club members' },
    { label: 'Budget & Financial Grants', enabled: permissions.budgetAccess, desc: 'Can submit fund requests and purchase receipts to Student Council' },
    { label: 'Analytics & Export Rights', enabled: permissions.analyticsExport, desc: 'Can access attendance telemetry and export engagement logs' },
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
      </div>

      {/* Main Profile Header */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar
              name={currentPresident.name}
              src={currentPresident.avatar}
              size="xl"
              status="online"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {currentPresident.name}
                </h1>
                <StatusBadge status={currentPresident.status || 'Active'} size="md" />
              </div>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">
                  ID: {currentPresident.studentId || currentPresident.enrollmentNumber}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-semibold text-blue-600">
                  President, {currentPresident.clubName || 'Assigned Club'}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span className="font-medium text-gray-700">{currentPresident.department}</span>
                <span>•</span>
                <span>{currentPresident.year}</span>
                <span>•</span>
                <span className="font-mono">{currentPresident.email}</span>
                <span>•</span>
                <span>Appointed {currentPresident.joinedDate || 'Recently'}</span>
              </div>
            </div>
          </div>

          {currentPresident.clubId && (
            <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-xs shrink-0 sm:max-w-xs w-full">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Presiding Club
              </p>
              <Link
                href={`/clubs/${currentPresident.clubId}`}
                className="font-semibold text-gray-900 hover:text-blue-600 text-sm flex items-center gap-1.5"
              >
                <span>{currentPresident.clubName}</span>
                <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Leadership KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Club Members"
          value={currentPresident.clubMembers || 1}
          supportingText="Active student membership"
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Events Created"
          value={currentPresident.eventsCreated || 0}
          supportingText="Calendar workshops & camps"
          icon={<Calendar className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Engagement Rating"
          value={currentPresident.engagement || '92%'}
          trend="+5.8%"
          trendType="positive"
          supportingText="Semester performance"
          icon={<Activity className="h-5 w-5 text-emerald-600" />}
        />
        <StatCard
          title="Campus Honor"
          value="Distinguished"
          supportingText="Council certified"
          icon={<Award className="h-5 w-5 text-amber-600" />}
        />
      </div>

      {/* Permissions Grid */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
        <div className="pb-3 mb-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Assigned Platform Authorizations</h3>
          <p className="text-xs text-gray-500">Security privileges and administrative features granted to this president account</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {permissionsList.map((perm, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
                perm.enabled
                  ? 'border-gray-200 bg-gray-50/50'
                  : 'border-gray-100 bg-white opacity-60'
              }`}
            >
              {perm.enabled ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-300 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-xs font-semibold text-gray-900">{perm.label}</p>
                <p className="mt-0.5 text-[11px] text-gray-500 leading-relaxed">{perm.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
