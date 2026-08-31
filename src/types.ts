export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType | 'both';
}

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  createdAt: number;
}

export type FilterType = 'all' | 'income' | 'expense';
export type SortOption = 'newest' | 'oldest' | 'amount-desc' | 'amount-asc';
