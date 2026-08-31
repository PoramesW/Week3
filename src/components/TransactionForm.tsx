import React, { useState } from 'react';
import { PlusCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Category, Transaction, TransactionType } from '../types';
import { CATEGORIES } from '../constants';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errorMessage, setErrorMessage] = useState('');

  // Filter categories based on transaction type (or both)
  const availableCategories = CATEGORIES.filter(
    (cat) => cat.type === type || cat.type === 'both'
  );

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    // Auto set appropriate default category for this type
    const defaultCat = CATEGORIES.find((c) => c.type === newType || c.type === 'both');
    if (defaultCat) {
      setCategory(defaultCat.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('กรุณากรอกชื่อรายการ');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMessage('กรุณาระบุจำนวนเงินที่มากกว่า 0');
      return;
    }

    onAddTransaction({
      name: name.trim(),
      amount: numAmount,
      type,
      category,
      date: date || new Date().toISOString().split('T')[0],
    });

    // Reset form fields
    setName('');
    setAmount('');
  };

  return (
    <div id="add-transaction-section" className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600" />
        เพิ่มรายการธุรกรรมใหม่
      </h2>

      <form id="transaction-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type Segmented Switch */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            ประเภทรายการ
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              id="btn-type-expense"
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-150 cursor-pointer ${
                type === 'expense'
                  ? 'bg-white text-rose-600 shadow-sm border border-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>รายจ่าย (Expense)</span>
            </button>
            <button
              id="btn-type-income"
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-150 cursor-pointer ${
                type === 'income'
                  ? 'bg-white text-emerald-600 shadow-sm border border-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>รายรับ (Income)</span>
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Item Name */}
          <div className="md:col-span-4">
            <label htmlFor="input-transaction-name" className="block text-xs font-medium text-slate-600 mb-1">
              ชื่อรายการ <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-transaction-name"
              type="text"
              placeholder="เช่น ข้าวกะเพรา, ซื้อของเข้าบ้าน, ค่ารถ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Category Select (โจทย์ที่ 1) */}
          <div className="md:col-span-3">
            <label htmlFor="select-transaction-category" className="block text-xs font-medium text-slate-600 mb-1">
              หมวดหมู่ธุรกรรม <span className="text-rose-500">*</span>
            </label>
            <select
              id="select-transaction-category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
            >
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="md:col-span-3">
            <label htmlFor="input-transaction-amount" className="block text-xs font-medium text-slate-600 mb-1">
              จำนวนเงิน (บาท) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">฿</span>
              <input
                id="input-transaction-amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Date */}
          <div className="md:col-span-2">
            <label htmlFor="input-transaction-date" className="block text-xs font-medium text-slate-600 mb-1">
              วันที่
            </label>
            <input
              id="input-transaction-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div id="form-error-alert" className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2.5">
            {errorMessage}
          </div>
        )}

        {/* Action buttons: Reset form and Submit */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            id="btn-reset-form-fields"
            type="button"
            onClick={() => {
              setName('');
              setAmount('');
              setErrorMessage('');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#8C857B] hover:text-[#4A453E] bg-white border border-[#D6D1C4] rounded-xl hover:bg-[#FAF9F6] transition-colors cursor-pointer"
          >
            <span>ล้างฟอร์ม</span>
          </button>

          <button
            id="btn-submit-transaction"
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#6B8E61] hover:bg-[#5a7951] active:scale-98 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>บันทึกรายการ</span>
          </button>
        </div>
      </form>
    </div>
  );
};
