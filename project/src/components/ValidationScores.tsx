// // import React, { useEffect, useState } from 'react';
// // import { Lightbulb, Cog, TrendingUp, BarChart3, Target, Users } from 'lucide-react';

// // interface ValidationScore {
// //   category: string;
// //   score: number;
// //   explanation: string;
// //   icon: React.ReactNode;
// //   color: string;
// // }

// // interface ValidationScoresProps {
// //   scores: ValidationScore[] | null;
// //   isVisible: boolean;
// // }

// // const ValidationScores: React.FC<ValidationScoresProps> = ({ scores, isVisible }) => {
// //   const [animatedScores, setAnimatedScores] = useState<number[]>([]);

// //   useEffect(() => {
// //     if (scores && isVisible) {
// //       // Reset animated scores
// //       setAnimatedScores(new Array(scores.length).fill(0));
      
// //       // Animate scores with delay
// //       scores.forEach((_, index) => {
// //         setTimeout(() => {
// //           setAnimatedScores(prev => {
// //             const newScores = [...prev];
// //             newScores[index] = scores[index].score;
// //             return newScores;
// //           });
// //         }, index * 200 + 500);
// //       });
// //     }
// //   }, [scores, isVisible]);

// //   if (!scores || !isVisible) {
// //     return (
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //         <h2 className="text-xl font-semibold text-gray-900 mb-4">Validation Scores</h2>
// //         <div className="text-center py-8">
// //           <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
// //           <p className="text-gray-500">Upload a file to see validation scores</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const getScoreColor = (score: number) => {
// //     if (score >= 80) return 'text-green-600';
// //     if (score >= 60) return 'text-yellow-600';
// //     if (score >= 40) return 'text-orange-600';
// //     return 'text-red-600';
// //   };

// //   const getProgressColor = (score: number) => {
// //     if (score >= 80) return 'bg-green-500';
// //     if (score >= 60) return 'bg-yellow-500';
// //     if (score >= 40) return 'bg-orange-500';
// //     return 'bg-red-500';
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //       <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Scores</h2>
      
// //       <div className="space-y-6">
// //         {scores.map((item, index) => (
// //           <div key={item.category} className="group">
// //             <div className="flex items-center justify-between mb-2">
// //               <div className="flex items-center space-x-3">
// //                 <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
// //                   {item.icon}
// //                 </div>
// //                 <h3 className="font-medium text-gray-900">{item.category}</h3>
// //               </div>
// //               <span className={`text-2xl font-bold ${getScoreColor(animatedScores[index] || 0)}`}>
// //                 {animatedScores[index] || 0}%
// //               </span>
// //             </div>
            
// //             <div className="mb-3">
// //               <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
// //                 <div
// //                   className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor(animatedScores[index] || 0)}`}
// //                   style={{ 
// //                     width: `${animatedScores[index] || 0}%`,
// //                     transition: 'width 1s ease-out'
// //                   }}
// //                 ></div>
// //               </div>
// //             </div>
            
// //             <p className="text-sm text-gray-600 leading-relaxed">{item.explanation}</p>
// //           </div>
// //         ))}
// //       </div>
      
// //       <div className="mt-6 pt-6 border-t border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <span className="text-lg font-medium text-gray-900">Overall Score</span>
// //           <span className={`text-3xl font-bold ${getScoreColor(Math.round(animatedScores.reduce((a, b) => a + b, 0) / animatedScores.length) || 0)}`}>
// //             {Math.round(animatedScores.reduce((a, b) => a + b, 0) / animatedScores.length) || 0}%
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ValidationScores;

// import React, { useEffect, useState } from 'react';
// import { BarChart3 } from 'lucide-react';

// interface ValidationScore {
//   category: string;
//   score: number;
//   explanation: string;
//   icon: React.ReactNode;
//   color: string; // Tailwind gradient class e.g., "from-blue-400 to-indigo-500"
// }

// interface ValidationScoresProps {
//   scores: ValidationScore[];
//   isVisible: boolean;
// }

