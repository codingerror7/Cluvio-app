'use client';

import React, { useState, useEffect } from 'react';
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
  Trash2,
  ExternalLink,
  Loader2,
  X,
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { api } from '@/lib/api';
import { mockClubs, Club } from '@/lib/mockData';

interface ClubDetailViewProps {
  clubId: string;
}

export const ClubDetailView: React.FC<ClubDetailViewProps> = ({ clubId }) => {
  const [club, setClub] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);

  // Edit Charter Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    category: 'Technical',
    meetingSchedule: '',
    status: 'Active',
  });
  const [saving, setSaving] = useState(false);

  const fetchClub = async () => {
    try {
      setLoading(true);
      const res = await api.clubs.getById(clubId);
      if (res.success && res.club) {
        setClub(res.club);
        return;
      }
    } catch (err) {
      console.warn('Backend fetch failed, using fallback mock club:', err);
    } finally {
      setLoading(false);
    }

    const fallback = mockClubs.find((c) => c.id === clubId) || mockClubs[0];
    setClub(fallback);
  };

  useEffect(() => {
    fetchClub();
  }, [clubId]);

  const handleOpenEdit = () => {
    if (!club) return;
    setEditForm({
      name: club.name || '',
      description: club.description || '',
      category: club.category || 'Technical',
      meetingSchedule: club.meetingSchedule || 'Wednesdays at 5:00 PM',
      status: club.status || 'Active',
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.clubs.update(club.id || club._id, editForm);
      setIsEditOpen(false);
      fetchClub();
    } catch (err) {
      console.error('Failed to update charter:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveMember = async (studentId: string) => {
    if (!confirm('Are you sure you want to remove this member from the club?')) return;
    setRemovingMemberId(studentId);
    try {
      await api.clubs.removeMember(club.id || club._id, studentId);
      fetchClub();
    } catch (err) {
      console.error('Failed to remove member:', err);
    } finally {
      setRemovingMemberId(null);
    }
  };

  if (loading && !club) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const currentClub = club || mockClubs[0];
  const membersList = currentClub.recentMembers || [];
  const eventsList = currentClub.recentEvents || [];
  const leadershipList = currentClub.leadership || [
    {
      name: currentClub.president?.name || 'Club President',
      role: 'President',
      email: currentClub.president?.email || '',
      avatar: currentClub.president?.avatar || '',
    },
  ];

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
            onClick={handleOpenEdit}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors cursor-pointer"
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
              {currentClub.logo || '💻'}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {currentClub.name}
                </h1>
                <StatusBadge status={currentClub.status || 'Active'} size="md" />
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {currentClub.category}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500 max-w-2xl leading-relaxed">
                {currentClub.description}
              </p>

              {/* Meta details */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span>
                    Chartered on {currentClub.createdAt ? new Date(currentClub.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : (currentClub.createdDate || '12 Sep 2024')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span>{currentClub.meetingSchedule || 'Weekly campus meetups'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Club President Card */}
          {currentClub.president && (
            <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-xs shrink-0 sm:max-w-xs w-full">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                Club President
              </p>
              <div className="flex items-center gap-3">
                <Avatar
                  name={currentClub.president.name || 'President'}
                  src={currentClub.president.avatar}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {currentClub.president.name}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {currentClub.president.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Members Enrolled"
          value={currentClub.membersCount || membersList.length || 1}
          supportingText="Active student roster"
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Events Hosted"
          value={currentClub.eventsCount || eventsList.length || 0}
          supportingText="Campus workshops & events"
          icon={<Calendar className="h-5 w-5 text-indigo-600" />}
        />
        <StatCard
          title="Budget Allocation"
          value={`₹${((currentClub.budgetAllocated || 30000) / 1000).toFixed(0)}k`}
          supportingText="Grant allocation"
          icon={<Wallet className="h-5 w-5 text-emerald-600" />}
        />
        <StatCard
          title="Engagement Rate"
          value={`${currentClub.engagementRate || 88}%`}
          trend="+6.4%"
          trendType="positive"
          supportingText="Campus average: 76%"
          icon={<Activity className="h-5 w-5 text-amber-600" />}
        />
      </div>

      {/* Main Content: Leadership & Members */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Members & Leadership */}
        <div className="lg:col-span-2 space-y-6">
          {/* Members Roster */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Registered Club Members</h3>
                <p className="text-xs text-gray-500">Students officially inducted into this club</p>
              </div>
              <span className="text-xs font-medium text-gray-400 font-mono">
                {membersList.length} members
              </span>
            </div>

            {membersList.length === 0 ? (
              <p className="py-6 text-center text-xs text-gray-400">No student members enrolled yet.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {membersList.map((mem: any, idx: number) => (
                  <div key={mem.id || idx} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={mem.name} src={mem.avatar} size="sm" />
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{mem.name}</p>
                        <p className="text-[10px] text-gray-400">{mem.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="text-right">
                        <p className="font-medium text-gray-700">{mem.department || 'Computer Science'}</p>
                        <p className="text-[10px] text-gray-400">{mem.year || '1st Year'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(mem.id)}
                        disabled={removingMemberId === mem.id}
                        title="Remove member from club"
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leadership Roster */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Executive Leadership</h3>
            <p className="text-xs text-gray-500 mb-4">Official club committee elected for Academic Year 2026</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {leadershipList.map((leader: any, i: number) => (
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
                      {leader.role || 'Executive Member'}
                    </p>
                    <p className="truncate text-[10px] text-gray-400">
                      {leader.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Timeline & Resources */}
        <div className="lg:col-span-1 space-y-6">
          <ActivityFeed
            activities={currentClub.recentActivities || []}
            title="Club Audit Trail"
          />

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
            </div>
          </div>
        </div>
      </div>

      {/* EDIT CHARTER MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Edit Charter Details</h3>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Club Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Creative">Creative</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Sports">Sports</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Charter Description</label>
                <textarea
                  required
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs focus:border-gray-900 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Meeting Schedule</label>
                <input
                  type="text"
                  value={editForm.meetingSchedule}
                  onChange={(e) => setEditForm({ ...editForm, meetingSchedule: e.target.value })}
                  className="h-10 w-full rounded-xl border border-gray-200 px-3 text-xs focus:border-gray-900 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gray-900 px-5 py-2 font-semibold text-white hover:bg-black disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Charter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
