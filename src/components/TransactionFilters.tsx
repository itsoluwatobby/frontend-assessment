import { FilterOptions, Transaction } from "../types/transaction";

type TransactionFiltersProps = {
  transactions: Transaction[];
  filters: FilterOptions
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = (
  {
    transactions, filters, setFilters
  }: TransactionFiltersProps
) => {

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const getUniqueCategories = () => {
    const categories = new Set<string>();
    transactions.forEach((t) => categories.add(t.category));
    return Array.from(categories);
  };

  return (
    <div className="filter-controls" data-testid="transaction-filters">
      <select
        value={filters.type || "all"}
        onChange={(e) =>
          handleFilterChange({
            ...filters,
            type: e.target.value as "debit" | "credit" | "all",
          })
        }
      >
        <option value="all">All Types</option>
        <option value="debit">Debit</option>
        <option value="credit">Credit</option>
      </select>

      <select
        value={filters.status || "all"}
        onChange={(e) =>
          handleFilterChange({
            ...filters,
            status: e.target.value as
              | "pending"
              | "completed"
              | "failed"
              | "all",
          })
        }
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>

      <select
        value={filters.category || ""}
        onChange={(e) =>
          handleFilterChange({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        {getUniqueCategories().map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}