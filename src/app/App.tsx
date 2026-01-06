import { useState } from 'react';
import LoginPage from './components/LoginPage';
import EmployeeDashboard from './components/EmployeeDashboard';
import ClientDashboard from './components/ClientDashboard';

export type UserRole = 'employee' | 'client' | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentUser.role === 'employee') {
    return <EmployeeDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === 'client') {
    return <ClientDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return null;
}
