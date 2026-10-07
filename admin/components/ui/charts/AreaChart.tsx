'use client';

import React, { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface AreaChartProps {
  data: DataPoint[];
  height?: number;
  valuePrefix?: string;
  valueSuffix?: string;
  color?: string;
  secondaryColor?: string;
  showSecondary?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height = 240,
  valuePrefix = '',
  valueSuffix = '',
  color = '#2563EB',
  secondaryColor = '#93C5FD',
  showSecondary = false,
  primaryLabel = 'Active Students',
  secondaryLabel = 'Club Events',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 650;
  const padding = { top: 20, right: 20, bottom: 35, left: 45 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const maxSecondaryVal = showSecondary
    ? Math.max(...data.map((d) => d.secondaryValue || 0), 1)
    : 1;

  const getY = (val: number, max: number) => {
    return padding.top + innerHeight - (val / max) * innerHeight;
  };

  const getX = (index: number) => {
    if (data.length === 1) return padding.left + innerWidth / 2;
    return padding.left + (index / (data.length - 1)) * innerWidth;
  };

  // Generate primary path
  const primaryPoints = data.map((d, i) => `${getX(i)},${getY(d.value, maxVal)}`);
  const primaryLinePath = `M ${primaryPoints.join(' L ')}`;
  const primaryAreaPath = `${primaryLinePath} L ${getX(data.length - 1)},${
    padding.top + innerHeight
  } L ${getX(0)},${padding.top + innerHeight} Z`;

  // Secondary path if enabled
  let secondaryLinePath = '';
  if (showSecondary) {
    const secPoints = data.map(
      (d, i) => `${getX(i)},${getY(d.secondaryValue || 0, maxSecondaryVal)}`
    );
    secondaryLinePath = `M ${secPoints.join(' L ')}`;
  }

  // Y-axis grid ticks (4 ticks)
  const yTicks = [0, 0.33, 0.66, 1].map((pct) => {
    const val = Math.round(maxVal * pct);
    const y = padding.top + innerHeight - pct * innerHeight;
    return { val, y };
  });

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="relative w-full select-none">
      {/* Legend & Hover Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-medium text-gray-700">{primaryLabel}</span>
          </div>
          {showSecondary && (
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: secondaryColor }}
              />
              <span className="font-medium text-gray-700">{secondaryLabel}</span>
            </div>
          )}
        </div>

        {activePoint && (
          <div className="flex items-center gap-2 rounded-md bg-gray-900 px-2.5 py-1 text-white shadow-xs">
            <span className="font-medium text-gray-300">{activePoint.label}:</span>
            <span className="font-bold">
              {valuePrefix}
              {activePoint.value.toLocaleString()}
              {valueSuffix}
            </span>
            {showSecondary && activePoint.secondaryValue !== undefined && (
              <span className="text-gray-300">
                ({activePoint.secondaryValue} events)
              </span>
            )}
          </div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full overflow-visible font-sans"
        style={{ maxHeight: height }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Y Grid lines */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={tick.y}
              x2={width - padding.right}
              y2={tick.y}
              stroke="#F1F5F9"
              strokeWidth="1"
              strokeDasharray={i === 0 ? '' : '3 3'}
            />
            <text
              x={padding.left - 8}
              y={tick.y + 3}
              textAnchor="end"
              className="text-[10px] fill-gray-400 font-mono"
            >
              {tick.val >= 1000 ? `${(tick.val / 1000).toFixed(1)}k` : tick.val}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={primaryAreaPath} fill="url(#areaGradient)" />

        {/* Secondary line if enabled */}
        {showSecondary && (
          <path
            d={secondaryLinePath}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        )}

        {/* Primary Line */}
        <path
          d={primaryLinePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X Axis labels & hover trigger columns */}
        {data.map((d, i) => {
          const x = getX(i);
          const y = getY(d.value, maxVal);
          const isHovered = hoverIndex === i;

          return (
            <g key={i}>
              <text
                x={x}
                y={height - 8}
                textAnchor="middle"
                className={`text-[11px] ${
                  isHovered ? 'fill-gray-900 font-semibold' : 'fill-gray-400'
                }`}
              >
                {d.label}
              </text>

              {/* Vertical guideline on hover */}
              {isHovered && (
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + innerHeight}
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}

              {/* Data points */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 5.5 : 3}
                fill={isHovered ? '#FFFFFF' : color}
                stroke={color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="transition-all duration-150"
              />

              {/* Invisible touch/hover rect */}
              <rect
                x={x - innerWidth / (data.length * 2)}
                y={padding.top}
                width={innerWidth / data.length}
                height={innerHeight}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="cursor-pointer"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
