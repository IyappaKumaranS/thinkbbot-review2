// import React, { useState } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import FileUpload from './components/FileUpload';
// import ValidationScores from './components/ValidationScores';
// import Suggestions from './components/Suggestions';
// import Competitors from './components/Competitors';
// import { ValidationHistory, AnalysisResult } from './types';

// function App() {
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
//   const [history, setHistory] = useState<ValidationHistory[]>([]);
//   const [currentFile, setCurrentFile] = useState<File | null>(null);

//   // Called when FileUpload returns API response
//   const handleResult = (result: AnalysisResult) => {
//     const normalizedResult: AnalysisResult = {
//       scores: Array.isArray(result.scores) ? result.scores : [],
//       suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
//       competitors: Array.isArray(result.competitors) ? result.competitors : [],
//     };

//     setAnalysisResult(normalizedResult);
//     setIsAnalyzing(false);

//     if (!currentFile) return;

//     const newHistoryItem: ValidationHistory = {
//       id: Date.now().toString(),
//       title: currentFile.name.replace(/\.[^/.]+$/, ''),
//       date: new Date().toISOString().split('T')[0],
//       averageScore: Math.round(
//         (normalizedResult.scores.reduce((sum, score) => sum + score.score, 0) || 0) /
//         (normalizedResult.scores.length || 1)
//       ),
//       type: currentFile.name.split('.').pop()?.toUpperCase() || 'FILE',
//       scores: normalizedResult.scores,
//       suggestions: normalizedResult.suggestions,
//       competitors: normalizedResult.competitors,
//     };

//     setHistory(prev => [newHistoryItem, ...prev]);
//   };

//   const handleFileUpload = (file: File) => {
//     setCurrentFile(file);
//     setIsAnalyzing(true);
//     setAnalysisResult(null);
//   };

//   const handleSelectHistory = (item: ValidationHistory) => {
//     setAnalysisResult({
//       scores: Array.isArray(item.scores) ? item.scores : [],
//       suggestions: Array.isArray(item.suggestions) ? item.suggestions : [],
//       competitors: Array.isArray(item.competitors) ? item.competitors : [],
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <div className="flex">
//         {/* Sidebar */}
//         <div className="hidden lg:block">
//           <Sidebar history={history} onSelectHistory={handleSelectHistory} />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-6 lg:ml-0">
//           <div className="max-w-7xl mx-auto">
//             {/* Mobile History Toggle */}
//             <div className="lg:hidden mb-6">
//               <details className="bg-white rounded-lg shadow-sm border border-gray-200">
//                 <summary className="p-4 cursor-pointer font-medium text-gray-900">
//                   View History ({history.length})
//                 </summary>
//                 <div className="p-4 border-t border-gray-200 max-h-64 overflow-y-auto">
//                   {history.map(item => (
//                     <div
//                       key={item.id}
//                       onClick={() => handleSelectHistory(item)}
//                       className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 mb-2"
//                     >
//                       <p className="font-medium text-sm text-gray-900 truncate">{item.title}</p>
//                       <p className="text-xs text-gray-600">
//                         {item.date} • {item.averageScore}%
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </details>
//             </div>

//             {/* Main Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* File Upload */}
//               <div>
//                 <FileUpload
//                   onFileUpload={handleFileUpload}
//                   onResult={handleResult}
//                   isAnalyzing={isAnalyzing}
//                 />
//               </div>

//               {/* Validation Scores */}
//               <div>
//                 <ValidationScores
//                   scores={analysisResult?.scores || []}
//                   isVisible={!isAnalyzing && !!analysisResult}
//                 />
//               </div>

//               {/* AI Suggestions */}
//               <div>
//                 <Suggestions
//                   suggestions={analysisResult?.suggestions || []}
//                   isVisible={!isAnalyzing && !!analysisResult}
//                 />
//               </div>

