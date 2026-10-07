'use client';

import React, { useState } from 'react';

export const ActivityHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    events: number;
    students: number;
  } | null>(null);

  // Generate 26 weeks (approx 6 months) x 7 days
  const weeksCount = 26;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Seeded mock activity levels (0, 1, 2, 3, 4)
  const cells = React.useMemo(() => {
    const list: Array<{
      week: number;
      day: number;
      level: number;
      date: string;
      events: number;
      students: number;
    }> = [];

    const startDate = new Date(2026, 4, 1); // May 1, 2026

    for (let w = 0; w < weeksCount; w++) {
      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + w * 7 + d);

        // Deterministic pseudo-random based on week and day
        const seed = (w * 7 + d) % 19;
        let level = 0;
        let events = 0;
        let students = 0;

        if (d === 5 || d === 6) {
          // Weekend peak
          level = (seed % 3) + 2;
        } else if (seed % 4 === 0) {
          level = 3;
        } else if (seed % 2 === 0) {
          level = 1;
        } else {
          level = 2;
        }

        if (level === 1) { events = 1; students = 45; }
        else if (level === 2) { events = 2; students = 110; }
        else if (level === 3) { events = 4; students = 260; }
        else if (level === 4) { events = 6; students = 450; }

        list.push({
          week: w,
          day: d,
          level,
          date: currentDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          events,
          students,
        });
      }
    }
    return list;
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-gray-100 hover:ring-1 hover:ring-gray-300';
      case 1:
        return 'bg-blue-100 hover:ring-1 hover:ring-blue-300';
      case 2:
        return 'bg-blue-300 hover:ring-1 hover:ring-blue-400';
      case 3:
        return 'bg-blue-500 hover:ring-1 hover:ring-blue-600';
      case 4:
        return 'bg-blue-700 hover:ring-1 hover:ring-blue-800';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Campus Participation Heatmap</h4>
          <p className="text-xs text-gray-500">Student club event attendance density over the last 26 weeks</p>
        </div>

        {hoveredCell ? (
          <div className="rounded-md bg-gray-900 px-2.5 py-1 text-xs text-white shadow-xs">
            <span className="font-semibold">{hoveredCell.date}: </span>
            <span>{hoveredCell.students} students across {hoveredCell.events} events</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-xs bg-gray-100" />
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-100" />
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-300" />
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-500" />
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-700" />
            <span>More</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-1.5 min-w-[560px]">
          {/* Day labels */}
          <div className="flex flex-col justify-between py-0.5 text-[10px] text-gray-400 pr-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>

          {/* Week columns */}
          {Array.from({ length: weeksCount }, (_, w) => (
            <div key={w} className="flex flex-col gap-1.5">
              {days.map((_, d) => {
                const cell = cells.find((c) => c.week === w && c.day === d);
                if (!cell) return null;

                return (
                  <button
                    key={d}
                    type="button"
                    onMouseEnter={() =>
                      setHoveredCell({
                        date: cell.date,
                        events: cell.events,
                        students: cell.students,
                      })
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                    aria-label={`${cell.date}: ${cell.students} students`}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-xs transition-transform hover:scale-125 ${getLevelColor(
                      cell.level
                    )}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
