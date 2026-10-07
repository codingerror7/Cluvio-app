'use client';

import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  Calendar,
  Activity,
  TrendingUp,
  Download,
  Filter,
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { AreaChart } from '@/components/ui/charts/AreaChart';
import { BarChart } from '@/components/ui/charts/BarChart';
import { DonutChart } from '@/components/ui/charts/DonutChart';
import { ActivityHeatmap } from '@/components/ui/charts/ActivityHeatmap';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockAnalytics, mockClubs } from '@/lib/mockData';

export const AnalyticsView: React.FC = () => {
  const [period, setPeriod] = useState('6m');

  const userGrowthData = [
    { label: 'May', value: 1650, secondaryValue: 240 },
    { label: 'Jun', value: 1820, secondaryValue: 280 },
    { label: 'Jul', value: 2100, secondaryValue: 310 },
    { label: 'Aug', value: 2420, secondaryValue: 360 },
    { label: 'Sep', value: 2750, secondaryValue: 420 },
    { label: 'Oct', value: 2846, secondaryValue: 450 },
  ];

  const participationData = mockAnalytics.participationWeekly.map((d) => ({
    label: d.label,
    value: d.students,
  }));

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Platform Analytics
            </h1>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              Aggregated Reports
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 max-w-2xl leading-relaxed">
            Understand platform growth, club performance, student participation and verified campus engagement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative inline-block">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 focus:border-gray-900 focus:outline-hidden"
            >
              <option value="30d">Last 30 Days</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Academic Year 2026</option>
              <option value="all">All-time Data</option>
            </select>
            <Filter className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          </div>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Analytics CSV</span>
          </button>
        </div>
      </div>

      {/* 6 Overview KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
        <StatCard
          title="Total Users"
          value="3,240"
          trend="+14.2%"
          trendType="positive"
          supportingText="Active campus ID"
          icon={<Users className="h-4 w-4 text-blue-600" />}
        />
        <StatCard
          title="Active Students"
          value="2,410"
          trend="+11.8%"
          trendType="positive"
          supportingText="84% active rate"
          icon={<GraduationCap className="h-4 w-4 text-indigo-600" />}
        />
        <StatCard
          title="Active Clubs"
          value="42"
          trend="87.5%"
          trendType="neutral"
          supportingText="Out of 48 total"
          icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
        />
        <StatCard
          title="Events Hosted"
          value="142"
          trend="+18"
          trendType="positive"
          supportingText="This semester"
          icon={<Calendar className="h-4 w-4 text-amber-600" />}
        />
        <StatCard
          title="Avg Participation"
          value="76.2%"
          trend="+3.4%"
          trendType="positive"
          supportingText="Per club event"
          icon={<Activity className="h-4 w-4 text-rose-600" />}
        />
        <StatCard
          title="Engagement Rate"
          value="84.6%"
          trend="+5.1%"
          trendType="positive"
          supportingText="Verified check-ins"
          icon={<TrendingUp className="h-4 w-4 text-purple-600" />}
        />
      </div>

      {/* Charts Row: User Growth & Student Participation */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard
          title="User Growth Trajectory"
          subtitle="Cumulative growth of students and student leaders across campus"
        >
          <AreaChart
            data={userGrowthData}
            height={240}
            color="#2563EB"
            secondaryColor="#8B5CF6"
            showSecondary={true}
            primaryLabel="Active Students"
            secondaryLabel="Club Leaders"
          />
        </ChartCard>

        <ChartCard
          title="Daily Participation Trend"
          subtitle="Aggregated attendee headcount by weekday across all active clubs"
        >
          <BarChart
            data={participationData}
            height={240}
            barColor="#0F172A"
            valueSuffix="attendees"
          />
        </ChartCard>
      </div>

      {/* Heatmap & Category Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Heatmap (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
          <ActivityHeatmap />
        </div>

        {/* Categories (1 col) */}
        <div className="lg:col-span-1 rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Category Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Proportion of campus clubs by interest</p>
          <DonutChart categories={mockAnalytics.categoriesBreakdown} />
        </div>
      </div>

      {/* Club Performance Comparison Table */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 mb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Club Performance Benchmark</h3>
            <p className="text-xs text-gray-500">Cross-club comparative evaluation across key operational metrics</p>
          </div>
          <span className="text-xs font-medium text-gray-400">Showing top 8 active organizations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="py-3 pr-4 font-medium">Club</th>
                <th className="py-3 px-3 font-medium">Category</th>
                <th className="py-3 px-3 font-medium text-right">Members</th>
                <th className="py-3 px-3 font-medium text-right">Events</th>
                <th className="py-3 px-3 font-medium text-right">Avg Attendance</th>
                <th className="py-3 px-3 font-medium">Engagement Index</th>
                <th className="py-3 pl-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockClubs.slice(0, 8).map((club) => {
                const avgAttendance = Math.round(club.membersCount * 0.72);
                return (
                  <tr key={club.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm">
                          {club.logo}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">{club.name}</p>
                          <p className="text-[10px] text-gray-400">Pres: {club.president.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {club.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-semibold text-gray-900 font-mono">
                      {club.membersCount}
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium text-gray-700 font-mono">
                      {club.eventsCount}
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium text-gray-600 font-mono">
                      {avgAttendance} / event
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${club.engagementRate}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-900 font-mono text-xs">
                          {club.engagementRate}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pl-3 text-center">
                      <StatusBadge status={club.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Breakdown Section */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-2xs">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Department Engagement Breakdown</h3>
        <p className="text-xs text-gray-500 mb-5">Student club participation rate divided by academic branch</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockAnalytics.departmentBreakdown.map((dept, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-100 bg-gray-50/60 p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-gray-900">{dept.department}</h4>
                  <p className="mt-1 text-lg font-bold text-gray-900 font-mono">
                    {dept.students}
                    <span className="ml-1 text-xs font-normal text-gray-400">students</span>
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  {dept.participationRate}
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: dept.participationRate }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