//               {/* Competitors */}
//               <div>
//                 <Competitors
//                   competitors={analysisResult?.competitors || []}
//                   isVisible={!isAnalyzing && !!analysisResult}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';
import ValidationScores from './components/ValidationScores';
import Suggestions from './components/Suggestions';
import Competitors from './components/Competitors';
import { PipelineResult, ScoreItem } from './types/pipeline';
import { ValidationHistory, Suggestion, Competitor, ValidationScore } from './types';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PipelineResult | null>(null);
  const [history, setHistory] = useState<ValidationHistory[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  // Called when FileUpload returns API response
  const handleResult = (result: PipelineResult) => {
    // Map backend data to full frontend types
    const scores: ValidationScore[] = Array.isArray(result.scores)
      ? result.scores.map((s, idx) => ({
          category: s.category || `Category ${idx + 1}`,
          score: typeof s.score === 'number' ? s.score : 0,
          explanation: s.explanation || '',
          icon: null,
          color: s.color || '#2563eb',
        }))
      : [];

    const suggestions: Suggestion[] = Array.isArray(result.suggestions)
      ? result.suggestions.map((s, idx) =>
          typeof s === 'string'
            ? { category: `Suggestion ${idx + 1}`, tip: s, priority: 'medium' }
            : {
                category: s.category || `Suggestion ${idx + 1}`,
                tip: s.tip || (typeof s === 'string' ? s : ''),
                priority: s.priority || 'medium',
              }
        )
      : [];

    const competitors: Competitor[] = Array.isArray(result.competitors)
      ? result.competitors.map((c, idx) => ({
          name: c.name || `Competitor ${idx + 1}`,
          description: c.description || '',
          website: c.website || '',
          category: c.category || '',
          similarity: typeof c.similarity === 'number' ? c.similarity : 0,
        }))
      : [];

    setAnalysisResult({ scores, suggestions, competitors, error: result.error });
    setIsAnalyzing(false);

    if (!currentFile) return;

    const averageScore =
      scores.length > 0
        ? Math.round(scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length)
        : 0;

    const newHistoryItem: ValidationHistory = {
      id: Date.now().toString(),
      title: currentFile.name.replace(/\.[^/.]+$/, ''),
      date: new Date().toISOString().split('T')[0],
      averageScore,
      type: currentFile.name.split('.').pop()?.toUpperCase() || 'FILE',
      scores,
      suggestions,
      competitors,
    };

    setHistory(prev => [newHistoryItem, ...prev]);
  };

  const handleFileUpload = (file: File) => {
    setCurrentFile(file);
    setIsAnalyzing(true);
    setAnalysisResult(null);
  };

  const handleSelectHistory = (item: ValidationHistory) => {
    setAnalysisResult({
      scores: Array.isArray(item.scores) ? item.scores : [],
      suggestions: Array.isArray(item.suggestions) ? item.suggestions : [],
      competitors: Array.isArray(item.competitors) ? item.competitors : [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar history={history} onSelectHistory={handleSelectHistory} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {/* Mobile History Toggle */}
            <div className="lg:hidden mb-6">
              <details className="bg-white rounded-lg shadow-sm border border-gray-200">
                <summary className="p-4 cursor-pointer font-medium text-gray-900">
                  View History ({history.length})
                </summary>
                <div className="p-4 border-t border-gray-200 max-h-64 overflow-y-auto">
                  {history.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectHistory(item)}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 mb-2"
                    >
                      <p className="font-medium text-sm text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-600">
                        {item.date} • {item.averageScore}%
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload */}
              <div>
                <FileUpload
                  onFileUpload={handleFileUpload}
                  onResult={handleResult}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              {/* Validation Scores */}
              <div>
                <ValidationScores
                  scores={analysisResult?.scores || []}
                  isVisible={!isAnalyzing && !!analysisResult}
                />
              </div>

              {/* AI Suggestions */}
              <div>
                <Suggestions
                  suggestions={analysisResult?.suggestions || []}
                  isVisible={!isAnalyzing && !!analysisResult}
                />
              </div>

              {/* Competitors */}
              <div>
                <Competitors
                  competitors={analysisResult?.competitors || []}
                  isVisible={!isAnalyzing && !!analysisResult}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
