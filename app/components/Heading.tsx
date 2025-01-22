// app/components/Heading.tsx
import React from 'react';

interface HeadingProps {
  title: string;
  size?: 'text-sm' | 'text-md' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl'; // size prop'u eklendi
  className?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, size = 'text-lg', className }) => { // Varsayılan değer 'text-lg'
  const Tag = size === 'text-2xl' ? 'h1' : size === 'text-xl' ? 'h2' : 'h3'; // Hangi HTML başlık etiketinin kullanılacağını belirle
  return (
    <Tag className={`${size} font-semibold mb-2 ${className}`}>{title}</Tag>
  );
};

export default Heading;