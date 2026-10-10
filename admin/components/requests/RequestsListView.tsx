'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  RefreshCw,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchInput } from '@/components/ui/SearchInput';
import { FilterButton } from '@/components/ui/FilterButton';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { api } from '@/lib/api';

export const RequestsListView: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const itemsPerPage = 7;

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.requests.getAll(statusFilter);
      if (res.success && Array.isArray(res.requests)) {
        setRequests(res.requests);
      }
    } catch (err) {
      console.warn('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const handleReview = async (id: string, action: 'Approved' | 'Rejected') => {
    try {
      setActionLoadingId(id);
      await api.requests.review(id, action);
      await fetchRequests();
    } catch (err) {
      console.error('Failed to review request:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const studentName = r.student?.name || '';
      const studentEmail = r.student?.email || '';
      const clubName = r.club?.name || '';
      const matchesSearch =
        studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clubName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [requests, searchQuery]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const approvedCount = requests.filter((r) => r.status === 'Approved').length;
  const rejectedCount = requests.filter((r) => r.status === 'Rejected').length;

  const columns: Column<any>[] = [
    {
      header: 'Applicant Student',
      render: (r) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar name={r.student?.name || 'Student'} src={r.student?.avatar} size="sm" />
          <div>
            <Link
              href={`/students/${r.student?._id || r.student?.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {r.student?.name || 'Student'}
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">
              {r.student?.studentId || r.student?.enrollmentNumber || r.student?.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Target Club',
      render: (r) => (
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-xs">
            {r.club?.logo || '💻'}
          </span>
          <Link
            href={`/clubs/${r.club?._id || r.club?.id}`}
            className="text-xs font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {r.club?.name || 'Club'}
          </Link>
        </div>
      ),
    },
    {
      header: 'Department / Year',
      render: (r) => (
        <span className="text-xs text-gray-600">
          {r.student?.department || 'CS'} • {r.student?.year || '1st Year'}
        </span>
      ),
    },
    {
      header: 'Submission Note',
      render: (r) => (
        <span className="text-xs text-gray-500 max-w-xs truncate block" title={r.note || 'None'}>
          {r.note || 'No note provided'}
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      render: (r) => <StatusBadge status={r.status} size="sm" />,
    },
    {
      header: 'Date',
      render: (r) => (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {r.requestDate ? new Date(r.requestDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'Recently'}
        </span>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (r) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          {r.status === 'Pending' ? (
            <>
              <button
                type="button"
                disabled={actionLoadingId === (r.id || r._id)}
                onClick={() => handleReview(r.id || r._id, 'Approved')}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer disabled:opacity-50"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Approve</span>
              </button>
              <button
                type="button"
                disabled={actionLoadingId === (r.id || r._id)}
                onClick={() => handleReview(r.id || r._id, 'Rejected')}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-50"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span>Reject</span>
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-400 font-medium italic">
              Processed
            </span>
          )}
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
            Membership Requests
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and oversee student join applications submitted across all campus clubs.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchRequests}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Pending Applications"
          value={pendingCount}
          supportingText="Awaiting decision"
          icon={<Clock className="h-5 w-5 text-amber-600" />}
        />
        <StatCard
          title="Approved Memberships"
          value={approvedCount}
          supportingText="Inducted into clubs"
          icon={<CheckCircle className="h-5 w-5 text-emerald-600" />}
        />
        <StatCard
          title="Rejected Applications"
          value={rejectedCount}
          supportingText="Declined applications"
          icon={<XCircle className="h-5 w-5 text-rose-600" />}
        />
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <SearchInput
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search by student or club..."
            />
          </div>

          <div className="flex items-center gap-2">
            <FilterButton
              label="Status"
              selectedValue={statusFilter}
              onChange={(val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Requests', value: 'all' },
                { label: 'Pending Only', value: 'Pending' },
                { label: 'Approved', value: 'Approved' },
                { label: 'Rejected', value: 'Rejected' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedRequests}
          keyExtractor={(r) => r.id || r._id}
          emptyState={
            <EmptyState
              title="No membership requests"
              description="There are currently no student club requests matching the filter criteria."
            />
          }
        />

        {filteredRequests.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
            totalItems={filteredRequests.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};
