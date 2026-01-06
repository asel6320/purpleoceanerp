import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, Clock, CircleCheck } from 'lucide-react';
import { mockJobs } from '../data/mockData';

interface ClientDashboardMainProps {
  onViewJob: (jobNo: string) => void;
}

export default function ClientDashboardMain({ onViewJob }: ClientDashboardMainProps) {
  // In real app, this would filter by client ID
  const clientJobs = mockJobs.filter(job => job.clientName === '(주)한국무역');
  const activeJobs = clientJobs.filter(job => job.status !== 'completed');
  const completedJobs = clientJobs.filter(job => job.status === 'completed');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">내 Job 현황을 확인하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">전체 Job</p>
              <p className="text-3xl font-bold text-gray-900">{clientJobs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">진행 중</p>
              <p className="text-3xl font-bold text-gray-900">{activeJobs.length}</p>
              <p className="text-xs text-blue-600 mt-1">처리 중</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">완료</p>
              <p className="text-3xl font-bold text-gray-900">{completedJobs.length}</p>
              <p className="text-xs text-green-600 mt-1">완료됨</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CircleCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Active Jobs */}
      <Card className="p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">진행 중인 Job</h2>
        <div className="space-y-3">
          {activeJobs.length > 0 ? (
            activeJobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => onViewJob(job.jobNo)}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{job.jobNo}</p>
                    <p className="text-sm text-gray-600">{job.productName}</p>
                  </div>
                  <Badge 
                    variant={job.priority === 'urgent' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {job.status === 'contract' && '계약'}
                    {job.status === 'shipping' && '선적'}
                    {job.status === 'customs' && '통관'}
                    {job.status === 'delivery' && '배송'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>국가: {job.country}</span>
                  <span>담당: {job.assignee}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">진행 중인 Job이 없습니다.</p>
          )}
        </div>
      </Card>

      {/* Completed Jobs */}
      <Card className="p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">완료된 Job</h2>
        <div className="space-y-3">
          {completedJobs.length > 0 ? (
            completedJobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => onViewJob(job.jobNo)}
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition-colors border border-green-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{job.jobNo}</p>
                    <p className="text-sm text-gray-600">{job.productName}</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-white">
                    완료
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>국가: {job.country}</span>
                  <span>생성일: {job.createdAt}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">완료된 Job이 없습니다.</p>
          )}
        </div>
      </Card>
    </div>
  );
}