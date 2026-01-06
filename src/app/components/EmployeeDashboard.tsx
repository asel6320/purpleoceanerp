import { useState } from 'react';
import { User } from '../App';
import Sidebar from './Sidebar';
import DashboardMain from './DashboardMain';
import JobManagement from './JobManagement';
import JobDetail from './JobDetail';
import DocumentManagement from './DocumentManagement';
import ClientManagement from './ClientManagement';
import ChatPage from './ChatPage';
import InvoiceManagement from './InvoiceManagement';

interface EmployeeDashboardProps {
  user: User;
  onLogout: () => void;
}

export type EmployeeView = 'dashboard' | 'jobs' | 'job-detail' | 'documents' | 'clients' | 'chat' | 'invoices' | 'settings';

export default function EmployeeDashboard({ user, onLogout }: EmployeeDashboardProps) {
  const [currentView, setCurrentView] = useState<EmployeeView>('dashboard');
  const [selectedJobNo, setSelectedJobNo] = useState<string | null>(null);

  const handleViewJob = (jobNo: string) => {
    setSelectedJobNo(jobNo);
    setCurrentView('job-detail');
  };

  const handleBackToJobs = () => {
    setSelectedJobNo(null);
    setCurrentView('jobs');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onLogout={onLogout}
        userRole="employee"
      />
      
      <div className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <DashboardMain onViewJob={handleViewJob} />}
        {currentView === 'jobs' && <JobManagement onViewJob={handleViewJob} />}
        {currentView === 'job-detail' && selectedJobNo && (
          <JobDetail jobNo={selectedJobNo} onBack={handleBackToJobs} userRole="employee" />
        )}
        {currentView === 'documents' && <DocumentManagement />}
        {currentView === 'clients' && <ClientManagement />}
        {currentView === 'chat' && <ChatPage />}
        {currentView === 'invoices' && <InvoiceManagement />}
        {currentView === 'settings' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">설정</h1>
            <p className="text-gray-600">설정 페이지 (구현 예정)</p>
          </div>
        )}
      </div>
    </div>
  );
}
