'use client';

import React, { useState, useMemo } from 'react';
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
  AlertCircle,
  Download,
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
import { mockClubs, Club } from '@/lib/mockData';

export const ClubsListView: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter logic
  const filteredClubs = useMemo(() => {
    return mockClubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.president.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || club.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'all' || club.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

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

  // Stat calculations
  const totalCount = mockClubs.length;
  const activeCount = mockClubs.filter((c) => c.status === 'Active').length;
  const pendingCount = mockClubs.filter((c) => c.status === 'Pending').length;
  const inactiveCount = mockClubs.filter((c) => c.status === 'Inactive' || c.status === 'Suspended').length;

  const columns: Column<Club>[] = [
    {
      header: 'Club',
      render: (club) => (
        <div className="flex items-center gap-3 py-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg shadow-2xs ring-1 ring-gray-200/60">
            {club.logo}
          </div>
          <div>
            <Link
              href={`/clubs/${club.id}`}
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
        <Link
          href={`/presidents/${club.president.id}`}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Avatar
            name={club.president.name}
            src={club.president.avatar}
            size="xs"
          />
          <span className="text-xs font-medium text-gray-900">
            {club.president.name}
          </span>
        </Link>
      ),
    },
    {
      header: 'Members',
      align: 'right',
      render: (club) => (
        <span className="font-semibold text-gray-900 font-mono text-xs">
          {club.membersCount}
        </span>
      ),
    },
    {
      header: 'Events',
      align: 'right',
      render: (club) => (
        <span className="font-medium text-gray-700 font-mono text-xs">
          {club.eventsCount}
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      render: (club) => <StatusBadge status={club.status} size="sm" />,
    },
    {
      header: 'Created',
      render: (club) => (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {club.createdDate}
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
                className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            }
            items={[
              {
                label: 'View Club Dossier',
                icon: <ExternalLink className="h-3.5 w-3.5" />,
                onClick: () => router.push(`/clubs/${club.id}`),
              },
              {
                label: 'Edit Charter',
                icon: <Edit className="h-3.5 w-3.5" />,
                onClick: () => {},
              },
              {
                label: 'Suspend Club Status',
                icon: <AlertCircle className="h-3.5 w-3.5" />,
                variant: 'danger',
                onClick: () => {},
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
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-gray-400" />
            <span className="hidden sm:inline">Export Roster</span>
          </button>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Club</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Clubs"
          value={totalCount}
          supportingText="Chartered on campus"
          icon={<ShieldCheck className="h-4 w-4 text-blue-600" />}
        />
        <StatCard
          title="Active Clubs"
          value={activeCount}
          supportingText="Approved & in session"
          icon={<Sparkles className="h-4 w-4 text-emerald-600" />}
        />
        <StatCard
          title="Pending Approval"
          value={pendingCount}
          supportingText="Awaiting charter sign-off"
          icon={<Clock className="h-4 w-4 text-amber-600" />}
        />
        <StatCard
          title="Inactive / Suspended"
          value={inactiveCount}
          supportingText="Dormant organizations"
          icon={<Ban className="h-4 w-4 text-rose-600" />}
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          placeholder="Search clubs by name, president, category..."
          className="w-full sm:w-80"
        />

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
              { label: 'Cultural', value: 'Cultural' },
              { label: 'Engineering', value: 'Engineering' },
              { label: 'Sports', value: 'Sports' },
              { label: 'Creative', value: 'Creative' },
              { label: 'Literary', value: 'Literary' },
              { label: 'Entrepreneurship', value: 'Entrepreneurship' },
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
              className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Clubs Data Table */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedClubs}
          keyExtractor={(club) => club.id}
          onRowClick={(club) => router.push(`/clubs/${club.id}`)}
          emptyState={
            <EmptyState
              title="No clubs found"
              description="No student clubs match your current search and filter criteria."
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
    </div>
  );
};
