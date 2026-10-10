'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users2,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  Download,
  Filter,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { AreaChart } from '@/components/ui/charts/AreaChart';
import { BarChart } from '@/components/ui/charts/BarChart';
import { DonutChart } from '@/components/ui/charts/DonutChart';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { api } from '@/lib/api';
import {
  mockAnalytics,
  mockPlatformActivity,
  mockClubs,
} from '@/lib/mockData';

export const DashboardView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [participationTab, setParticipationTab] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await api.dashboard.getStats();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      console.warn('Falling back to local metrics for offline mode:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Chart data based on selected tab
  const getParticipationData = () => {
    switch (participationTab) {
      case 'weekly':
        return mockAnalytics.participationWeekly.map((d) => ({
          label: d.label,
          value: d.students,
          secondaryValue: d.events,
        }));
      case 'yearly':
        return mockAnalytics.participationYearly.map((d) => ({
          label: d.label,
          value: d.students,
          secondaryValue: d.events,
        }));
      case 'monthly':
      default:
        return mockAnalytics.participationMonthly.map((d) => ({
          label: d.label,
          value: d.students,
          secondaryValue: d.events,
        }));
    }
  };

  const clubGrowthData = mockAnalytics.clubGrowth.map((d) => ({
    label: d.month,
    value: d.count,
  }));

  const totalClubsVal = stats?.totalClubs ?? mockClubs.length;
  const clubPresidentsVal = stats?.clubPresidents ?? 4;
  const totalStudentsVal = stats?.totalStudents ?? 4;
  const activeClubsVal = stats?.activeClubs ?? mockClubs.length;

  const categories = stats?.categoriesBreakdown?.length > 0
    ? stats.categoriesBreakdown
    : mockAnalytics.categoriesBreakdown;

  const topClubs = stats?.topClubsRanking?.length > 0
    ? stats.topClubsRanking
    : mockAnalytics.topClubsRanking;

  const activities = stats?.recentActivities?.length > 0
    ? stats.recentActivities
    : mockPlatformActivity;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard
            </h1>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              Live MongoDB
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, Admin. Real-time campus telemetry and management console.
          </p>
        </div>

        {/* Date Filter & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchDashboardStats}
            title="Refresh statistics"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <div className="relative inline-block">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 focus:border-gray-900 focus:outline-hidden"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="term">Current Academic Term</option>
            </select>
            <Filter className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          </div>

          <Link
            href="/clubs"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 text-xs font-medium text-white shadow-xs hover:bg-black transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Manage Clubs</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clubs"
          value={totalClubsVal}
          trend="+100% active"
          trendType="positive"
          supportingText="Active student clubs"
          icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}
        />

        <StatCard
          title="Club Presidents"
          value={clubPresidentsVal}
          trend="Verified"
          trendType="positive"
          supportingText="Club leadership active"
          icon={<Users2 className="h-5 w-5 text-indigo-600" />}
        />

        <StatCard
          title="Total Students"
          value={totalStudentsVal}
          trend="Registered"
          trendType="positive"
          supportingText="Student profiles"
          icon={<GraduationCap className="h-5 w-5 text-emerald-600" />}
        />

        <StatCard
          title="Active Clubs"
          value={activeClubsVal}
          trend={`${stats?.pendingApprovals ?? 1} Pending`}
          trendType="neutral"
          supportingText="Campus organizations"
          icon={<Sparkles className="h-5 w-5 text-amber-600" />}
        />
      </div>

      {/* Main Analytics Row: Student Participation */}
      <ChartCard
        title="Student Participation"
        subtitle="Tracking student attendance & event registrations across campus"
        headerAction={
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50/80 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setParticipationTab('weekly')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                participationTab === 'weekly'
                  ? 'bg-white text-gray-900 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setParticipationTab('monthly')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                participationTab === 'monthly'
                  ? 'bg-white text-gray-900 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setParticipationTab('yearly')}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                participationTab === 'yearly'
                  ? 'bg-white text-gray-900 shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Yearly
            </button>
          </div>
        }
      >
        <AreaChart
          data={getParticipationData()}
          height={260}
          color="#2563EB"
          secondaryColor="#93C5FD"
          showSecondary={true}
          primaryLabel="Student Attendees"
          secondaryLabel="Events Hosted"
        />
      </ChartCard>

      {/* Second Analytics Row: Club Growth & Club Categories */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard
          title="Club Growth"
          subtitle="New student organizations chartered per month"
        >
          <BarChart
            data={clubGrowthData}
            height={220}
            barColor="#1E293B"
            valueSuffix="clubs"
          />
        </ChartCard>

        <ChartCard
          title="Club Categories"
          subtitle="Distribution of clubs across university disciplines"
        >
          <DonutChart categories={categories} />
        </ChartCard>
      </div>

      {/* Third Row: Top Clubs Table & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top Clubs (2 columns on lg) */}
        <div className="lg:col-span-2 overflow-hidden rounded-xl border border-gray-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Top Performing Clubs</h3>
              <p className="text-xs text-gray-500">Ranked by verified student engagement and events hosted</p>
            </div>
            <Link
              href="/clubs"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>View all {totalClubsVal}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  <th className="py-2.5 font-medium">Club</th>
                  <th className="py-2.5 font-medium text-center">Category</th>
                  <th className="py-2.5 font-medium text-right">Members</th>
                  <th className="py-2.5 font-medium text-right">Events</th>
                  <th className="py-2.5 font-medium text-right">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topClubs.map((club: any, idx: number) => (
                  <tr key={club.id || idx} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-sm">
                          {club.avatar || '💻'}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">{club.name}</p>
                          <p className="text-[10px] text-gray-400">Rank #{idx + 1}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {club.category}
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium text-gray-700">
                      {club.members}
                    </td>
                    <td className="py-3 text-right font-medium text-gray-700">
                      {club.events || 0}
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <div className="h-1.5 w-12 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${club.engagement || 85}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-900 font-mono text-[11px]">
                          {club.engagement || 85}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity (1 column on lg) */}
        <div className="lg:col-span-1">
          <ActivityFeed
            activities={activities}
            title="Recent Activity"
            maxItems={5}
          />
        </div>
      </div>
    </div>
  );
};
