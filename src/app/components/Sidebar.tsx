import { LayoutDashboard, Briefcase, FileText, Users, MessageSquare, FileCheck, Settings, LogOut } from 'lucide-react';
import { EmployeeView } from './EmployeeDashboard';
import { ClientView } from './ClientDashboard';

interface SidebarProps {
  currentView: EmployeeView | ClientView;
  onViewChange: (view: any) => void;
  onLogout: () => void;
  userRole: 'employee' | 'client';
}

export default function Sidebar({ currentView, onViewChange, onLogout, userRole }: SidebarProps) {
  const employeeMenuItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'jobs', label: 'Job 관리', icon: Briefcase },
    { id: 'documents', label: '문서 관리', icon: FileText },
    { id: 'clients', label: '거래처 관리', icon: Users },
    { id: 'chat', label: '채팅', icon: MessageSquare },
    { id: 'invoices', label: '계산서 발행', icon: FileCheck },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  const clientMenuItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'jobs', label: '내 Job 현황', icon: Briefcase },
    { id: 'chat', label: '채팅', icon: MessageSquare },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  const menuItems = userRole === 'employee' ? employeeMenuItems : clientMenuItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Purple Ocean</h2>
            <p className="text-xs text-gray-500">International</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">로그아웃</span>
        </button>
      </div>
    </div>
  );
}
