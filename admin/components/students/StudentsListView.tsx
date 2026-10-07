'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Users,
  UserPlus,
  BookOpen,
  MoreVertical,
  ExternalLink,
  Shield,
  Download,
  AlertCircle,
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
import { mockStudents, Student } from '@/lib/mockData';

export const StudentsListView: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter logic
  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        deptFilter === 'all' || student.department === deptFilter;

      const matchesYear =
        yearFilter === 'all' || student.year === yearFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        student.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesYear && matchesStatus;
    });
  }, [searchQuery, deptFilter, yearFilter, statusFilter]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchQuery('');
    setDeptFilter('all');
    setYearFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const columns: Column<Student>[] = [
    {
      header: 'Student',
      render: (stu) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar name={stu.name} src={stu.avatar} size="sm" />
          <div>
            <Link
              href={`/students/${stu.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {stu.name}
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">
              ID: {stu.studentId}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Email',
      render: (stu) => (
        <span className="text-xs text-gray-500 font-mono">{stu.email}</span>
      ),
    },
    {
      header: 'Department',
      render: (stu) => (
        <span className="text-xs text-gray-700 font-medium">
          {stu.department}
        </span>
      ),
    },
    {
      header: 'Year',
      render: (stu) => (
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
          {stu.year}
        </span>
      ),
    },
    {
      header: 'Clubs Joined',
      align: 'right',
      render: (stu) => (
        <span className="font-semibold text-gray-900 font-mono text-xs">
          {stu.clubsJoined} {stu.clubsJoined === 1 ? 'club' : 'clubs'}
        </span>
      ),
    },
    {
      header: 'Events Attended',
      align: 'right',
      render: (stu) => (
        <span className="font-medium text-gray-700 font-mono text-xs">
          {stu.eventsJoined} events
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      render: (stu) => <StatusBadge status={stu.status} size="sm" />,
    },
    {
      header: 'Joined',
      render: (stu) => (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {stu.joinedDate}
        </span>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (stu) => (
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
                onClick: () => router.push(`/students/${stu.id}`),
              },
              {
                label: 'Send Official Notice',
                icon: <AlertCircle className="h-3.5 w-3.5" />,
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
            Students
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage student registrations, club memberships, and extracurricular attendance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-gray-400" />
            <span className="hidden sm:inline">Export Student Census</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="2,846"
          trend="+12.4%"
          trendType="positive"
          supportingText="Enrolled campus-wide"
          icon={<GraduationCap className="h-4 w-4 text-blue-600" />}
        />
        <StatCard
          title="Active in Clubs"
          value="2,410"
          supportingText="84.6% active rate"
          icon={<Users className="h-4 w-4 text-emerald-600" />}
        />
        <StatCard
          title="New This Month"
          value="+184"
          trend="+8.5%"
          trendType="positive"
          supportingText="Fresh inductions"
          icon={<UserPlus className="h-4 w-4 text-indigo-600" />}
        />
        <StatCard
          title="Avg Clubs / Student"
          value="2.4"
          supportingText="Active memberships"
          icon={<BookOpen className="h-4 w-4 text-amber-600" />}
        />
      </div>

      {/* Controls: Search & Multiple Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SearchInput
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder="Search students by name, email, student ID..."
            className="w-full sm:w-80"
          />

          <div className="flex flex-wrap items-center gap-2">
            <FilterButton
              label="Department"
              selectedValue={deptFilter}
              onChange={(val) => {
                setDeptFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Departments', value: 'all' },
                { label: 'Computer Science', value: 'Computer Science' },
                { label: 'Electronics & Comm.', value: 'Electronics & Communication' },
                { label: 'Mechanical Eng.', value: 'Mechanical Engineering' },
                { label: 'Data Science & AI', value: 'Data Science & AI' },
                { label: 'Business Admin.', value: 'Business Administration' },
                { label: 'Biotechnology', value: 'Biotechnology' },
              ]}
            />

            <FilterButton
              label="Year"
              selectedValue={yearFilter}
              onChange={(val) => {
                setYearFilter(val);
                setCurrentPage(1);
              }}
              options={[
                { label: 'All Years', value: 'all' },
                { label: '1st Year', value: '1st Year' },
                { label: '2nd Year', value: '2nd Year' },
                { label: '3rd Year', value: '3rd Year' },
                { label: '4th Year', value: '4th Year' },
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
                { label: 'Inactive', value: 'Inactive' },
                { label: 'Suspended', value: 'Suspended' },
              ]}
            />

            {(searchQuery || deptFilter !== 'all' || yearFilter !== 'all' || statusFilter !== 'all') && (
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
      </div>

      {/* Students Data Table */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedStudents}
          keyExtractor={(stu) => stu.id}
          onRowClick={(stu) => router.push(`/students/${stu.id}`)}
          emptyState={
            <EmptyState
              title="No students found"
              description="No student profiles match your search criteria or filter combination."
              actionLabel="Clear Filters"
              onAction={resetFilters}
            />
          }
        />

        {filteredStudents.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
            totalItems={filteredStudents.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};
