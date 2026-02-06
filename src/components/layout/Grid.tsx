import React from 'react';

export interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  sm?: 1 | 2 | 3 | 4 | 5 | 6;
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  lg?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Grid: React.FC<GridProps> = ({ 
  children, 
  cols, 
  sm,
  md,
  lg,
  gap = 'md', 
  className = '' 
}) => {
  // Responsive Columns
  const getColClass = (val?: number, prefix?: string) => {
    if (!val) return '';
    const p = prefix ? `${prefix}:` : '';
    return `${p}grid-cols-${val}`;
  };

  const colClasses = [
    getColClass(cols),
    getColClass(sm, 'sm'),
    getColClass(md, 'md'),
    getColClass(lg, 'lg'),
  ].filter(Boolean).join(' ') || 'grid-cols-1 md:grid-cols-3';

  // Map gaps to Tailwind classes
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12'
  }[gap];

  const combinedClassName = `grid ${colClasses} ${gapClasses} ${className}`;

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Grid;