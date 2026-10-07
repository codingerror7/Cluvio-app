'use client';

import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  status,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // Generate fallback initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

  // Size mapping
  const sizeMap = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const statusDotSize = {
    xs: 'h-1.5 w-1.5 bottom-0 right-0',
    sm: 'h-2 w-2 bottom-0 right-0',
    md: 'h-2.5 w-2.5 bottom-0 right-0',
    lg: 'h-3 w-3 bottom-0.5 right-0.5',
    xl: 'h-3.5 w-3.5 bottom-1 right-1',
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-white',
    offline: 'bg-gray-400 ring-white',
    busy: 'bg-rose-500 ring-white',
    away: 'bg-amber-500 ring-white',
  };

  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          onError={() => setHasError(true)}
          className={`rounded-full object-cover ring-1 ring-gray-200 ${sizeMap[size]}`}
        />
      ) : (
        <div
          className={`inline-flex items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700 ring-1 ring-gray-200 ${sizeMap[size]}`}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={`absolute rounded-full ring-2 ${statusColors[status]} ${statusDotSize[size]}`}
        />
      )}
    </div>
  );
};
