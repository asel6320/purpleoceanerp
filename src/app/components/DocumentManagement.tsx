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
import { Upload, Download, Search, FileText, Eye } from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.jobNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (fileType: string) => {
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">문서 관리</h1>
        <p className="text-gray-600">Job별 문서를 업로드하고 관리하세요</p>
      </div>

      {/* Actions */}
      <Card className="p-6 border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="파일명, Job No로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                <Upload className="w-4 h-4 mr-2" />
                문서 업로드
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>문서 업로드</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="upload-job">Job No</Label>
                  <Select>
                    <SelectTrigger id="upload-job">
                      <SelectValue placeholder="Job 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">POI-2025-001</SelectItem>
                      <SelectItem value="2">POI-2025-002</SelectItem>
                      <SelectItem value="3">POI-2025-003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-type">문서 유형</Label>
                  <Select>
                    <SelectTrigger id="doc-type">
                      <SelectValue placeholder="문서 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="bl">Bill of Lading (BL)</SelectItem>
                      <SelectItem value="packing">Packing List</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-upload">파일 선택</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">클릭하여 파일 선택 또는 드래그 앤 드롭</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, Excel, Word 파일 (최대 10MB)</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    취소
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsUploadDialogOpen(false)}>
                    업로드
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-4 border border-blue-200 bg-blue-50 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">!</span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">자동 파일명 규칙</p>
            <p className="text-xs text-blue-700">
              업로드된 문서는 자동으로 <span className="font-mono bg-white px-1 rounded">JobNo_DocumentType.확장자</span> 형식으로 저장됩니다.
              <br />예: POI-2025-001_Invoice.pdf, POI-2025-002_BL.pdf
            </p>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">파일명</TableHead>
              <TableHead className="font-semibold">Job No</TableHead>
              <TableHead className="font-semibold">파일 유형</TableHead>
              <TableHead className="font-semibold">크기</TableHead>
              <TableHead className="font-semibold">업로드 일시</TableHead>
              <TableHead className="font-semibold">업로드자</TableHead>
              <TableHead className="font-semibold text-center">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.fileType)}
                    <span className="font-medium text-gray-900">{doc.fileName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-blue-600 font-medium">{doc.jobNo}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{doc.fileType}</Badge>
                </TableCell>
                <TableCell className="text-gray-600">{doc.size}</TableCell>
                <TableCell className="text-gray-600">{doc.uploadedAt}</TableCell>
                <TableCell className="text-gray-600">{doc.uploadedBy}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            문서가 없습니다.
          </div>
        )}
      </Card>
    </div>
  );
}
