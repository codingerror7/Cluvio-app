'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users2,
  CheckCircle,
  Clock,
  ShieldAlert,
  Search,
  MoreVertical,
  ExternalLink,
  Shield,
  Trash2,
  Edit2,
  Download,
  Plus,
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
import { mockPresidents, President } from '@/lib/mockData';

export const PresidentsListView: React.FC = () => {
  const router = useRouter();
  const [presidents, setPresidents] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPresident, setSelectedPresident] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    enrollmentNumber: '',
    department: 'Computer Science',
    year: '3rd Year',
    status: 'Active',
    clubId: '',
  });

  const fetchPresidentsAndClubs = async () => {
    try {
      setLoading(true);
      const [presRes, clubsRes] = await Promise.all([
        api.presidents.getAll(),
        api.clubs.getAll().catch(() => ({ success: false, clubs: [] })),
      ]);

      if (presRes.success && Array.isArray(presRes.presidents)) {
        setPresidents(presRes.presidents);
      }
      if (clubsRes.success && Array.isArray(clubsRes.clubs)) {
        setClubs(clubsRes.clubs);
      }
    } catch (err) {
      console.warn('Backend fetch failed, using fallback mock presidents:', err);
      setPresidents(mockPresidents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresidentsAndClubs();
  }, []);

  // Filter logic
  const filteredPresidents = useMemo(() => {
    return presidents.filter((pres) => {
      const matchesSearch =
        pres.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pres.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pres.clubName && pres.clubName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (pres.studentId && pres.studentId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all' ||
        pres.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [presidents, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredPresidents.length / itemsPerPage);
  const paginatedPresidents = filteredPresidents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      password: 'President@123',
      enrollmentNumber: 'PRES-' + Date.now().toString().slice(-4),
      department: 'Computer Science',
      year: '3rd Year',
      status: 'Active',
      clubId: clubs[0]?.id || clubs[0]?._id || '',
    });
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (pres: any) => {
    setSelectedPresident(pres);
    setFormData({
      name: pres.name,
      email: pres.email,
      password: '',
      enrollmentNumber: pres.enrollmentNumber || pres.studentId || '',
      department: pres.department || 'Computer Science',
      year: pres.year || '3rd Year',
      status: pres.status || 'Active',
      clubId: pres.clubId || '',
    });
    setFormError(null);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (pres: any) => {
    setSelectedPresident(pres);
    setFormError(null);
    setIsDeleteModalOpen(true);
  };

  const handleCreatePresident = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError(null);

    try {
      await api.presidents.create(formData);
      setIsAddModalOpen(false);
      fetchPresidentsAndClubs();
    } catch (err: any) {
      setFormError(err.message || 'Failed to create president record.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePresident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPresident) return;
    setActionLoading(true);
    setFormError(null);

    try {
      await api.presidents.update(selectedPresident.id || selectedPresident._id, formData);
      setIsEditModalOpen(false);
      fetchPresidentsAndClubs();
    } catch (err: any) {
      setFormError(err.message || 'Failed to update president.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePresident = async () => {
    if (!selectedPresident) return;
    setActionLoading(true);

    try {
      await api.presidents.delete(selectedPresident.id || selectedPresident._id);
      setIsDeleteModalOpen(false);
      fetchPresidentsAndClubs();
    } catch (err: any) {
      setFormError(err.message || 'Failed to remove president.');
    } finally {
      setActionLoading(false);
    }
  };

  const totalCount = presidents.length;
  const activeCount = presidents.filter((p) => p.status === 'Active').length;
  const pendingCount = presidents.filter((p) => p.status === 'Pending').length;
  const suspendedCount = presidents.filter((p) => p.status === 'Suspended').length;

  const columns: Column<any>[] = [
    {
      header: 'President',
      render: (pres) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar name={pres.name} src={pres.avatar} size="sm" />
          <div>
            <Link
              href={`/presidents/${pres.id || pres._id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {pres.name}
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">
              {pres.studentId || pres.enrollmentNumber} • {pres.year}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Club',
      render: (pres) => (
        pres.clubId ? (
          <Link
            href={`/clubs/${pres.clubId}`}
            className="font-medium text-gray-800 hover:text-blue-600 transition-colors text-xs"
          >
            {pres.clubName}
          </Link>
        ) : (
          <span className="text-xs text-gray-400 font-medium">Unassigned</span>
        )
      ),
    },
    {
      header: 'Email Address',
      render: (pres) => (
        <span className="text-xs text-gray-500 font-mono">{pres.email}</span>
      ),
    },
    {
      header: 'Members',
      align: 'right',
      render: (pres) => (
        <span className="font-semibold text-gray-900 font-mono text-xs">
          {pres.clubMembers || 1}
        </span>
      ),
    },
    {
      header: 'Events',
      align: 'right',
      render: (pres) => (
        <span className="font-medium text-gray-700 font-mono text-xs">
          {pres.eventsCreated || 0}
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      render: (pres) => <StatusBadge status={pres.status || 'Active'} size="sm" />,
    },
    {
      header: 'Joined',
      render: (pres) => (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {pres.joinedDate || 'Recently'}
        </span>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (pres) => (
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
                label: 'View Dossier',
                icon: <ExternalLink className="h-3.5 w-3.5" />,
                onClick: () => router.push(`/presidents/${pres.id || pres._id}`),
              },
              {
                label: 'Edit Profile & Assignment',
                icon: <Edit2 className="h-3.5 w-3.5" />,
                onClick: () => handleOpenEdit(pres),
              },
              {
                label: 'Remove President',
                icon: <Trash2 className="h-3.5 w-3.5 text-red-500" />,
                variant: 'danger',
                onClick: () => handleOpenDelete(pres),
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
            Club Presidents
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage club executive leadership, credentials, and governance authorizations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchPresidentsAndClubs}
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
            <span>Add President</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Presidents"
          value={totalCount}
          supportingText="Assigned leadership"
          icon={<Users2 className="h-4 w-4 text-blue-600" />}
        />
        <StatCard
          title="Active Credentials"
          value={activeCount}
          supportingText="Approved platform access"
          icon={<CheckCircle className="h-4 w-4 text-emerald-600" />}
        />
        <StatCard
          title="Pending Approval"
          value={pendingCount}
          supportingText="Charter submissions"
          icon={<Clock className="h-4 w-4 text-amber-600" />}
        />
        <StatCard
          title="Suspended"
          value={suspendedCount}
          supportingText="Access revoked"
          icon={<ShieldAlert className="h-4 w-4 text-rose-600" />}
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
              placeholder="Search by name, email, club, or ID..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
                { label: 'Suspended', value: 'Suspended' },
              ]}
            />

            {(searchQuery || statusFilter !== 'all') && (
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

      {/* Presidents Data Table */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedPresidents}
          keyExtractor={(pres) => pres.id || pres._id}
          onRowClick={(pres) => router.push(`/presidents/${pres.id || pres._id}`)}
          emptyState={
            <EmptyState
              title="No presidents found"
              description="No president profiles match your search criteria or filter combination."
              actionLabel="Clear Filters"
              onAction={resetFilters}
            />
          }
        />

        {filteredPresidents.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
            totalItems={filteredPresidents.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {/* ADD PRESIDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Appoint Club President</h3>
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

            <form onSubmit={handleCreatePresident} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Seth"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">President ID</label>
                  <input
                    type="text"
                    required
                    value={formData.enrollmentNumber}
                    onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="president@campus.edu"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Temporary Password</label>
                  <input
                    type="text"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Communication">Electronics & Comm.</option>
                    <option value="Mechanical Engineering">Mechanical Eng.</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Design & Visual Arts">Design & Visual Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Academic Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Assign to Club</label>
                  <select
                    value={formData.clubId}
                    onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="">None (Unassigned)</option>
                    {clubs.map((c) => (
                      <option key={c.id || c._id} value={c.id || c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
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
                  {actionLoading ? 'Appointing...' : 'Appoint President'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRESIDENT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Edit President Record</h3>
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

            <form onSubmit={handleUpdatePresident} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">President ID</label>
                  <input
                    type="text"
                    required
                    value={formData.enrollmentNumber}
                    onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
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
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Communication">Electronics & Comm.</option>
                    <option value="Mechanical Engineering">Mechanical Eng.</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Design & Visual Arts">Design & Visual Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Assigned Club</label>
                  <select
                    value={formData.clubId}
                    onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="">None (Unassigned)</option>
                    {clubs.map((c) => (
                      <option key={c.id || c._id} value={c.id || c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
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
      {isDeleteModalOpen && selectedPresident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-900">Remove Club President?</h3>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Are you sure you want to remove <strong>{selectedPresident.name}</strong>? Any clubs chartered under their stewardship will be preserved and temporarily reassigned to the administrator account so they are not orphaned.
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
                onClick={handleDeletePresident}
                disabled={actionLoading}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? 'Removing...' : 'Confirm Removal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
