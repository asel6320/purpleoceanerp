export type JobStatus = 'contract' | 'shipping' | 'customs' | 'delivery' | 'completed';
export type InvoiceStatus = 'issued' | 'pending';
export type JobPriority = 'normal' | 'urgent' | 'delayed';

export interface Job {
  id: string;
  jobNo: string;
  clientName: string;
  productName: string;
  country: string;
  status: JobStatus;
  assignee: string;
  createdAt: string;
  priority?: JobPriority;
}

export interface Document {
  id: string;
  jobNo: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
  size: string;
}

export interface ChatMessage {
  id: string;
  jobNo: string;
  sender: string;
  senderRole: 'employee' | 'client' | 'system';
  message: string;
  timestamp: string;
}

export interface Invoice {
  id: string;
  jobNo: string;
  serviceName: string;
  amount: number;
  vat: number;
  totalAmount: number;
  status: InvoiceStatus;
  issuedDate?: string;
}

export interface Client {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
}
