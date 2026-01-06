import { useState } from 'react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Search } from 'lucide-react';
import { mockJobs } from '../data/mockData';

interface ClientJobListProps {
  onViewJob: (jobNo: string) => void;
}

export default function ClientJobList({ onViewJob }: ClientJobListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // In real app, this would filter by client ID
  const clientJobs = mockJobs.filter(job => job.clientName === '(주)한국무역');
  
  const filteredJobs = clientJobs.filter(job =>
    job.jobNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      contract: { label: '계약', variant: 'secondary' as const },
      shipping: { label: '선적', variant: 'default' as const },
      customs: { label: '통관', variant: 'default' as const },
      delivery: { label: '배송', variant: 'default' as const },
      completed: { label: '완료', variant: 'outline' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.contract;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">내 Job 현황</h1>
        <p className="text-gray-600">Job 목록을 확인하고 상세 정보를 조회하세요</p>
      </div>

      {/* Search */}
      <Card className="p-6 border border-gray-200 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Job No, 품목으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Info Notice */}
      <Card className="p-4 border border-blue-200 bg-blue-50 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">!</span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">고객 권한 안내</p>
            <p className="text-xs text-blue-700">
              고객님은 본인의 Job 현황만 조회할 수 있으며, 상태 변경은 담당 직원만 가능합니다.
              문의사항이 있으시면 채팅으로 담당자에게 연락해주세요.
            </p>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Job No</TableHead>
              <TableHead className="font-semibold">품목</TableHead>
              <TableHead className="font-semibold">국가</TableHead>
              <TableHead className="font-semibold">진행 단계</TableHead>
              <TableHead className="font-semibold">담당 직원</TableHead>
              <TableHead className="font-semibold">생성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow 
                key={job.id}
                onClick={() => onViewJob(job.jobNo)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="font-medium text-blue-600">{job.jobNo}</TableCell>
                <TableCell>{job.productName}</TableCell>
                <TableCell>{job.country}</TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell>{job.assignee}</TableCell>
                <TableCell className="text-gray-600">{job.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? '검색 결과가 없습니다.' : 'Job이 없습니다.'}
          </div>
        )}
      </Card>
    </div>
  );
}
