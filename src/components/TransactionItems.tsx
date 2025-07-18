import { format } from "date-fns";
import { Transaction } from "../types/transaction";

type TransactionItemProps = {
  transaction: Transaction;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  rowIndex: number;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
  rowIndex,
}: TransactionItemProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy HH:mm");
  };

  return (
    <div
      className={`transaction-item ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""} ${
        transaction.type === "debit" ? "debit" : "credit"
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="gridcell"
      aria-rowindex={rowIndex + 1}
      aria-selected={isSelected}
      aria-describedby={`transaction-${transaction.id}-details`}
      tabIndex={0}
    >
      <div className="transaction-main">
        <div className="transaction-merchant">
          <span className="merchant-name">{transaction.merchantName}</span>
          <span className="transaction-category">{transaction.category}</span>
        </div>
        <div className="transaction-amount">
          <span className={`amount ${transaction.type}`}>
            {transaction.type === "debit" ? "-" : "+"}
            {formatCurrency(transaction.amount)}
          </span>
        </div>
      </div>
      <div
        className="transaction-details"
        id={`transaction-${transaction.id}-details`}
      >
        <div
          className="transaction-description"
          aria-label={`Description: ${transaction.description}`}
        >
          <span>{transaction.description}</span>
        </div>
        <div className="transaction-meta">
          <div className="transaction-date-wrapper">
            <span
              className="transaction-date"
              aria-label={`Date: ${formatDate(transaction.timestamp)}`}
            >
              {formatDate(transaction.timestamp)}
            </span>
            {transaction.location && (
              <span
                className="transaction-location"
                aria-label={`Location: ${transaction.location}`}
              >
                {transaction.location}
              </span>
            )}
          </div>
          <span
            className={`transaction-status ${transaction.status}`}
            aria-label={`Status: ${transaction.status}`}
            aria-live="polite"
          >
            {transaction.status}
          </span>
        </div>
      </div>
    </div>
  );
};
