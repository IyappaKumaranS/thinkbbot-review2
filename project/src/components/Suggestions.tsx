// import React from 'react';
// import { Lightbulb, ArrowRight } from 'lucide-react';

// interface Suggestion {
//   category: string;
//   tip: string;
//   priority: 'high' | 'medium' | 'low';
// }

// interface SuggestionsProps {
//   suggestions: Suggestion[] | null;
//   isVisible: boolean;
// }

// const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, isVisible }) => {
//   if (!suggestions || !isVisible) {
//     return (
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Suggestions & Tips</h2>
//         <div className="text-center py-8">
//           <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//           <p className="text-gray-500">AI-generated improvement tips will appear here</p>
//         </div>
//       </div>
//     );
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-800 border-red-200';
//       case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'low': return 'bg-green-100 text-green-800 border-green-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getPriorityIcon = (priority: string) => {
//     switch (priority) {
//       case 'high': return '🔴';
//       case 'medium': return '🟡';
//       case 'low': return '🟢';
//       default: return '⚪';
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center space-x-2 mb-6">
//         <Lightbulb className="w-6 h-6 text-yellow-500" />
//         <h2 className="text-xl font-semibold text-gray-900">AI Suggestions & Tips</h2>
//       </div>
      
//       <div className="space-y-4">
//         {suggestions.map((suggestion, index) => (
//           <div
//             key={index}
//             className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:shadow-md transition-all duration-200"
//           >
//             <div className="flex items-start justify-between mb-2">
//               <h3 className="font-medium text-gray-900 flex items-center space-x-2">
//                 <span>{suggestion.category}</span>
//               </h3>
//               <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getPriorityColor(suggestion.priority)}`}>
//                 {getPriorityIcon(suggestion.priority)} {suggestion.priority.toUpperCase()}
//               </span>
//             </div>
//             <p className="text-gray-700 leading-relaxed">{suggestion.tip}</p>
//             <div className="flex items-center space-x-1 mt-3 text-blue-600 text-sm font-medium">
//               <ArrowRight className="w-4 h-4" />
//               <span>Implement this suggestion</span>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg">
//         <div className="flex items-center space-x-2 mb-2">
//           <span className="text-purple-600 text-lg">💡</span>
//           <h4 className="font-medium text-purple-900">Pro Tip</h4>
//         </div>
//         <p className="text-purple-800 text-sm">
//           Focus on high-priority suggestions first for maximum impact on your idea's validation scores.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Suggestions;


import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface Suggestion {
  category?: string;
  tip?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface SuggestionsProps {
  suggestions: Suggestion[] | null;
  isVisible: boolean;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '⚪';
  }
};

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, isVisible }) => {
  if (!isVisible || !suggestions || suggestions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Suggestions & Tips</h2>
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-label="Lightbulb Icon" />
          <p className="text-gray-500">AI-generated improvement tips will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" aria-label="Lightbulb Icon" />
        <h2 className="text-xl font-semibold text-gray-900">AI Suggestions & Tips</h2>
      </div>

      <div className="space-y-4">
        {suggestions.map(({ category = 'General', tip = 'No tip provided.', priority = 'low' }, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                <span>{category}</span>
              </h3>
              <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getPriorityColor(priority)}`}>
                {getPriorityIcon(priority)} {priority.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{tip}</p>
            <div className="flex items-center space-x-1 mt-3 text-blue-600 text-sm font-medium">
              <ArrowRight className="w-4 h-4" aria-label="Arrow Icon" />
              <span>Implement this suggestion</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-purple-600 text-lg">💡</span>
          <h4 className="font-medium text-purple-900">Pro Tip</h4>
        </div>
        <p className="text-purple-800 text-sm">
          Focus on high-priority suggestions first for maximum impact on your idea's validation scores.
        </p>
      </div>
    </div>
  );
};

export default Suggestions;

