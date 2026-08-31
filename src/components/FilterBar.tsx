import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FilterType, SortOption } from '../types';
import { CATEGORIES } from '../constants';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  typeFilter: FilterType;
  onTypeFilterChange: (type: FilterType) => void;
  categoryFilter: string;
  onCategoryFilterChange: (cat: string) => void;
  sortOption: SortOption;
  onSortOptionChange: (sort: SortOption) => void;
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortOption,
  onSortOptionChange,
  totalFilteredCount,
}) => {
  return (
    <div id="filter-and-search-bar" className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-sm mb-4 space-y-3">
      {/* Top row: Search input (Real-time) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ค้นหารายการธุรกรรมแบบเรียลไทม์ (เช่น ข้าว, เงินเดือน, น้ำมัน)..."
          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
        />
        {searchQuery && (
          <button
            id="btn-clear-search"
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            title="ล้างคำค้นหา"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Second row: Filter Tabs, Category dropdown, and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
          <button
            id="filter-type-all"
            type="button"
            onClick={() => onTypeFilterChange('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              typeFilter === 'all'
                ? 'bg-white text-slate-800 shadow-xs border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            id="filter-type-income"
            type="button"
            onClick={() => onTypeFilterChange('income')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              typeFilter === 'income'
                ? 'bg-white text-emerald-600 font-semibold shadow-xs border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            รายรับ
          </button>
          <button
            id="filter-type-expense"
            type="button"
            onClick={() => onTypeFilterChange('expense')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              typeFilter === 'expense'
                ? 'bg-white text-rose-600 font-semibold shadow-xs border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            รายจ่าย
          </button>
        </div>

        {/* Category & Sorting Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              id="filter-category-select"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">ทุกหมวดหมู่</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Option */}
          <select
            id="sort-option-select"
            value={sortOption}
            onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="newest">ล่าสุดก่อน</option>
            <option value="oldest">เก่าสุดก่อน</option>
            <option value="amount-desc">จำนวนเงินมาก → น้อย</option>
            <option value="amount-asc">จำนวนเงินน้อย → มาก</option>
          </select>

          {/* Result Counter Badge */}
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
            {totalFilteredCount} รายการ
          </span>
        </div>
      </div>
    </div>
  );
};
