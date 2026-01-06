import { useState } from 'react';
import { User } from '../App';
import Sidebar from './Sidebar';
import ClientDashboardMain from './ClientDashboardMain';
import ClientJobList from './ClientJobList';
import JobDetail from './JobDetail';
import ChatPage from './ChatPage';

interface ClientDashboardProps {
  user: User;
  onLogout: () => void;
}

export type ClientView = 'dashboard' | 'jobs' | 'job-detail' | 'chat' | 'settings';

export default function ClientDashboard({ user, onLogout }: ClientDashboardProps) {
  const [currentView, setCurrentView] = useState<ClientView>('dashboard');
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
        userRole="client"
      />
      
      <div className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <ClientDashboardMain onViewJob={handleViewJob} />}
        {currentView === 'jobs' && <ClientJobList onViewJob={handleViewJob} />}
        {currentView === 'job-detail' && selectedJobNo && (
          <JobDetail jobNo={selectedJobNo} onBack={handleBackToJobs} userRole="client" />
        )}
        {currentView === 'chat' && <ChatPage />}
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
