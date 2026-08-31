import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalIncome,
  totalExpense,
  netBalance,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div id="financial-summary-section" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Net Balance Card */}
      <div
        id="card-net-balance"
        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-500">ยอดเงินคงเหลือสุทธิ</span>
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              netBalance >= 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
            }`}
          >
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div
            className={`text-2xl lg:text-3xl font-bold tracking-tight ${
              netBalance >= 0 ? 'text-slate-900' : 'text-rose-600'
            }`}
          >
            ฿{formatCurrency(netBalance)}
          </div>
          <p className="text-xs text-slate-400 mt-1">รายรับรวม - รายจ่ายรวม</p>
        </div>
      </div>

      {/* Total Income Card */}
      <div
        id="card-total-income"
        className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-500">ยอดรายรับรวม</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl lg:text-3xl font-bold tracking-tight text-emerald-600">
            +฿{formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-slate-400 mt-1">รวมรายรับทุกรายการ</p>
        </div>
      </div>

      {/* Total Expense Card */}
      <div
        id="card-total-expense"
        className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-500">ยอดรายจ่ายรวม</span>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl lg:text-3xl font-bold tracking-tight text-rose-600">
            -฿{formatCurrency(totalExpense)}
          </div>
          <p className="text-xs text-slate-400 mt-1">รวมรายจ่ายทุกรายการ</p>
        </div>
      </div>
    </div>
  );
};
