'use client';

import React, { useState } from 'react';

export interface CategorySegment {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

interface DonutChartProps {
  categories: CategorySegment[];
  totalLabel?: string;
  className?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  categories,
  totalLabel = 'Total Clubs',
  className = '',
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<CategorySegment | null>(null);

  const size = 180;
  const strokeWidth = 24;
  const center = size / 2;
  const radius = center - strokeWidth / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;
  const totalItems = categories.reduce((acc, c) => acc + c.count, 0);

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-6 ${className}`}>
      {/* SVG Donut */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          {categories.map((cat, i) => {
            const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += (cat.percentage / 100) * circumference;

            const isHovered = hoveredSegment?.name === cat.name;

            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={cat.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setHoveredSegment(cat)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            {hoveredSegment ? `${hoveredSegment.percentage}%` : totalItems}
          </span>
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
            {hoveredSegment ? hoveredSegment.name : totalLabel}
          </span>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="flex-1 w-full space-y-2">
        {categories.map((cat, i) => {
          const isHovered = hoveredSegment?.name === cat.name;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredSegment(cat)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={`flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                isHovered ? 'bg-gray-100/80 font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-gray-700">{cat.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-mono">{cat.count} clubs</span>
                <span className="font-semibold text-gray-900 font-mono w-8 text-right">
                  {cat.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
