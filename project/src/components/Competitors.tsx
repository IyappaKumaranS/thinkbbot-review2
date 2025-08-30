// // import React from 'react';
// // import { ExternalLink, Building2 } from 'lucide-react';

// // interface Competitor {
// //   name: string;
// //   description: string;
// //   website: string;
// //   category: string;
// //   similarity: number;
// // }

// // interface CompetitorsProps {
// //   competitors: Competitor[] | null;
// //   isVisible: boolean;
// // }

// // const Competitors: React.FC<CompetitorsProps> = ({ competitors, isVisible }) => {
// //   if (!competitors || !isVisible) {
// //     return (
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //         <h2 className="text-xl font-semibold text-gray-900 mb-4">Competitor Analysis</h2>
// //         <div className="text-center py-8">
// //           <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
// //           <p className="text-gray-500">Competitor analysis will appear here</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const getSimilarityColor = (similarity: number) => {
// //     if (similarity >= 80) return 'text-red-600 bg-red-50';
// //     if (similarity >= 60) return 'text-orange-600 bg-orange-50';
// //     if (similarity >= 40) return 'text-yellow-600 bg-yellow-50';
// //     return 'text-green-600 bg-green-50';
// //   };

// //   const getSimilarityLabel = (similarity: number) => {
// //     if (similarity >= 80) return 'Very Similar';
// //     if (similarity >= 60) return 'Similar';
// //     if (similarity >= 40) return 'Somewhat Similar';
// //     return 'Different';
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //       <div className="flex items-center space-x-2 mb-6">
// //         <Building2 className="w-6 h-6 text-blue-600" />
// //         <h2 className="text-xl font-semibold text-gray-900">Competitor Analysis</h2>
// //       </div>
      
// //       <div className="space-y-4">
// //         {competitors.map((competitor, index) => (
// //           <div
// //             key={index}
// //             className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
// //           >
// //             <div className="flex items-start justify-between mb-2">
// //               <div className="flex-1">
// //                 <div className="flex items-center space-x-2 mb-1">
// //                   <h3 className="font-medium text-gray-900">{competitor.name}</h3>
// //                   <a
// //                     href={competitor.website}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="text-blue-600 hover:text-blue-800"
// //                   >
// //                     <ExternalLink className="w-4 h-4" />
// //                   </a>
// //                 </div>
// //                 <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-2">
// //                   {competitor.category}
// //                 </span>
// //                 <p className="text-sm text-gray-600 leading-relaxed mb-3">
// //                   {competitor.description}
// //                 </p>
// //               </div>
// //             </div>
            
// //             <div className="flex items-center justify-between">
// //               <span className="text-sm text-gray-600">Similarity to your idea:</span>
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-24 bg-gray-200 rounded-full h-2">
// //                   <div
// //                     className="h-2 rounded-full bg-gradient-to-r from-green-400 to-red-400"
// //                     style={{ width: `${competitor.similarity}%` }}
// //                   ></div>
// //                 </div>
// //                 <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSimilarityColor(competitor.similarity)}`}>
// //                   {competitor.similarity}% - {getSimilarityLabel(competitor.similarity)}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
      
// //       <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-lg">
// //         <div className="flex items-center space-x-2 mb-2">
// //           <span className="text-blue-600 text-lg">🎯</span>
// //           <h4 className="font-medium text-blue-900">Market Insight</h4>
// //         </div>
// //         <p className="text-blue-800 text-sm">
// //           Analyze these competitors to identify gaps in the market and opportunities for differentiation.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Competitors;


import React from 'react';
import { ExternalLink, Building2 } from 'lucide-react';

interface Competitor {
  name: string;
  description: string;
  website?: string;
  category?: string;
  similarity?: number;
}

interface CompetitorsProps {
  competitors: Competitor[];
  isVisible: boolean;
}

const Competitors: React.FC<CompetitorsProps> = ({ competitors, isVisible }) => {
  if (!isVisible || competitors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Competitor Analysis</h2>
        <div className="text-center py-8">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Competitor analysis will appear here</p>
        </div>
      </div>
    );
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'text-red-600 bg-red-50';
    if (similarity >= 60) return 'text-orange-600 bg-orange-50';
    if (similarity >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getSimilarityLabel = (similarity: number) => {
    if (similarity >= 80) return 'Very Similar';
    if (similarity >= 60) return 'Similar';
    if (similarity >= 40) return 'Somewhat Similar';
    return 'Different';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Building2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Competitor Analysis</h2>
      </div>

      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900">{competitor.name || 'Unknown Competitor'}</h3>
                  {competitor.website && (
                    <a
                      href={competitor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-2">
                  {competitor.category || 'Uncategorized'}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {competitor.description || 'No description provided.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Similarity to your idea:</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-red-400"
                    style={{ width: `${competitor.similarity || 0}%` }}
                  />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSimilarityColor(competitor.similarity || 0)}`}>
                  {competitor.similarity || 0}% - {getSimilarityLabel(competitor.similarity || 0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-blue-600 text-lg">🎯</span>
          <h4 className="font-medium text-blue-900">Market Insight</h4>
        </div>
        <p className="text-blue-800 text-sm">
          Analyze these competitors to identify gaps in the market and opportunities for differentiation.
        </p>
      </div>
    </div>
  );
};

export default Competitors;

