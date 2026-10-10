'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Users,
  UserPlus,
  BookOpen,
  MoreVertical,
  ExternalLink,
  Edit2,
  Trash2,
  Download,
  AlertCircle,
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
import { mockStudents, Student } from '@/lib/mockData';

export const StudentsListView: React.FC = () => {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    enrollmentNumber: '',
    department: 'Computer Science',
    year: '1st Year',
    status: 'Active',
    age: '20',
    bio: '',
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.students.getAll();
      if (res.success && Array.isArray(res.students)) {
        setStudents(res.students);
      }
    } catch (err) {
      console.warn('Backend connection failed, falling back to cached students:', err);
      setStudents(mockStudents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.studentId && student.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (student.enrollmentNumber && student.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept =
        deptFilter === 'all' || student.department === deptFilter;

      const matchesYear =
        yearFilter === 'all' || student.year === yearFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        student.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesYear && matchesStatus;
    });
  }, [students, searchQuery, deptFilter, yearFilter, statusFilter]);

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

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      password: 'Student@123',
      enrollmentNumber: 'STU-' + Date.now().toString().slice(-4),
      department: 'Computer Science',
      year: '1st Year',
      status: 'Active',
      age: '20',
      bio: '',
    });
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student: any) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      password: '',
      enrollmentNumber: student.enrollmentNumber || student.studentId || '',
      department: student.department || 'Computer Science',
      year: student.year || '1st Year',
      status: student.status || 'Active',
      age: student.age ? String(student.age) : '20',
      bio: student.bio || '',
    });
    setFormError(null);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (student: any) => {
    setSelectedStudent(student);
    setFormError(null);
    setIsDeleteModalOpen(true);
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError(null);

    try {
      await api.students.create({
        ...formData,
        age: Number(formData.age),
      });
      setIsAddModalOpen(false);
      fetchStudents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to create student record.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setActionLoading(true);
    setFormError(null);

    try {
      await api.students.update(selectedStudent.id || selectedStudent._id, {
        ...formData,
        age: Number(formData.age),
      });
      setIsEditModalOpen(false);
      fetchStudents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to update student profile.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;
    setActionLoading(true);

    try {
      await api.students.delete(selectedStudent.id || selectedStudent._id);
      setIsDeleteModalOpen(false);
      fetchStudents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to delete student.');
    } finally {
      setActionLoading(false);
    }
  };

  const columns: Column<any>[] = [
    {
      header: 'Student',
      render: (stu) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar name={stu.name} src={stu.avatar} size="sm" />
          <div>
            <Link
              href={`/students/${stu.id || stu._id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {stu.name}
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">
              ID: {stu.studentId || stu.enrollmentNumber}
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
                className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            }
            items={[
              {
                label: 'View Dossier',
                icon: <ExternalLink className="h-3.5 w-3.5" />,
                onClick: () => router.push(`/students/${stu.id || stu._id}`),
              },
              {
                label: 'Edit Student',
                icon: <Edit2 className="h-3.5 w-3.5" />,
                onClick: () => handleOpenEdit(stu),
              },
              {
                label: 'Delete Record',
                icon: <Trash2 className="h-3.5 w-3.5 text-red-500" />,
                onClick: () => handleOpenDelete(stu),
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
            Manage student registrations, club memberships, and extracurricular engagement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchStudents}
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
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={students.length}
          trend="+Live DB"
          trendType="positive"
          supportingText="Registered profiles"
          icon={<GraduationCap className="h-4 w-4 text-blue-600" />}
        />
        <StatCard
          title="Active in Clubs"
          value={students.filter((s) => (s.clubsJoined || 0) > 0).length}
          supportingText="Participating students"
          icon={<Users className="h-4 w-4 text-emerald-600" />}
        />
        <StatCard
          title="Departments"
          value="6"
          supportingText="Represented fields"
          icon={<BookOpen className="h-4 w-4 text-purple-600" />}
        />
        <StatCard
          title="Avg Clubs / Student"
          value="1.8"
          supportingText="Club memberships"
          icon={<UserPlus className="h-4 w-4 text-amber-600" />}
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
              placeholder="Search by name, email, or ID..."
            />
          </div>

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
                className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4 cursor-pointer"
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
          keyExtractor={(stu) => stu.id || stu._id}
          onRowClick={(stu) => router.push(`/students/${stu.id || stu._id}`)}
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

      {/* ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Add New Student</h3>
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

            <form onSubmit={handleCreateStudent} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Krishnan"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Enrollment ID</label>
                  <input
                    type="text"
                    required
                    value={formData.enrollmentNumber}
                    onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                    placeholder="e.g. STU-2024-009"
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
                    placeholder="student@campus.edu"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Password</label>
                  <input
                    type="text"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Initial password"
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
                    <option value="Business Administration">Business Admin.</option>
                    <option value="Biotechnology">Biotechnology</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    min="16"
                    max="99"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
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
                  {actionLoading ? 'Creating...' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Edit Student Record</h3>
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

            <form onSubmit={handleUpdateStudent} className="mt-4 space-y-4 text-xs">
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
                  <label className="block font-semibold text-gray-700 mb-1">Enrollment ID</label>
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
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
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
                    <option value="Business Administration">Business Admin.</option>
                    <option value="Biotechnology">Biotechnology</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="h-10 w-full rounded-xl border border-gray-200 px-2 text-xs focus:border-gray-900 outline-none bg-white"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    min="16"
                    max="99"
                    className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-gray-900 outline-none"
                  />
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
      {isDeleteModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-900">Delete Student Record?</h3>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete <strong>{selectedStudent.name}</strong> ({selectedStudent.email})? This will also purge their club memberships and pending join requests.
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
                onClick={handleDeleteStudent}
                disabled={actionLoading}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Delete Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
