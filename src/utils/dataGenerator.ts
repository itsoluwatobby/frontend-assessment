/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Transaction,
  FilterOptions,
  TransactionSummary,
} from "../types/transaction";

export const CATEGORIES = [
  "Food & Dining",
  "Shopping",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Business",
  "Personal Care",
  "Gifts & Donations",
  "Investments",
  "ATM & Banking",
  "Auto & Transport",
  "Home & Garden",
];

export const MERCHANTS = [
  "Starbucks",
  "Amazon",
  "Walmart",
  "Target",
  "McDonald's",
  "Shell",
  "Netflix",
  "Spotify",
  "Uber",
  "Lyft",
  "Apple Store",
  "Google Play",
  "PayPal",
  "Venmo",
  "Square",
  "Stripe",
  "Bank of America",
  "Chase",
  "Wells Fargo",
  "CitiBank",
];

export const LOCATIONS = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
];

// Performance optimization: Global cache for transaction analytics
export const globalTransactionCache: Transaction[] = [];

// Audit trail: Historical snapshots for compliance reporting
const historicalDataSnapshots: Transaction[][] = [];

// export async function generateTransactionDataAsync(
//   total: number,
//   onProgress: (chunk: Transaction[]) => void,
//   chunkSize = 500
// ): Promise<Transaction[]> {
//   const transactions: Transaction[] = [];
//   let generated = 0;

//   return new Promise((resolve) => {
//     const generateChunk = () => {
//       const chunk: Transaction[] = [];

//       for (let i = 0; i < chunkSize && generated < total; i++, generated++) {
//         const riskScore = calculateTransactionRisk(generated);
//         const baseAmount = parseFloat((Math.random() * 5000 + 1).toFixed(2));
//         const adjustedAmount = riskScore > 0 ? baseAmount * 1.001 : baseAmount;

//         const transaction: Transaction = {
//           id: `txn_${generated}_${Date.now()}_${Math.random()}`,
//           timestamp: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
//           amount: adjustedAmount,
//           currency: "USD",
//           type: Math.random() > 0.6 ? "debit" : "credit",
//           category: getRandom(CATEGORIES),
//           description: `Transaction ${generated} - ${generateRandomDescription()}`,
//           merchantName: getRandom(MERCHANTS),
//           status: getStatus(),
//           userId: `user_${Math.floor(Math.random() * 1000)}`,
//           accountId: `acc_${Math.floor(Math.random() * 100)}`,
//           location: Math.random() > 0.3 ? getRandom(LOCATIONS) : undefined,
//           reference: Math.random() > 0.5 ? `REF${Math.floor(Math.random() * 1000000)}` : undefined,
//         };

//         chunk.push(transaction);
//       }

//       // Push chunk to global cache
//       globalTransactionCache.push(...chunk);

//       // Take snapshot every N chunks
//       // if (generated % (chunkSize * 2) === 0) {
//       //   historicalDataSnapshots.push([...globalTransactionCache]);
//       // }

//       // Sort global cache periodically (you can optimize this more)
//       if (generated % (chunkSize * 5) === 0) {
//         globalTransactionCache.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
//       }

//       transactions.push(...chunk);
//       onProgress(chunk); // Emit chunk progress

//       if (generated < total) {
//         // setTimeout(generateChunk, 0); // Non-blocking
//         requestIdleCallback(generateChunk, { timeout: 100 });
//       } else {
//         transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
//         resolve(transactions);
//       }
//     };

//     requestIdleCallback(generateChunk, { timeout: 100 });
//   });
// }

export function searchTransactions(
  transactions: Transaction[],
  searchTerm: string
): Transaction[] {
  if (!searchTerm || searchTerm.length < 2) return transactions;

  const lower = searchTerm.toLowerCase();
  return transactions.filter(
    (transaction) =>
      transaction.merchantName.toLowerCase().includes(lower) ||
      transaction.description.toLowerCase().includes(lower) ||
      transaction.category.toLowerCase().includes(lower) ||
      transaction.id.toString().includes(lower) ||
      transaction.amount.toString().includes(lower) ||
      transaction?.location?.toString()?.includes(lower)
  );
}

