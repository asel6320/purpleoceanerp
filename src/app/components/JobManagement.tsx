import { useState } from 'react';
import { Button } from './ui/button';
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
import { Plus, Search } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface JobManagementProps {
  onViewJob: (jobNo: string) => void;
}

export default function JobManagement({ onViewJob }: JobManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredJobs = mockJobs.filter(job =>
    job.jobNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const getPriorityBadge = (priority?: string) => {
    if (priority === 'urgent') {
      return <Badge variant="destructive" className="text-xs">긴급</Badge>;
    }
    if (priority === 'delayed') {
      return <Badge variant="destructive" className="text-xs bg-orange-500">지연</Badge>;
    }
    return null;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job 관리</h1>
        <p className="text-gray-600">전체 Job을 관리하고 추적하세요</p>
      </div>

      {/* Actions */}
      <Card className="p-6 border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Job No, 고객사, 품목으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2" />
                새 Job 생성
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>새 Job 생성</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">고객사</Label>
                    <Select>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="고객사 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">(주)한국무역</SelectItem>
                        <SelectItem value="2">글로벌테크</SelectItem>
                        <SelectItem value="3">대한상사</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">국가</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="국가 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="china">중국</SelectItem>
                        <SelectItem value="vietnam">베트남</SelectItem>
                        <SelectItem value="japan">일본</SelectItem>
                        <SelectItem value="usa">미국</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">품목명</Label>
                  <Input id="product" placeholder="품목명을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">담당 직원</Label>
                  <Select>
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="담당 직원 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kim">김철수</SelectItem>
                      <SelectItem value="lee">이영희</SelectItem>
                      <SelectItem value="park">박민수</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    취소
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateDialogOpen(false)}>
                    생성하기
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      {/* Table */}
      <Card className="border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Job No</TableHead>
              <TableHead className="font-semibold">고객사</TableHead>
              <TableHead className="font-semibold">품목</TableHead>
              <TableHead className="font-semibold">국가</TableHead>
              <TableHead className="font-semibold">진행 단계</TableHead>
              <TableHead className="font-semibold">담당 직원</TableHead>
              <TableHead className="font-semibold">생성일</TableHead>
              <TableHead className="font-semibold">상태</TableHead>
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
                <TableCell>{job.clientName}</TableCell>
                <TableCell>{job.productName}</TableCell>
                <TableCell>{job.country}</TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell>{job.assignee}</TableCell>
                <TableCell className="text-gray-600">{job.createdAt}</TableCell>
                <TableCell>{getPriorityBadge(job.priority)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </Card>
    </div>
  );
}
