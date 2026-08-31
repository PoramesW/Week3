import React, { useState, useEffect, useMemo } from 'react';
import { Wallet, RotateCcw, Leaf, Trash2 } from 'lucide-react';
import { Transaction, FilterType, SortOption } from './types';
import { INITIAL_TRANSACTIONS } from './constants';
import { SummaryCards } from './components/SummaryCards';
import { TransactionForm } from './components/TransactionForm';
import { FilterBar } from './components/FilterBar';
import { TransactionList } from './components/TransactionList';

const STORAGE_KEY = 'expense_tracker_transactions_v1';

export default function App() {
  // Load initial transactions from localStorage or use default mock data
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved transactions', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  // Filters and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error('Error saving transactions', e);
    }
  }, [transactions]);

  // Financial Calculations (โจทย์ที่ 4: สรุปรายงานการเงิน)
  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const t of transactions) {
      if (t.type === 'income') {
        income += t.amount;
      } else if (t.type === 'expense') {
        expense += t.amount;
      }
    }

    const net = income - expense;
    return {
      totalIncome: income,
      totalExpense: expense,
      netBalance: net,
    };
  }, [transactions]);

  // Filter & Search Logic (โจทย์ที่ 2: Real-time search & filter)
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        // Real-time search by name
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const nameMatches = t.name.toLowerCase().includes(query);
          if (!nameMatches) return false;
        }

        // Filter by Type
        if (typeFilter !== 'all' && t.type !== typeFilter) {
          return false;
        }

        // Filter by Category
        if (categoryFilter !== 'all' && t.category !== categoryFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'newest') {
          return b.id - a.id;
        }
        if (sortOption === 'oldest') {
          return a.id - b.id;
        }
        if (sortOption === 'amount-desc') {
          return b.amount - a.amount;
        }
        if (sortOption === 'amount-asc') {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [transactions, searchQuery, typeFilter, categoryFilter, sortOption]);

  // Handler: Add new transaction
  const handleAddTransaction = (newTx: Omit<Transaction, 'id' | 'createdAt'>) => {
    const nextId = transactions.length > 0 ? Math.max(...transactions.map((t) => t.id)) + 1 : 1;
    const item: Transaction = {
      ...newTx,
      id: nextId,
      createdAt: Date.now(),
    };
    setTransactions((prev) => [item, ...prev]);
  };

  // Handler: Delete single transaction
  const handleDeleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Handler: Clear all transactions (โจทย์ที่ 5)
  const handleClearAllTransactions = () => {
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleConfirmClearAll = () => {
    const confirmed = window.confirm(
      'คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลประวัติธุรกรรมทั้งหมด?\n\nการกระทำนี้จะล้างข้อมูลทั้งหมดในตารางและอัปเดตยอดเงินให้เป็น ฿0.00'
    );
    if (confirmed) {
      handleClearAllTransactions();
    }
  };

  // Handler: Reset to initial sample data
  const handleResetSampleData = () => {
    if (window.confirm('ต้องการคืนค่าข้อมูลตัวอย่างเริ่มต้นหรือไม่?')) {
      setTransactions(INITIAL_TRANSACTIONS);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#4A453E] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E6E2D3] sticky top-0 z-10 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6B8E61] text-white flex items-center justify-center shadow-xs">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2D2A26] leading-tight">
                ระบบบันทึกรายรับ-รายจ่าย
              </h1>
              <p className="text-xs text-[#8C857B] mt-0.5">
                จัดการข้อมูลการเงินส่วนตัวอย่างง่ายด้วยโทนสีธรรมชาติ
              </p>
            </div>
          </div>

          {/* Quick actions & Top Summary */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-[#F0EDE6]">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-[#A19B8F] font-bold">รายรับรวม</p>
              <p className="text-sm sm:text-base font-semibold text-[#6B8E61]">
                ฿{totalIncome.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-[#A19B8F] font-bold">รายจ่ายรวม</p>
              <p className="text-sm sm:text-base font-semibold text-[#BC6C25]">
                ฿{totalExpense.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right border-l border-[#E6E2D3] pl-3 sm:pl-4">
              <p className="text-[10px] uppercase tracking-wider text-[#A19B8F] font-bold">คงเหลือสุทธิ</p>
              <p className="text-base sm:text-lg font-bold text-[#4A453E]">
                ฿{netBalance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {transactions.length > 0 ? (
                <button
                  id="btn-top-clear-all"
                  type="button"
                  onClick={handleConfirmClearAll}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F9EFE6] hover:bg-[#BC6C25] text-[#BC6C25] hover:text-white text-xs font-semibold rounded-lg border border-[#E8D7C8] transition-colors cursor-pointer"
                  title="ล้างข้อมูลทั้งหมด"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ล้างข้อมูลทั้งหมด</span>
                </button>
              ) : (
                <button
                  id="btn-restore-samples"
                  type="button"
                  onClick={handleResetSampleData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#F5F2ED] text-[#8C857B] text-xs font-medium rounded-lg border border-[#E6E2D3] transition-colors cursor-pointer"
                  title="โหลดข้อมูลตัวอย่างเริ่มต้น"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>โหลดข้อมูลตัวอย่าง</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* โจทย์ที่ 4: สรุปรายงานการเงิน */}
        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          netBalance={netBalance}
        />

        {/* โจทย์ที่ 1: ฟอร์มเพิ่มรายการพร้อมเลือกหมวดหมู่ */}
        <TransactionForm onAddTransaction={handleAddTransaction} />

        {/* โจทย์ที่ 2: ช่องค้นหาแบบ Real-time และตัวกรอง */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          sortOption={sortOption}
          onSortOptionChange={setSortOption}
          totalFilteredCount={filteredTransactions.length}
        />

        {/* โจทย์ที่ 3 & 5: ประวัติรายการธุรกรรมทั้งหมดและปุ่มล้างข้อมูล */}
        <TransactionList
          transactions={filteredTransactions}
          totalTransactionsCount={transactions.length}
          onDeleteTransaction={handleDeleteTransaction}
          onClearAllTransactions={handleClearAllTransactions}
        />
      </main>

      {/* Footer in Natural Tones theme */}
      <footer className="bg-[#F5F2ED] border-t border-[#E6E2D3] py-4 px-4 sm:px-6 text-xs text-[#A19B8F]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>แสดงข้อมูลล่าสุด • บันทึกอัตโนมัติในเบราว์เซอร์</p>
          <p className="font-medium text-[#8C857B]">Financial Tracker • Natural Tones Edition</p>
        </div>
      </footer>
    </div>
  );
}
