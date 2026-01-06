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
import { Plus, Search, FileText, DollarSign } from 'lucide-react';
import { mockInvoices, mockJobs } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.jobNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  const totalIssued = mockInvoices.filter(inv => inv.status === 'issued').length;
  const totalPending = mockInvoices.filter(inv => inv.status === 'pending').length;
  const totalAmount = mockInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">계산서 발행</h1>
        <p className="text-gray-600">Job별 계산서를 생성하고 관리하세요</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">발행 완료</p>
              <p className="text-3xl font-bold text-gray-900">{totalIssued}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">미발행</p>
              <p className="text-3xl font-bold text-gray-900">{totalPending}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">총 금액</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <Card className="p-6 border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Job No, 서비스명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2" />
                계산서 생성
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>계산서 생성</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-job">Job No</Label>
                  <Select>
                    <SelectTrigger id="invoice-job">
                      <SelectValue placeholder="Job 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockJobs.map(job => (
                        <SelectItem key={job.id} value={job.jobNo}>
                          {job.jobNo} - {job.clientName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-name">서비스명</Label>
                  <Input id="service-name" placeholder="예: 해상운송 수입통관 서비스" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">공급가액</Label>
                    <Input id="amount" type="number" placeholder="1,500,000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vat">부가세 (10%)</Label>
                    <Input id="vat" type="number" placeholder="150,000" disabled className="bg-gray-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>합계 금액</Label>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-2xl font-bold text-blue-900">0원</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    취소
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateDialogOpen(false)}>
                    발행하기
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
              <TableHead className="font-semibold">서비스명</TableHead>
              <TableHead className="font-semibold text-right">공급가액</TableHead>
              <TableHead className="font-semibold text-right">부가세</TableHead>
              <TableHead className="font-semibold text-right">합계</TableHead>
              <TableHead className="font-semibold">발행 상태</TableHead>
              <TableHead className="font-semibold">발행일</TableHead>
              <TableHead className="font-semibold text-center">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-blue-600">{invoice.jobNo}</TableCell>
                <TableCell>{invoice.serviceName}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(invoice.amount)}</TableCell>
                <TableCell className="text-right text-gray-600">{formatCurrency(invoice.vat)}</TableCell>
                <TableCell className="text-right font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'issued' ? 'default' : 'secondary'}>
                    {invoice.status === 'issued' ? '발행됨' : '미발행'}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">
                  {invoice.issuedDate || '-'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="sm">
                      {invoice.status === 'issued' ? '다운로드' : '발행하기'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            계산서가 없습니다.
          </div>
        )}
      </Card>
    </div>
  );
}

import { FileCheck } from 'lucide-react';
