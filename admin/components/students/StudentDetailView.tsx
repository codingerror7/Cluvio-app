'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Award,
  ExternalLink,
  Download,
  AlertCircle,
  Clock,
  Shield,
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { mockStudents, Student } from '@/lib/mockData';

interface StudentDetailViewProps {
  studentId: string;
}

export const StudentDetailView: React.FC<StudentDetailViewProps> = ({
  studentId,
}) => {
  const student: Student =
    mockStudents.find((s) => s.id === studentId) || mockStudents[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Nav */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all students</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-gray-400" />
            <span>Extracurricular Certificate</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Update Student Status</span>
          </button>
        </div>
      </div>

      {/* Header Profile Banner */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar
              name={student.name}
              src={student.avatar}
              size="xl"
              status="online"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {student.name}
                </h1>
                <StatusBadge status={student.status} size="md" />
              </div>

              <p className="mt-1 text-sm text-gray-500 font-mono">
                Student ID: <span className="font-semibold text-gray-800">{student.studentId}</span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span className="font-medium text-gray-700">{student.department}</span>
                <span>•</span>
                <span>{student.year}</span>
                <span>•</span>
                <span className="font-mono">{student.email}</span>
                <span>•</span>
                <span>Joined {student.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50/70 p-3.5 text-xs text-gray-600 shrink-0">
            <p className="font-semibold text-gray-900">Campus Standing</p>
            <p className="mt-0.5 text-gray-400">Full Academic Good Standing</p>
            <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              Verified Matriculation
            </span>
          </div>
        </div>
      </div>

      {/* Participation Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Clubs Joined"
          value={student.clubsJoined}
          supportingText="Active memberships"
          icon={<GraduationCap className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Events Attended"
          value={student.eventsJoined}
          supportingText="Verified check-ins"
          icon={<Calendar className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Participation Rate"
          value={student.participationRate}
          trend="+4.2%"
          trendType="positive"
          supportingText="Above average (80%)"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        />
        <StatCard
          title="Merit Badges"
          value="4"
          supportingText="Hackathons & workshops"
          icon={<Award className="h-5 w-5 text-amber-600" />}
        />
      </div>

      {/* Main Grid: Joined Clubs, Event Log, Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Clubs & Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Clubs Affiliations */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Active Club Affiliations</h3>
                <p className="text-xs text-gray-500">Student memberships and committee appointments</p>
              </div>
              <span className="text-xs font-medium text-gray-400 font-mono">
                {student.clubs.length} clubs
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {student.clubs.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link
                      href={`/clubs/${c.clubId}`}
                      className="text-xs font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {c.clubName}
                    </Link>
                    <p className="text-[11px] text-gray-400">Enrolled on {c.joinedDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                        c.role === 'Core Team'
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {c.role}
                    </span>
                    <Link
                      href={`/clubs/${c.clubId}`}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Participation History */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Extracurricular Event Log</h3>
                <p className="text-xs text-gray-500">Official attendance telemetry captured via QR scans</p>
              </div>
              <span className="text-xs font-medium text-gray-400 font-mono">
                {student.events.length} logs
              </span>
            </div>

            {student.events.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      <th className="py-2.5 font-medium">Event</th>
                      <th className="py-2.5 font-medium">Organizing Club</th>
                      <th className="py-2.5 font-medium">Date</th>
                      <th className="py-2.5 font-medium text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {student.events.map((ev) => (
                      <tr key={ev.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 font-semibold text-gray-900">
                          {ev.title}
                        </td>
                        <td className="py-3 text-gray-600">
                          {ev.clubName}
                        </td>
                        <td className="py-3 text-gray-400 whitespace-nowrap">
                          {ev.date}
                        </td>
                        <td className="py-3 text-center">
                          <StatusBadge status={ev.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-6 text-center text-xs text-gray-400">
                No past event attendance records found for this student.
              </p>
            )}
          </div>
        </div>

        {/* Right Col: Student Activity Log */}
        <div className="lg:col-span-1 space-y-6">
          <ActivityFeed
            activities={
              student.activity.length > 0
                ? student.activity
                : [
                    {
                      id: 'sa-def-1',
                      title: 'Joined Coding Club Workshop',
                      description: 'Checked in via mobile QR code',
                      timestamp: '2 days ago',
                      type: 'student',
                    },
                    {
                      id: 'sa-def-2',
                      title: 'Certificate Awarded',
                      description: 'Completed 24h HackSprint event',
                      timestamp: '1 week ago',
                      type: 'alert',
                    },
                  ]
            }
            title="Student Action Feed"
          />

          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Co-Curricular Credits
            </h4>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-gray-500">Credits Earned</span>
              <span className="font-bold text-gray-900 font-mono text-sm">4.5 / 6.0 Credits</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-blue-600" style={{ width: '75%' }} />
            </div>
            <p className="text-[11px] text-gray-400">75% of degree extracurricular requirement completed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
