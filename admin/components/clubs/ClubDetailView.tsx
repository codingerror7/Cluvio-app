'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Users,
  Wallet,
  Activity,
  MapPin,
  Clock,
  Mail,
  Shield,
  Download,
  Edit,
  ExternalLink,
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { mockClubs, Club } from '@/lib/mockData';

interface ClubDetailViewProps {
  clubId: string;
}

export const ClubDetailView: React.FC<ClubDetailViewProps> = ({ clubId }) => {
  // Find club or fallback to first club
  const club: Club =
    mockClubs.find((c) => c.id === clubId) || mockClubs[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Back Nav & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/clubs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all clubs</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-gray-400" />
            <span>Export Roster</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <Shield className="h-3.5 w-3.5 text-gray-400" />
            <span>Manage Permissions</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors"
          >
            <Edit className="h-3.5 w-3.5" />
            <span>Edit Charter</span>
          </button>
        </div>
      </div>

      {/* Main Club Banner / Header Card */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl shadow-xs ring-1 ring-gray-200/60">
              {club.logo}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {club.name}
                </h1>
                <StatusBadge status={club.status} size="md" />
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {club.category}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500 max-w-2xl leading-relaxed">
                {club.description}
              </p>

              {/* Meta details */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span>Chartered on {club.createdDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span>{club.meetingSchedule}</span>
                </div>
              </div>
            </div>
          </div>

          {/* President Card snippet */}
          <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:w-64 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Club President
            </p>
            <div className="mt-2.5 flex items-center gap-3">
              <Avatar
                name={club.president.name}
                src={club.president.avatar}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-gray-900">
                  {club.president.name}
                </p>
                <p className="truncate text-[11px] text-gray-500">
                  {club.president.email}
                </p>
                <Link
                  href={`/presidents/${club.president.id}`}
                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline"
                >
                  <span>View profile</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Members"
          value={club.membersCount}
          trend="+18"
          trendType="positive"
          supportingText="Active enrolled students"
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Events Hosted"
          value={club.eventsCount}
          supportingText="14 completed, 4 planned"
          icon={<Calendar className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Budget Allocation"
          value={`₹${(club.budgetAllocated / 1000).toFixed(0)}k`}
          supportingText={`₹${(club.budgetSpent / 1000).toFixed(1)}k spent (85%)`}
          icon={<Wallet className="h-5 w-5 text-emerald-600" />}
        />
        <StatCard
          title="Engagement Rate"
          value={`${club.engagementRate}%`}
          trend="+6.4%"
          trendType="positive"
          supportingText="Campus average: 76%"
          icon={<Activity className="h-5 w-5 text-amber-600" />}
        />
      </div>

      {/* Main Content: Leadership, Events, Members, Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Leadership & Events & Members */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leadership Roster */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Executive Leadership</h3>
            <p className="text-xs text-gray-500 mb-4">Official club committee elected for Academic Year 2026</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {club.leadership.map((leader, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/60 p-3"
                >
                  <Avatar name={leader.name} src={leader.avatar} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900">
                      {leader.name}
                    </p>
                    <p className="text-[11px] font-medium text-blue-600">
                      {leader.role}
                    </p>
                    <p className="truncate text-[10px] text-gray-400">
                      {leader.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent & Upcoming Events */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Club Events</h3>
                <p className="text-xs text-gray-500">Official workshops, competitions, and seminars</p>
              </div>
              <span className="text-xs font-medium text-gray-400 font-mono">
                {club.recentEvents.length} events logged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    <th className="py-2.5 font-medium">Event Title</th>
                    <th className="py-2.5 font-medium">Date & Time</th>
                    <th className="py-2.5 font-medium">Location</th>
                    <th className="py-2.5 font-medium text-right">Attendees</th>
                    <th className="py-2.5 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {club.recentEvents.map((ev) => (
                    <tr key={ev.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 font-semibold text-gray-900">
                        {ev.title}
                      </td>
                      <td className="py-3 text-gray-500 whitespace-nowrap">
                        {ev.date} • {ev.time}
                      </td>
                      <td className="py-3 text-gray-500 whitespace-nowrap">
                        {ev.location}
                      </td>
                      <td className="py-3 text-right font-medium text-gray-900 font-mono">
                        {ev.attendees}
                      </td>
                      <td className="py-3 text-center">
                        <StatusBadge status={ev.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Members Roster Preview */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Recent Member Inductions</h3>
                <p className="text-xs text-gray-500">Latest students accepted into the club registry</p>
              </div>
              <Link
                href="/students"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View all members
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {club.recentMembers.map((mem) => (
                <div key={mem.id} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={mem.name} src={mem.avatar} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{mem.name}</p>
                      <p className="text-[10px] text-gray-400">{mem.email}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-medium text-gray-700">{mem.department}</p>
                    <p className="text-[10px] text-gray-400">{mem.year} • Joined {mem.joinedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Timeline Activity Feed & Quick Details */}
        <div className="lg:col-span-1 space-y-6">
          <ActivityFeed
            activities={club.recentActivities.length > 0 ? club.recentActivities : [
              {
                id: 'act-sample-1',
                title: 'Semester Charter Renewed',
                description: 'Faculty advisory board validated charter',
                timestamp: '3 days ago',
                type: 'club',
              },
              {
                id: 'act-sample-2',
                title: 'Event Proposal Submitted',
                description: 'Applied for auditorium booking',
                timestamp: '1 week ago',
                type: 'event',
              },
            ]}
            title="Club Audit Trail"
          />

          {/* Room & Resource Info Card */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Facilities & Resources
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Allocated Space</span>
                <span className="font-medium text-gray-900">Lab 3 (CS Block)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Weekly Hours</span>
                <span className="font-medium text-gray-900">12 Hours / Week</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Inventory Status</span>
                <span className="font-medium text-emerald-600">Checked & Verified</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-gray-500">Faculty Advisor</span>
                <span className="font-medium text-gray-900">Prof. A. K. Sundaram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
