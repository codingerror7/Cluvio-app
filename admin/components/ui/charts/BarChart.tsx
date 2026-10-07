'use client';

import React, { useState } from 'react';

interface BarDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface BarChartProps {
  data: BarDataPoint[];
  height?: number;
  barColor?: string;
  valueSuffix?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 220,
  barColor = '#111827',
  valueSuffix = '',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 600;
  const padding = { top: 20, right: 20, bottom: 35, left: 45 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const barWidth = Math.min(innerWidth / data.length - 12, 36);

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="relative w-full select-none">
      {activePoint && (
        <div className="absolute right-0 top-0 flex items-center gap-1.5 rounded-md bg-gray-900 px-2.5 py-1 text-xs text-white shadow-xs z-10">
          <span className="text-gray-300">{activePoint.label}:</span>
          <span className="font-bold">
            {activePoint.value.toLocaleString()} {valueSuffix}
          </span>
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full overflow-visible font-sans"
        style={{ maxHeight: height }}
      >
        {/* Y ticks */}
        {[0, 0.5, 1].map((pct, i) => {
          const val = Math.round(maxVal * pct);
          const y = padding.top + innerHeight - pct * innerHeight;
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[10px] fill-gray-400 font-mono"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const slotWidth = innerWidth / data.length;
          const x = padding.left + i * slotWidth + (slotWidth - barWidth) / 2;
          const barHeight = (d.value / maxVal) * innerHeight;
          const y = padding.top + innerHeight - barHeight;
          const isHovered = hoverIndex === i;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={isHovered ? '#2563EB' : barColor}
                className="transition-colors duration-150 cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              />
              <text
                x={x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                className={`text-[11px] ${
                  isHovered ? 'fill-gray-900 font-semibold' : 'fill-gray-400'
                }`}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
