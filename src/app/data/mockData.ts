import { Job, Document, ChatMessage, Invoice, Client } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    jobNo: 'POI-2025-001',
    clientName: '(주)한국무역',
    productName: '전자부품 (반도체)',
    country: '중국',
    status: 'shipping',
    assignee: '김철수',
    createdAt: '2025-01-02',
    priority: 'urgent'
  },
  {
    id: '2',
    jobNo: 'POI-2025-002',
    clientName: '글로벌테크',
    productName: '자동차부품',
    country: '베트남',
    status: 'customs',
    assignee: '이영희',
    createdAt: '2025-01-03',
    priority: 'normal'
  },
  {
    id: '3',
    jobNo: 'POI-2025-003',
    clientName: '대한상사',
    productName: '섬유원단',
    country: '인도',
    status: 'contract',
    assignee: '박민수',
    createdAt: '2025-01-04',
    priority: 'normal'
  },
  {
    id: '4',
    jobNo: 'POI-2025-004',
    clientName: '서울무역',
    productName: '화장품',
    country: '일본',
    status: 'delivery',
    assignee: '김철수',
    createdAt: '2025-01-05',
    priority: 'normal'
  },
  {
    id: '5',
    jobNo: 'POI-2024-157',
    clientName: '인천물류',
    productName: '기계설비',
    country: '미국',
    status: 'completed',
    assignee: '이영희',
    createdAt: '2024-12-28',
    priority: 'normal'
  },
  {
    id: '6',
    jobNo: 'POI-2024-158',
    clientName: '(주)한국무역',
    productName: '식품',
    country: '태국',
    status: 'completed',
    assignee: '박민수',
    createdAt: '2024-12-29',
    priority: 'normal'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    jobNo: 'POI-2025-001',
    fileName: 'POI-2025-001_Invoice.pdf',
    fileType: 'PDF',
    uploadedAt: '2025-01-02 14:30',
    uploadedBy: '김철수',
    size: '1.2MB'
  },
  {
    id: '2',
    jobNo: 'POI-2025-001',
    fileName: 'POI-2025-001_BL.pdf',
    fileType: 'PDF',
    uploadedAt: '2025-01-03 09:15',
    uploadedBy: '김철수',
    size: '856KB'
  },
  {
    id: '3',
    jobNo: 'POI-2025-002',
    fileName: 'POI-2025-002_PackingList.xlsx',
    fileType: 'Excel',
    uploadedAt: '2025-01-03 11:20',
    uploadedBy: '이영희',
    size: '245KB'
  },
  {
    id: '4',
    jobNo: 'POI-2025-003',
    fileName: 'POI-2025-003_Contract.pdf',
    fileType: 'PDF',
    uploadedAt: '2025-01-04 16:45',
    uploadedBy: '박민수',
    size: '2.1MB'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    jobNo: 'POI-2025-001',
    sender: 'System',
    senderRole: 'system',
    message: 'Job이 생성되었습니다.',
    timestamp: '2025-01-02 14:00'
  },
  {
    id: '2',
    jobNo: 'POI-2025-001',
    sender: '김철수',
    senderRole: 'employee',
    message: '안녕하세요, 선적 일정이 확정되었습니다.',
    timestamp: '2025-01-03 10:30'
  },
  {
    id: '3',
    jobNo: 'POI-2025-001',
    sender: '박영희',
    senderRole: 'client',
    message: '확인했습니다. 감사합니다.',
    timestamp: '2025-01-03 11:15'
  },
  {
    id: '4',
    jobNo: 'POI-2025-001',
    sender: 'System',
    senderRole: 'system',
    message: '선적 단계로 이동했습니다.',
    timestamp: '2025-01-03 15:00'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    jobNo: 'POI-2025-001',
    serviceName: '해상운송 수입통관 서비스',
    amount: 1500000,
    vat: 150000,
    totalAmount: 1650000,
    status: 'issued',
    issuedDate: '2025-01-02'
  },
  {
    id: '2',
    jobNo: 'POI-2025-002',
    serviceName: '항공운송 수출통관 서비스',
    amount: 2000000,
    vat: 200000,
    totalAmount: 2200000,
    status: 'pending'
  },
  {
    id: '3',
    jobNo: 'POI-2025-004',
    serviceName: '복합운송 서비스',
    amount: 3500000,
    vat: 350000,
    totalAmount: 3850000,
    status: 'issued',
    issuedDate: '2025-01-05'
  }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: '박영희',
    companyName: '(주)한국무역',
    email: 'yhpark@hktrade.com',
    phone: '02-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    registrationDate: '2024-03-15'
  },
  {
    id: '2',
    name: '정민호',
    companyName: '글로벌테크',
    email: 'mhjeong@globaltech.co.kr',
    phone: '031-987-6543',
    address: '경기도 성남시 분당구 판교로 456',
    registrationDate: '2024-05-20'
  },
  {
    id: '3',
    name: '최수진',
    companyName: '대한상사',
    email: 'sjchoi@daehan.com',
    phone: '051-555-7890',
    address: '부산시 해운대구 센텀중앙로 789',
    registrationDate: '2024-07-10'
  }
];
