'use client';

import React, { useState, useEffect } from 'react';
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
  Loader2,
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { api } from '@/lib/api';
import { mockStudents, Student } from '@/lib/mockData';

interface StudentDetailViewProps {
  studentId: string;
}

export const StudentDetailView: React.FC<StudentDetailViewProps> = ({
  studentId,
}) => {
  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await api.students.getById(studentId);
        if (res.success && res.student) {
          setStudent(res.student);
          return;
        }
      } catch (err) {
        console.warn('Backend fetch failed, using fallback mock:', err);
      } finally {
        setLoading(false);
      }

      // Fallback
      const fallback = mockStudents.find((s) => s.id === studentId) || mockStudents[0];
      setStudent(fallback);
    };

    fetchStudent();
  }, [studentId]);

  if (loading && !student) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const currentStudent = student || mockStudents[0];
  const clubsList = currentStudent.clubs || [];
  const requestsList = currentStudent.requests || [];

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
            <span>Extracurricular Record</span>
          </button>
        </div>
      </div>

      {/* Header Profile Banner */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar
              name={currentStudent.name}
              src={currentStudent.avatar}
              size="xl"
              status="online"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {currentStudent.name}
                </h1>
                <StatusBadge status={currentStudent.status || 'Active'} size="md" />
              </div>

              <p className="mt-1 text-sm text-gray-500 font-mono">
                Student ID: <span className="font-semibold text-gray-800">{currentStudent.studentId || currentStudent.enrollmentNumber}</span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span className="font-medium text-gray-700">{currentStudent.department}</span>
                <span>•</span>
                <span>{currentStudent.year}</span>
                <span>•</span>
                <span className="font-mono">{currentStudent.email}</span>
                <span>•</span>
                <span>Joined {currentStudent.joinedDate}</span>
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
          value={currentStudent.clubsJoined || clubsList.length}
          supportingText="Active memberships"
          icon={<GraduationCap className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Events Attended"
          value={currentStudent.eventsJoined || 3}
          supportingText="Verified check-ins"
          icon={<Calendar className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Participation Rate"
          value={currentStudent.participationRate || '85%'}
          trend="+4.2%"
          trendType="positive"
          supportingText="Active engagement"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        />
        <StatCard
          title="Pending Requests"
          value={requestsList.length}
          supportingText="Club applications"
          icon={<Award className="h-5 w-5 text-amber-600" />}
        />
      </div>

      {/* Main Grid: Joined Clubs & Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Clubs & Membership Requests */}
        <div className="lg:col-span-2 space-y-6">
          {/* Clubs Affiliations */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Active Club Affiliations</h3>
                <p className="text-xs text-gray-500">Student memberships and committee appointments</p>
              </div>
              <span className="text-xs font-medium text-gray-400 font-mono">
                {clubsList.length} {clubsList.length === 1 ? 'club' : 'clubs'}
              </span>
            </div>

            {clubsList.length === 0 ? (
              <p className="py-6 text-center text-xs text-gray-400">This student has not joined any clubs yet.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {clubsList.map((c: any, idx: number) => (
                  <div key={c.id || idx} className="flex items-center justify-between py-3">
                    <div>
                      <Link
                        href={`/clubs/${c.clubId || c.id}`}
                        className="text-xs font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {c.clubName}
                      </Link>
                      <p className="text-[11px] text-gray-400">Enrolled on {c.joinedDate || 'Recently'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                          c.role === 'Core Team'
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {c.role || 'Member'}
                      </span>
                      <Link
                        href={`/clubs/${c.clubId || c.id}`}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Membership Requests */}
          {requestsList.length > 0 && (
            <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Membership Application History</h3>
                  <p className="text-xs text-gray-500">Club membership requests submitted by student</p>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {requestsList.map((r: any, idx: number) => (
                  <div key={r.id || idx} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{r.clubName}</p>
                      <p className="text-[11px] text-gray-400">{r.category}</p>
                    </div>
                    <StatusBadge status={r.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Student Bio & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Student Profile Information</h3>
            
            {currentStudent.bio && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Biography</p>
                <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {currentStudent.bio}
                </p>
              </div>
            )}

            {currentStudent.favouriteGenres && currentStudent.favouriteGenres.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">Areas of Interest</p>
                <div className="flex flex-wrap gap-1.5">
                  {currentStudent.favouriteGenres.map((genre: string) => (
                    <span
                      key={genre}
                      className="rounded-lg bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 text-xs space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Age:</span>
                <span className="font-medium text-gray-800">{currentStudent.age || 20} years</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Enrollment Status:</span>
                <span className="font-medium text-emerald-600">Active Matriculated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
