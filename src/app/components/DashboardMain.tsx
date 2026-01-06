import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardMainProps {
  onViewJob: (jobNo: string) => void;
}

export default function DashboardMain({ onViewJob }: DashboardMainProps) {
  const activeJobs = mockJobs.filter(job => job.status !== 'completed');
  const customsJobs = mockJobs.filter(job => job.status === 'customs');
  const shippedJobs = mockJobs.filter(job => job.status === 'shipping' || job.status === 'delivery');
  const urgentJobs = mockJobs.filter(job => job.priority === 'urgent');

  // Monthly data for chart
  const monthlyData = [
    { month: '8월', jobs: 45 },
    { month: '9월', jobs: 52 },
    { month: '10월', jobs: 48 },
    { month: '11월', jobs: 61 },
    { month: '12월', jobs: 58 },
    { month: '1월', jobs: 38 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">오늘의 업무 현황을 확인하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">진행 중 Job</p>
              <p className="text-3xl font-bold text-gray-900">{activeJobs.length}</p>
              <p className="text-xs text-gray-500 mt-1">전체 {mockJobs.length}건</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">통관 진행 중</p>
              <p className="text-3xl font-bold text-gray-900">{customsJobs.length}</p>
              <p className="text-xs text-green-600 mt-1">정상 진행</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">선적 완료</p>
              <p className="text-3xl font-bold text-gray-900">{shippedJobs.length}</p>
              <p className="text-xs text-gray-500 mt-1">배송 중</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">긴급 처리</p>
              <p className="text-3xl font-bold text-gray-900">{urgentJobs.length}</p>
              <p className="text-xs text-orange-600 mt-1">주의 필요</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">월별 업무 현황</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Bar dataKey="jobs" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Jobs */}
        <Card className="p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 Job</h2>
          <div className="space-y-3">
            {activeJobs.slice(0, 5).map((job) => (
              <div 
                key={job.id}
                onClick={() => onViewJob(job.jobNo)}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">{job.jobNo}</p>
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
                <p className="text-xs text-gray-600 mb-1">{job.clientName}</p>
                <p className="text-xs text-gray-500">{job.productName}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
