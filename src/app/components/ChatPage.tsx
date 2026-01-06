import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Send } from 'lucide-react';
import { mockJobs, mockChatMessages } from '../data/mockData';

export default function ChatPage() {
  const [selectedJobNo, setSelectedJobNo] = useState<string | null>(mockJobs[0]?.jobNo || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const filteredJobs = mockJobs.filter(job =>
    job.jobNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMessages = mockChatMessages.filter(msg => msg.jobNo === selectedJobNo);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In real app, this would send the message
      setMessageInput('');
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">채팅</h1>
        <p className="text-gray-600">고객과 실시간으로 소통하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-5rem)]">
        {/* Job List */}
        <Card className="lg:col-span-1 p-4 border border-gray-200 overflow-hidden flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Job 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJobNo(job.jobNo)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedJobNo === job.jobNo
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-900">{job.jobNo}</p>
                  <Badge variant="secondary" className="text-xs">
                    {job.status === 'contract' && '계약'}
                    {job.status === 'shipping' && '선적'}
                    {job.status === 'customs' && '통관'}
                    {job.status === 'delivery' && '배송'}
                    {job.status === 'completed' && '완료'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{job.clientName}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 border border-gray-200 flex flex-col overflow-hidden">
          {selectedJobNo ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedJobNo}</h2>
                    <p className="text-sm text-gray-600">
                      {mockJobs.find(j => j.jobNo === selectedJobNo)?.clientName}
                    </p>
                  </div>
                  <Badge variant="default">
                    {mockJobs.find(j => j.jobNo === selectedJobNo)?.status === 'contract' && '계약'}
                    {mockJobs.find(j => j.jobNo === selectedJobNo)?.status === 'shipping' && '선적'}
                    {mockJobs.find(j => j.jobNo === selectedJobNo)?.status === 'customs' && '통관'}
                    {mockJobs.find(j => j.jobNo === selectedJobNo)?.status === 'delivery' && '배송'}
                    {mockJobs.find(j => j.jobNo === selectedJobNo)?.status === 'completed' && '완료'}
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {currentMessages.map((msg) => (
                  <div key={msg.id}>
                    {msg.senderRole === 'system' ? (
                      <div className="flex justify-center">
                        <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs">
                          {msg.message}
                        </div>
                      </div>
                    ) : (
                      <div className={`flex ${msg.senderRole === 'employee' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md ${msg.senderRole === 'employee' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'} rounded-lg p-4 shadow-sm`}>
                          <p className="text-xs font-semibold mb-1 opacity-80">{msg.sender}</p>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.senderRole === 'employee' ? 'text-blue-100' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-3">
                  <Input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Job을 선택하여 대화를 시작하세요</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
