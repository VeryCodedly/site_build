
declare module '@paystack/inline-js' {
  export interface PaystackTransactionOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref?: string;
    metadata?: Record<string, unknown>;
    first_name?: string;
    last_name?: string;
    phone?: string;
    onSuccess?: (transaction: PaystackTransactionSuccess) => void;
    onCancel?: () => void;
    onError?: (error: PaystackError) => void;
  }

  export interface PaystackTransactionSuccess {
    reference: string;
    status: string;
    transaction: string;
    trxref: string;
    message?: string;
  }

  export interface PaystackError {
    message: string;
    status?: string;
  }

  export default class PaystackPop {
    newTransaction(options: PaystackTransactionOptions): void;
    resumeTransaction(options: { ref: string }): void;
  }
}