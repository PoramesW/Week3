import React from 'react';
import {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Gamepad2,
  HeartPulse,
  Banknote,
  Laptop,
  TrendingUp,
  Award,
  MoreHorizontal,
  FolderMinus,
  FolderPlus,
} from 'lucide-react';

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, className = 'w-4 h-4' }) => {
  switch (iconName) {
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Receipt':
      return <Receipt className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Banknote':
      return <Banknote className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'FolderPlus':
      return <FolderPlus className={className} />;
    case 'FolderMinus':
      return <FolderMinus className={className} />;
    case 'MoreHorizontal':
    default:
      return <MoreHorizontal className={className} />;
  }
};
