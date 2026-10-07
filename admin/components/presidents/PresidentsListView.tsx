'use client';

import React, { useState, useMemo } from 'react';
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
import { mockPresidents, President } from '@/lib/mockData';

export const PresidentsListView: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter logic
  const filteredPresidents = useMemo(() => {
    return mockPresidents.filter((pres) => {
      const matchesSearch =
        pres.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pres.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pres.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pres.studentId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        pres.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

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

  const totalCount = 46;
  const activeCount = 41;
  const pendingCount = 3;
  const suspendedCount = 2;

  const columns: Column<President>[] = [
    {
      header: 'President',
      render: (pres) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar name={pres.name} src={pres.avatar} size="sm" />
          <div>
            <Link
              href={`/presidents/${pres.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {pres.name}
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">
              {pres.studentId} • {pres.year}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Club',
      render: (pres) => (
        <Link
          href={`/clubs/${pres.clubId}`}
          className="font-medium text-gray-800 hover:text-blue-600 transition-colors text-xs"
        >
          {pres.clubName}
        </Link>
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
          {pres.clubMembers}
        </span>
      ),
    },
    {
      header: 'Events',
      align: 'right',
      render: (pres) => (
        <span className="font-medium text-gray-700 font-mono text-xs">
          {pres.eventsCreated}
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      render: (pres) => <StatusBadge status={pres.status} size="sm" />,
    },
    {
      header: 'Joined',
      render: (pres) => (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {pres.joinedDate}
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
                className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            }
            items={[
              {
                label: 'View Dossier',
                icon: <ExternalLink className="h-3.5 w-3.5" />,
                onClick: () => router.push(`/presidents/${pres.id}`),
              },
              {
                label: 'Configure Permissions',
                icon: <Shield className="h-3.5 w-3.5" />,
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
            Club Presidents
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage club executive leadership, credentials, and governance authorizations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-gray-400" />
            <span className="hidden sm:inline">Export Leadership Registry</span>
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
          supportingText="Election validation required"
          icon={<Clock className="h-4 w-4 text-amber-600" />}
        />
        <StatCard
          title="Suspended"
          value={suspendedCount}
          supportingText="Access revoked"
          icon={<ShieldAlert className="h-4 w-4 text-rose-600" />}
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          placeholder="Search by name, student ID, club..."
          className="w-full sm:w-80"
        />

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
              className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedPresidents}
          keyExtractor={(pres) => pres.id}
          onRowClick={(pres) => router.push(`/presidents/${pres.id}`)}
          emptyState={
            <EmptyState
              title="No presidents found"
              description="No club presidents match your current search or status filter."
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
    </div>
  );
};
