'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Sparkles,
  Clock,
  Ban,
  Plus,
  MoreVertical,
  ExternalLink,
  Edit,
  Trash2,
  AlertCircle,
  Download,
  X,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchInput } from '@/components/ui/SearchInput';
import { FilterButton } from '@/components/ui/FilterButton';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { api } from '@/lib/api';
import { mockClubs, Club } from '@/lib/mockData';

export const ClubsListView: React.FC = () => {
  const router = useRouter();
  const [clubs, setClubs] = useState<any[]>([]);
  const [presidents, setPresidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical',
    description: '',
    logo: '💻',
    presidentId: '',
    objectives: '',
    activities: '',
    meetingSchedule: 'Wednesdays at 5:00 PM',
    maxMembers: '500',
    status: 'Active',
  });

  const fetchClubsAndPresidents = async () => {
    try {
      setLoading(true);
      const [clubsRes, presRes] = await Promise.all([
        api.clubs.getAll(),
        api.presidents.getAll().catch(() => ({ success: false, presidents: [] })),
      ]);

      if (clubsRes.success && Array.isArray(clubsRes.clubs)) {
        setClubs(clubsRes.clubs);
      }
      if (presRes.success && Array.isArray(presRes.presidents)) {
        setPresidents(presRes.presidents);
      }
    } catch (err) {
      console.warn('Backend fetch failed, using fallback mock clubs:', err);
      setClubs(mockClubs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubsAndPresidents();
  }, []);

  // Filter logic
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const presName = club.president?.name || '';
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        presName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || club.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'all' || club.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [clubs, searchQuery, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);
  const paginatedClubs = filteredClubs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'Technical',
      description: '',
      logo: '💻',
      presidentId: presidents[0]?.id || presidents[0]?._id || '',
      objectives: '',
      activities: '',
      meetingSchedule: 'Wednesdays at 5:00 PM',
      maxMembers: '500',
      status: 'Active',
    });
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (club: any) => {
    setSelectedClub(club);
    setFormData({
      name: club.name,
      category: club.category || 'Technical',
      description: club.description || '',
      logo: club.logo || '💻',
      presidentId: club.president?._id || club.president?.id || '',
      objectives: club.objectives || '',
      activities: club.activities || '',
      meetingSchedule: club.meetingSchedule || 'Wednesdays at 5:00 PM',
      maxMembers: club.maxMembers ? String(club.maxMembers) : '500',
      status: club.status || 'Active',
    });
    setFormError(null);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (club: any) => {
    setSelectedClub(club);
    setFormError(null);
    setIsDeleteModalOpen(true);
  };

  const handleCreateClub = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError(null);

    try {
      await api.clubs.create({
        ...formData,
        maxMembers: Number(formData.maxMembers),
      });
      setIsAddModalOpen(false);
      fetchClubsAndPresidents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to create club.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateClub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClub) return;
    setActionLoading(true);
    setFormError(null);

    try {
      await api.clubs.update(selectedClub.id || selectedClub._id, {
        ...formData,
        maxMembers: Number(formData.maxMembers),
      });
      setIsEditModalOpen(false);
      fetchClubsAndPresidents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to update club.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClub = async () => {
    if (!selectedClub) return;
    setActionLoading(true);

    try {
      await api.clubs.delete(selectedClub.id || selectedClub._id);
      setIsDeleteModalOpen(false);
      fetchClubsAndPresidents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to delete club.');
    } finally {
      setActionLoading(false);
    }
  };

  const totalCount = clubs.length;
  const activeCount = clubs.filter((c) => c.status === 'Active').length;
  const pendingCount = clubs.filter((c) => c.status === 'Pending').length;
  const inactiveCount = clubs.filter((c) => c.status === 'Inactive' || c.status === 'Suspended').length;

  const columns: Column<any>[] = [
    {
      header: 'Club',
      render: (club) => (
        <div className="flex items-center gap-3 py-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg shadow-2xs ring-1 ring-gray-200/60">
            {club.logo || '💻'}
          </div>
          <div>
            <Link
              href={`/clubs/${club.id || club._id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {club.name}
            </Link>
            <p className="line-clamp-1 max-w-xs text-xs text-gray-400">
              {club.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      render: (club) => (
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {club.category}
        </span>
      ),
    },
    {
      header: 'President',
      render: (club) => (
        club.president ? (
          <Link
            href={`/presidents/${club.president.id || club.president._id || ''}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Avatar
              name={club.president.name || 'President'}
              src={club.president.avatar}
              size="xs"
            />
            <span className="text-xs font-medium text-gray-900">
              {club.president.name}
            </span>
          </Link>
        ) : (
          <span className="text-xs text-gray-400">Unassigned</span>
        )
      ),
    },
    {
      header: 'Members',
      align: 'right',
      render: (club) => (
        <span className="font-semibold text-gray-900 font-mono text-xs">
          {club.membersCount || 1}
        </span>
      ),
    },
    {
      header: 'Events',
      align: 'right',
      render: (club) => (
        <span className="font-medium text-gray-700 font-mono text-xs">
          {club.eventsCount || 0}
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      render: (club) => <StatusBadge status={club.status || 'Active'} size="sm" />,
    },
    {
      header: 'Created',
      render: (club) => (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {club.createdAt ? new Date(club.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : (club.createdDate || 'Chartered')}
        </span>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (club) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            }
            items={[
              {
                label: 'View Club Dossier',
                icon: <ExternalLink className="h-3.5 w-3.5" />,
                onClick: () => router.push(`/clubs/${club.id || club._id}`),
              },
              {
                label: 'Edit Charter',
                icon: <Edit className="h-3.5 w-3.5" />,
                onClick: () => handleOpenEdit(club),
              },
              {
                label: 'Delete Club',
                icon: <Trash2 className="h-3.5 w-3.5 text-red-500" />,
                variant: 'danger',
                onClick: () => handleOpenDelete(club),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Clubs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage, verify charters, and monitor active student organizations across campus.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchClubsAndPresidents}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Club</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Clubs"
          value={totalCount}
          supportingText="Campus chartered"
          icon={<ShieldCheck className="h-4 w-4 text-blue-600" />}
        />
        <StatCard
          title="Active Charters"
          value={activeCount}
          supportingText="Operating normally"
          icon={<Sparkles className="h-4 w-4 text-emerald-600" />}
        />
        <StatCard
          title="Pending Approval"
          value={pendingCount}
          supportingText="Charter submissions"
          icon={<Clock className="h-4 w-4 text-amber-600" />}
        />
        <StatCard
          title="Inactive / Suspended"
          value={inactiveCount}
          supportingText="Requires review"
          icon={<Ban className="h-4 w-4 text-rose-600" />}
        />
      </div>

      {/* Search and Filters Bar */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-xs">
            <SearchInput
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search clubs, categories..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <FilterButton
              label="Category"
              selectedValue={categoryFilter}
              onChange={(val) => {
                setCategoryFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Categories', value: 'all' },
                { label: 'Technical', value: 'Technical' },
                { label: 'Engineering', value: 'Engineering' },
                { label: 'Creative', value: 'Creative' },
                { label: 'Cultural', value: 'Cultural' },
                { label: 'Entrepreneurship', value: 'Entrepreneurship' },
                { label: 'Sports', value: 'Sports' },
                { label: 'Social', value: 'Social' },
              ]}
            />

            <FilterButton
              label="Status"
              selectedValue={statusFilter}
              onChange={(val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Statuses', value: 'all' },
                { label: 'Active', value: 'Active' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Inactive', value: 'Inactive' },
                { label: 'Suspended', value: 'Suspended' },
              ]}
            />

            {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Clubs Data Table */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedClubs}
          keyExtractor={(club) => club.id || club._id}
          onRowClick={(club) => router.push(`/clubs/${club.id || club._id}`)}
          emptyState={
            <EmptyState
              title="No clubs found"
              description="No student clubs match your current search or category filter criteria."
              actionLabel="Clear Filters"
              onAction={resetFilters}
            />
          }
        />

        {filteredClubs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
            totalItems={filteredClubs.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {/* ADD CLUB MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Charter New Club</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateClub} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Club Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. CyberSecurity Guild"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Icon / Emoji</label>
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="💻"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm text-center focus:border-gray-900 outline-none text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  <label className="block font-semibold text-gray-700 mb-1">Assigned President</label>
                  <select
                    value={formData.presidentId}
                    onChange={(e) => setFormData({ ...formData, presidentId: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    {presidents.map((p) => (
                      <option key={p.id || p._id} value={p.id || p._id}>
                        {p.name} ({p.department || 'President'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Charter Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of club mission, goals, and target student cohort..."
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs focus:border-gray-900 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Meeting Schedule</label>
                  <input
                    type="text"
                    value={formData.meetingSchedule}
                    onChange={(e) => setFormData({ ...formData, meetingSchedule: e.target.value })}
                    placeholder="e.g. Thursdays at 5:00 PM"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-xs focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={formData.maxMembers}
                    onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-xs focus:border-gray-900 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-gray-900 px-5 py-2 font-semibold text-white hover:bg-black disabled:opacity-50"
                >
                  {actionLoading ? 'Chartering...' : 'Charter Club'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CLUB MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Edit Club Charter</h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleUpdateClub} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Club Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Icon / Emoji</label>
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm text-center focus:border-gray-900 outline-none text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">President</label>
                  <select
                    value={formData.presidentId}
                    onChange={(e) => setFormData({ ...formData, presidentId: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    {presidents.map((p) => (
                      <option key={p.id || p._id} value={p.id || p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs focus:border-gray-900 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-xl bg-gray-900 px-5 py-2 font-semibold text-white hover:bg-black disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && selectedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-900">Delete Club Charter?</h3>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Are you sure you want to permanently dissolve <strong>{selectedClub.name}</strong>? This will remove all associated member roster records and pending join requests.
            </p>

            {formError && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                {formError}
              </div>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteClub}
                disabled={actionLoading}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Delete Club'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