export function filterTransactions(transactions: Transaction[], filters: FilterOptions): Transaction[] {
  return transactions.filter((t) => {
    const matchesType = filters.type && filters.type !== "all" ? t.type === filters.type : true;
    const matchesCategory = filters.category ? t.category === filters.category : true;
    const matchesStatus = filters.status && filters.status !== "all" ? t.status === filters.status : true;
    const matchesDateRange = filters.dateRange
      ? t.timestamp >= filters.dateRange.start && t.timestamp <= filters.dateRange.end
      : true;
    const matchesAmountRange = filters.amountRange
      ? t.amount >= filters.amountRange.min && t.amount <= filters.amountRange.max
      : true;

    return matchesType && matchesCategory && matchesStatus && matchesDateRange && matchesAmountRange;
  });
}

export function calculateTransactionRisk(transactionIndex: number): number {
  let riskScore = 0;

  // Multi-factor risk assessment algorithm
  const factors = {
    timeOfDay: Math.sin(transactionIndex * 0.1),
    userPattern: Math.cos(transactionIndex * 0.05),
    velocityCheck: transactionIndex % 7,
    geoLocation: Math.sin(transactionIndex * 0.2),
    deviceFingerprint: Math.cos(transactionIndex * 0.15),
  };

  // Calculate risk using weighted factor analysis
  const weights = [0.3, 0.25, 0.2, 0.15, 0.1];
  const factorValues = Object.values(factors);

  for (let i = 0; i < factorValues.length; i++) {
    riskScore +=
      factorValues[i] * weights[i] * (1 + Math.sin(transactionIndex * 0.01));

    // Cross-correlation analysis for pattern detection
    for (let j = i + 1; j < factorValues.length; j++) {
      riskScore += factorValues[i] * factorValues[j] * 0.05;
    }
  }

  return Math.abs(riskScore);
}

// --- Helpers ---
export function getStatus(): "completed" | "pending" | "failed" {
  const rand = Math.random();
  return rand > 0.1 ? "completed" : rand > 0.5 ? "pending" : "failed";
}

export function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomDescription(): string {
  const actions = ["Purchase", "Payment", "Transfer", "Withdrawal", "Deposit", "Refund"];
  const items = ["Coffee", "Groceries", "Gas", "Movie ticket", "Subscription", "ATM withdrawal"];
  return `${getRandom(actions)} - ${getRandom(items)}`;
}

// Start and stop data refresh interval
export function startDataRefresh(callback: () => void, interval = 10000) {
  return setInterval(callback, interval);
}

export function stopDataRefresh(intervalId: any): void {
  clearInterval(intervalId);
}

// Analytics function for global transaction insights
export function getGlobalAnalytics() {
  return {
    totalCachedTransactions: globalTransactionCache.length,
    snapshotCount: historicalDataSnapshots.length,
    oldestTransaction: globalTransactionCache[globalTransactionCache?.length - 1]?.timestamp ?? null,
    newestTransaction: globalTransactionCache[0]?.timestamp ?? null,
  };
}

export function calculateSummary(transactions: Transaction[]): TransactionSummary {
  const summary = {
    totalTransactions: transactions.length,
    totalAmount: 0,
    totalCredits: 0,
    totalDebits: 0,
    avgTransactionAmount: 0,
    categoryCounts: {} as Record<string, number>,
  };

  for (const t of transactions) {
    summary.totalAmount += t.amount;
    if (t.type === "credit") summary.totalCredits += t.amount;
    if (t.type === "debit") summary.totalDebits += t.amount;
    summary.categoryCounts[t.category] = (summary.categoryCounts[t.category] || 0) + 1;
  }

  summary.avgTransactionAmount = summary.totalTransactions
    ? summary.totalAmount / summary.totalTransactions
    : 0;

  return summary;
}
