import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ArrowLeft, Check, MessageSquare } from 'lucide-react';
import { mockJobs, mockDocuments, mockChatMessages } from '../data/mockData';
import { JobStatus } from '../types';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface JobDetailProps {
  jobNo: string;
  onBack: () => void;
  userRole: 'employee' | 'client';
}

export default function JobDetail({ jobNo, onBack, userRole }: JobDetailProps) {
  const job = mockJobs.find(j => j.jobNo === jobNo);
  const documents = mockDocuments.filter(d => d.jobNo === jobNo);
  const messages = mockChatMessages.filter(m => m.jobNo === jobNo);

  const [currentStatus, setCurrentStatus] = useState<JobStatus>(job?.status || 'contract');
  const [autoNotify, setAutoNotify] = useState(true);

  if (!job) {
    return (
      <div className="p-8">
        <p>Job을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const milestones: { id: JobStatus; label: string }[] = [
    { id: 'contract', label: '계약' },
    { id: 'shipping', label: '선적' },
    { id: 'customs', label: '통관' },
    { id: 'delivery', label: '배송' },
    { id: 'completed', label: '완료' },
  ];

  const getStepStatus = (stepId: JobStatus) => {
    const currentIndex = milestones.findIndex(m => m.id === currentStatus);
    const stepIndex = milestones.findIndex(m => m.id === stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const handleStatusChange = (newStatus: JobStatus) => {
    if (userRole === 'employee') {
      setCurrentStatus(newStatus);
      // In real app, this would trigger an API call and notification
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.jobNo}</h1>
            <p className="text-gray-600">{job.clientName} · {job.productName}</p>
          </div>
          <Badge variant={job.priority === 'urgent' ? 'destructive' : 'secondary'}>
            {job.priority === 'urgent' ? '긴급' : '일반'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Info */}
          <Card className="p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">기본 정보</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">고객사</p>
                <p className="font-medium text-gray-900">{job.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">품목</p>
                <p className="font-medium text-gray-900">{job.productName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">국가</p>
                <p className="font-medium text-gray-900">{job.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">담당 직원</p>
                <p className="font-medium text-gray-900">{job.assignee}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">생성일</p>
                <p className="font-medium text-gray-900">{job.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">현재 상태</p>
                <p className="font-medium text-gray-900">
                  {milestones.find(m => m.id === currentStatus)?.label}
                </p>
              </div>
            </div>
          </Card>

          {/* Milestone Timeline */}
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">진행 단계</h2>
              {userRole === 'employee' && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-notify"
                    checked={autoNotify}
                    onCheckedChange={setAutoNotify}
                  />
                  <Label htmlFor="auto-notify" className="text-sm text-gray-600 cursor-pointer">
                    고객 자동 알림
                  </Label>
                </div>
              )}
            </div>

            <div className="relative">
              {milestones.map((milestone, index) => {
                const status = getStepStatus(milestone.id);
                const isCompleted = status === 'completed';
                const isCurrent = status === 'current';
                
                return (
                  <div key={milestone.id} className="relative">
                    {index > 0 && (
                      <div 
                        className={`absolute left-5 -top-6 w-0.5 h-6 ${
                          isCompleted || isCurrent ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    )}
                    
                    <div 
                      className={`flex items-center space-x-4 p-4 rounded-lg mb-2 transition-all ${
                        userRole === 'employee' ? 'cursor-pointer hover:bg-gray-50' : ''
                      } ${isCurrent ? 'bg-blue-50 border-2 border-blue-200' : 'border-2 border-transparent'}`}
                      onClick={() => userRole === 'employee' && handleStatusChange(milestone.id)}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted 
                            ? 'bg-blue-600 text-white' 
                            : isCurrent 
                            ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>
                          {milestone.label}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-blue-600 mt-0.5">현재 진행 중</p>
                        )}
                      </div>
                      {isCurrent && userRole === 'employee' && (
                        <Badge variant="default" className="bg-blue-600">진행 중</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {userRole === 'employee' && (
              <p className="text-xs text-gray-500 mt-4 px-4">
                * 단계를 클릭하여 상태를 변경할 수 있습니다
              </p>
            )}
          </Card>

          {/* Documents */}
          <Card className="p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">첨부 문서</h2>
            {documents.length > 0 ? (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.fileName}</p>
                        <p className="text-xs text-gray-500">{doc.size} · {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">다운로드</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">첨부된 문서가 없습니다.</p>
            )}
          </Card>
        </div>

        {/* Sidebar - Chat */}
        <div className="lg:col-span-1">
          <Card className="p-6 border border-gray-200 sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">채팅</h2>
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.senderRole === 'system' 
                      ? 'bg-gray-100 text-center' 
                      : msg.senderRole === 'employee'
                      ? 'bg-blue-50'
                      : 'bg-green-50'
                  }`}
                >
                  {msg.senderRole !== 'system' && (
                    <p className="text-xs font-semibold text-gray-900 mb-1">{msg.sender}</p>
                  )}
                  <p className="text-sm text-gray-700">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="메시지를 입력하세요..."
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                전송
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Missing import
import { FileText } from 'lucide-react';
