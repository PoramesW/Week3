import React from 'react';
import { Trash2, Calendar, ReceiptText } from 'lucide-react';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';
import { CategoryIcon } from './CategoryIcon';

interface TransactionListProps {
  transactions: Transaction[];
  totalTransactionsCount: number;
  onDeleteTransaction: (id: number) => void;
  onClearAllTransactions: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  totalTransactionsCount,
  onDeleteTransaction,
  onClearAllTransactions,
}) => {
  const getCategory = (catId: string) => {
    return (
      CATEGORIES.find((c) => c.id === catId) || {
        id: 'other',
        name: 'อื่นๆ',
        icon: 'MoreHorizontal',
        color: 'text-[#8C857B] bg-[#FAF9F6] border-[#E6E2D3]',
        type: 'both' as const,
      }
    );
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleClearAll = () => {
    // โจทย์ที่ 5: แสดงกล่องยืนยัน (confirm())
    const confirmed = window.confirm(
      'คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลประวัติธุรกรรมทั้งหมด?\n\nการกระทำนี้จะล้างข้อมูลทั้งหมดในตารางและอัปเดตยอดเงินให้เป็น ฿0.00'
    );
    if (confirmed) {
      onClearAllTransactions();
    }
  };

  return (
    <div id="transaction-history-section" className="bg-white rounded-2xl p-5 md:p-6 border border-[#E6E2D3] shadow-xs flex flex-col">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-[#F0EDE6] gap-2">
        <div className="flex items-center gap-2">
          <ReceiptText className="w-5 h-5 text-[#6B8E61]" />
          <h2 className="text-base font-serif font-bold text-[#2D2A26]">
            ประวัติรายการธุรกรรมทั้งหมด
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8C857B] font-medium bg-[#FAF9F6] border border-[#E6E2D3] px-3 py-1 rounded-full">
            แสดง {transactions.length} จาก {totalTransactionsCount} รายการ
          </span>
          {totalTransactionsCount > 0 && (
            <button
              id="btn-header-clear-all"
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9EFE6] hover:bg-[#BC6C25] text-[#BC6C25] hover:text-white text-xs font-semibold rounded-full border border-[#E8D7C8] transition-colors cursor-pointer"
              title="ล้างข้อมูลทั้งหมด"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ล้างทั้งหมด</span>
            </button>
          )}
        </div>
      </div>

      {/* Transaction List with <li> tags as required */}
      {transactions.length === 0 ? (
        <div id="empty-transactions-state" className="py-12 text-center text-[#A19B8F]">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E6E2D3] flex items-center justify-center mx-auto mb-3 text-[#A19B8F]">
            <ReceiptText className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-[#4A453E]">ไม่พบรายการธุรกรรม</p>
          <p className="text-xs text-[#A19B8F] mt-1">
            {totalTransactionsCount === 0
              ? 'เริ่มต้นเพิ่มรายการรายรับหรือรายจ่ายจากฟอร์มด้านบน'
              : 'ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองหมวดหมู่'}
          </p>
        </div>
      ) : (
        <ul id="transaction-list-container" className="space-y-2.5">
          {transactions.map((item) => {
            const categoryInfo = getCategory(item.category);
            const isIncome = item.type === 'income';

            return (
              <li
                key={item.id}
                id={`transaction-item-${item.id}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl hover:bg-[#FAF9F6] transition-colors border border-[#F0EDE6]"
              >
                {/* Left side: ID/Order, Type badge, Category icon + name, Item Name */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Order / ID Badge (โจทย์ที่ 3) */}
                  <div
                    id={`transaction-id-${item.id}`}
                    className="shrink-0 w-8 h-8 rounded-lg bg-[#F5F2ED] text-[#8C857B] border border-[#E6E2D3] flex items-center justify-center text-xs font-bold font-mono"
                    title={`รหัสรายการ: #${item.id}`}
                  >
                    #{String(item.id).padStart(3, '0')}
                  </div>

                  {/* Category Icon with category-specific color (โจทย์ที่ 1) */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${categoryInfo.color}`}
                    title={`หมวดหมู่: ${categoryInfo.name}`}
                  >
                    <CategoryIcon iconName={categoryInfo.icon} className="w-5 h-5" />
                  </div>

                  {/* Name and Meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[#2D2A26] text-sm md:text-base truncate">
                        {item.name}
                      </span>
                      {/* Type Badge (โจทย์ที่ 3) */}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${
                          isIncome
                            ? 'bg-[#E9F3E7] text-[#6B8E61] border-[#CFE4CB]'
                            : 'bg-[#F9EFE6] text-[#BC6C25] border-[#E8D7C8]'
                        }`}
                      >
                        {isIncome ? 'INCOME' : 'EXPENSE'}
                      </span>
                    </div>

                    {/* Category Name & Date info (โจทย์ที่ 1 & 3) */}
                    <div className="flex items-center gap-2 text-xs text-[#8C857B] mt-1 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#4A453E] bg-white border border-[#D6D1C4] px-2.5 py-0.5 rounded-full text-[11px]">
                        <span className={`w-1.5 h-1.5 rounded-full ${isIncome ? 'bg-[#6B8E61]' : 'bg-[#BC6C25]'}`} />
                        <span>{categoryInfo.name}</span>
                      </span>
                      <span className="text-[#D6D1C4]">•</span>
                      <span className="inline-flex items-center gap-1 text-[#A19B8F] text-[11px]">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: Amount (โจทย์ที่ 3) & Delete button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pl-11 sm:pl-0">
                  <div
                    id={`transaction-amount-${item.id}`}
                    className={`text-base md:text-lg font-bold tracking-tight ${
                      isIncome ? 'text-[#6B8E61]' : 'text-[#BC6C25]'
                    }`}
                  >
                    {isIncome ? '+' : '-'}฿{formatCurrency(item.amount)}
                  </div>

                  <button
                    id={`btn-delete-transaction-${item.id}`}
                    type="button"
                    onClick={() => onDeleteTransaction(item.id)}
                    className="p-1.5 text-[#A19B8F] hover:text-[#BC6C25] hover:bg-[#F9EFE6] rounded-lg transition-colors cursor-pointer"
                    title="ลบรายการนี้"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Bottom Action: Clear All Data Button (โจทย์ที่ 5) */}
      <div className="pt-5 mt-4 border-t border-[#F0EDE6] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#A19B8F]">
          รายการทั้งหมดถูกบันทึกไว้ในอุปกรณ์ของคุณ (Local Storage)
        </p>
        <button
          id="btn-clear-all-transactions"
          type="button"
          onClick={handleClearAll}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F9EFE6] hover:bg-[#BC6C25] hover:text-white text-[#BC6C25] font-semibold text-xs rounded-xl border border-[#E8D7C8] transition-colors cursor-pointer shadow-2xs"
        >
          <Trash2 className="w-4 h-4" />
          <span>ล้างข้อมูลทั้งหมด</span>
        </button>
      </div>
    </div>
  );
};
