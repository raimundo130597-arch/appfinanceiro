export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  value: number;
  date: string;
  category: string;
  description: string;
  created_at: string;
}

export interface TransactionFormData {
  type: TransactionType;
  value: number;
  date: string;
  category: string;
  description: string;
}

export interface Filters {
  period: {
    start: string;
    end: string;
  };
  category: string;
  type: TransactionType | "all";
}

export const DEFAULT_EXPENSE_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Educação",
  "Lazer",
  "Roupas",
  "Outros",
];

export const DEFAULT_INCOME_CATEGORIES = [
  "Salário",
  "Freelance",
  "Investimentos",
  "Outros",
];

export const EXPENSE_CATEGORIES = DEFAULT_EXPENSE_CATEGORIES;
export const INCOME_CATEGORIES = DEFAULT_INCOME_CATEGORIES;

export type ExpenseCategory = string;
export type IncomeCategory = string;
