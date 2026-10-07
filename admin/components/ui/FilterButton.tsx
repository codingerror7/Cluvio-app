'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterButtonProps {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  icon,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const isFiltered = selectedValue !== '' && selectedValue !== 'all';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-colors ${
          isFiltered
            ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        {icon}
        <span>
          {isFiltered ? `${label}: ${selectedOption?.label || selectedValue}` : label}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-1.5 w-52 origin-top-right rounded-lg border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Filter by {label}
          </div>
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-gray-50 ${
                    isSelected ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                        isSelected
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                    <span>{option.label}</span>
                  </div>

                  {option.count !== undefined && (
                    <span className="text-[11px] text-gray-400">{option.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
