import React from 'react';
import { History, FileText, Calendar } from 'lucide-react';

interface ValidationHistory {
  id: string;
  title: string;
  date: string;
  averageScore: number;
  type: string;
}

interface SidebarProps {
  history: ValidationHistory[];
  onSelectHistory: (item: ValidationHistory) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ history, onSelectHistory }) => {
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <History className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Validation History</h2>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No validations yet</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
            >
              <h3 className="font-medium text-gray-900 text-sm mb-2 truncate">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {item.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.averageScore >= 70
                        ? 'bg-green-500'
                        : item.averageScore >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${item.averageScore}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {item.averageScore}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;