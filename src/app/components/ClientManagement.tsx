import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Plus, Search, Mail, Phone } from 'lucide-react';
import { mockClients } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';

export default function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">거래처 관리</h1>
        <p className="text-gray-600">고객사 정보를 관리하세요</p>
      </div>

      {/* Actions */}
      <Card className="p-6 border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="업체명, 담당자, 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2" />
                거래처 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>거래처 추가</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">업체명</Label>
                    <Input id="company-name" placeholder="(주)한국무역" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">담당자명</Label>
                    <Input id="contact-name" placeholder="홍길동" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="contact@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input id="phone" placeholder="02-1234-5678" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">주소</Label>
                  <Input id="address" placeholder="서울시 강남구..." />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    취소
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddDialogOpen(false)}>
                    추가하기
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">전체 거래처</p>
          <p className="text-2xl font-bold text-gray-900">{mockClients.length}</p>
        </Card>
        <Card className="p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">이번 달 신규</p>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </Card>
        <Card className="p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">활성 거래처</p>
          <p className="text-2xl font-bold text-gray-900">{mockClients.length}</p>
        </Card>
      </div>

      {/* Table */}
      <Card className="border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">업체명</TableHead>
              <TableHead className="font-semibold">담당자</TableHead>
              <TableHead className="font-semibold">연락처</TableHead>
              <TableHead className="font-semibold">주소</TableHead>
              <TableHead className="font-semibold">등록일</TableHead>
              <TableHead className="font-semibold text-center">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{client.companyName}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{client.address}</TableCell>
                <TableCell className="text-gray-600">{client.registrationDate}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="sm">수정</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredClients.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </Card>
    </div>
  );
}