// const ValidationScores: React.FC<ValidationScoresProps> = ({ scores, isVisible }) => {
//   const [animatedScores, setAnimatedScores] = useState<number[]>([]);

//   useEffect(() => {
//     if (scores && isVisible && scores.length > 0) {
//       // Initialize animated scores
//       setAnimatedScores(new Array(scores.length).fill(0));

//       // Animate each score
//       scores.forEach((item, index) => {
//         setTimeout(() => {
//           setAnimatedScores(prev => {
//             const newScores = [...prev];
//             newScores[index] = item.score || 0;
//             return newScores;
//           });
//         }, index * 200 + 500);
//       });
//     }
//   }, [scores, isVisible]);

//   if (!isVisible || !scores || scores.length === 0) {
//     return (
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Validation Scores</h2>
//         <div className="text-center py-8">
//           <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//           <p className="text-gray-500">Upload a file to see validation scores</p>
//         </div>
//       </div>
//     );
//   }

//   const getScoreColor = (score: number) => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-yellow-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   const getProgressColor = (score: number) => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-yellow-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const overallScore =
//     animatedScores.length > 0
//       ? Math.round(animatedScores.reduce((a, b) => a + b, 0) / animatedScores.length)
//       : 0;

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Scores</h2>

//       <div className="space-y-6">
//         {scores.map((item, index) => (
//           <div key={item.category || index} className="group">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center space-x-3">
//                 <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
//                   {item.icon || null}
//                 </div>
//                 <h3 className="font-medium text-gray-900">{item.category || 'General'}</h3>
//               </div>
//               <span className={`text-2xl font-bold ${getScoreColor(animatedScores[index] || 0)}`}>
//                 {animatedScores[index] || 0}%
//               </span>
//             </div>

//             <div className="mb-3">
//               <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
//                 <div
//                   className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor(
//                     animatedScores[index] || 0
//                   )}`}
//                   style={{ width: `${animatedScores[index] || 0}%` }}
//                 />
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 leading-relaxed">
//               {item.explanation || 'No explanation provided.'}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <div className="flex items-center justify-between">
//           <span className="text-lg font-medium text-gray-900">Overall Score</span>
//           <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
//             {overallScore}%
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ValidationScores;
import React, { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';

interface ValidationScore {
  category?: string;
  score?: number;
  explanation?: string;
  icon?: React.ReactNode;
  color?: string; // Tailwind gradient class e.g., "from-blue-400 to-indigo-500"
}

interface ValidationScoresProps {
  scores: ValidationScore[] | null;
  isVisible: boolean;
}

const ValidationScores: React.FC<ValidationScoresProps> = ({ scores, isVisible }) => {
  const [animatedScores, setAnimatedScores] = useState<number[]>([]);

  useEffect(() => {
    if (scores && isVisible && scores.length > 0) {
      setAnimatedScores(new Array(scores.length).fill(0));
      const timers = scores.map((item, index) =>
        setTimeout(() => {
          setAnimatedScores(prev => {
            const newScores = [...prev];
            newScores[index] = item.score || 0;
            return newScores;
          });
        }, index * 200 + 500)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [scores, isVisible]);

  if (!isVisible || !scores || scores.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Validation Scores</h2>
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Upload a file to see validation scores</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const overallScore =
    animatedScores.length > 0
      ? Math.round(animatedScores.reduce((a, b) => a + b, 0) / animatedScores.length)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Scores</h2>

      <div className="space-y-6">
        {scores.map((item, index) => (
          <div key={item.category || index} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color || 'from-gray-200 to-gray-300'}`}>
                  {item.icon || null}
                </div>
                <h3 className="font-medium text-gray-900">{item.category || 'General'}</h3>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(animatedScores[index] || 0)}`}>
                {animatedScores[index] || 0}%
              </span>
            </div>

            <div className="mb-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor(
                    animatedScores[index] || 0
                  )}`}
                  style={{ width: `${animatedScores[index] || 0}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {item.explanation || 'No explanation provided.'}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-900">Overall Score</span>
          <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default ValidationScores;
