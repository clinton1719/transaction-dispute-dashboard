export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
  merchantCategory: string;
  paymentMethod: string;
  referenceNumber: string;
  accountId: string;
  initiatedBy: string;
  otpVerified: string;
  location: string;
  fraudCheckPassed: string;
}
