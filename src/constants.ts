import { Category, Transaction } from './types';

export const CATEGORIES: Category[] = [
  // Expense Categories
  { id: 'food', name: 'อาหาร', icon: 'Utensils', color: 'text-amber-600 bg-amber-50 border-amber-200', type: 'expense' },
  { id: 'transport', name: 'เดินทาง', icon: 'Car', color: 'text-blue-600 bg-blue-50 border-blue-200', type: 'expense' },
  { id: 'shopping', name: 'ช้อปปิ้ง', icon: 'ShoppingBag', color: 'text-pink-600 bg-pink-50 border-pink-200', type: 'expense' },
  { id: 'bills', name: 'บิลและค่าบริการ', icon: 'Receipt', color: 'text-rose-600 bg-rose-50 border-rose-200', type: 'expense' },
  { id: 'entertainment', name: 'ความบันเทิง', icon: 'Gamepad2', color: 'text-purple-600 bg-purple-50 border-purple-200', type: 'expense' },
  { id: 'health', name: 'สุขภาพ', icon: 'HeartPulse', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', type: 'expense' },
  
  // Income Categories
  { id: 'salary', name: 'เงินเดือน', icon: 'Banknote', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', type: 'income' },
  { id: 'freelance', name: 'ฟรีแลนซ์/งานเสริม', icon: 'Laptop', color: 'text-teal-600 bg-teal-50 border-teal-200', type: 'income' },
  { id: 'investment', name: 'ผลตอบแทน/ลงทุน', icon: 'TrendingUp', color: 'text-indigo-600 bg-indigo-50 border-indigo-200', type: 'income' },
  { id: 'bonus', name: 'โบนัส/เงินพิเศษ', icon: 'Award', color: 'text-yellow-600 bg-yellow-50 border-yellow-200', type: 'income' },
  
  // Generic
  { id: 'other', name: 'อื่นๆ', icon: 'MoreHorizontal', color: 'text-slate-600 bg-slate-50 border-slate-200', type: 'both' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    name: 'เงินเดือนประจำเดือน',
    amount: 35000,
    type: 'income',
    category: 'salary',
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 24 * 3,
  },
  {
    id: 2,
    name: 'ค่าอาหารกลางวันและกาแฟ',
    amount: 180,
    type: 'expense',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 24 * 2,
  },
  {
    id: 3,
    name: 'เติมน้ำมันรถยนต์',
    amount: 1200,
    type: 'expense',
    category: 'transport',
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 24,
  },
  {
    id: 4,
    name: 'ซื้อเสื้อผ้าและของใช้',
    amount: 1450,
    type: 'expense',
    category: 'shopping',
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: 5,
    name: 'รับงานออกแบบกราฟิก',
    amount: 4500,
    type: 'income',
    category: 'freelance',
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 3600000 * 2,
  },
];
