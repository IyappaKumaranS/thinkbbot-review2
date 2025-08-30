import React from 'react';
import { Lightbulb, Cog, TrendingUp, BarChart3, Target, Users } from 'lucide-react';
import { ValidationScore, Suggestion, Competitor, AnalysisResult } from '../types';

// Mock analysis function that simulates backend processing
export const analyzeIdea = async (file: File): Promise<AnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const mockScores: ValidationScore[] = [
    {
      category: 'Uniqueness',
      score: 72,
      explanation: 'Your idea shows moderate uniqueness with some differentiation from existing solutions. Consider exploring more innovative features to stand out.',
      icon: React.createElement(Lightbulb, { className: 'w-5 h-5 text-white' }),
      color: 'from-purple-500 to-purple-600'
    },
    {
      category: 'Feasibility',
      score: 85,
      explanation: 'High feasibility score indicates your idea is practical and achievable with current technology and resources. Well-structured approach.',
      icon: React.createElement(Cog, { className: 'w-5 h-5 text-white' }),
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'Market Trend',
      score: 68,
      explanation: 'Your idea aligns well with current market trends but could benefit from incorporating emerging technologies and consumer behaviors.',
      icon: React.createElement(TrendingUp, { className: 'w-5 h-5 text-white' }),
      color: 'from-green-500 to-green-600'
    },
    {
      category: 'Scalability',
      score: 79,
      explanation: 'Good scalability potential with clear growth paths. Consider international expansion strategies and platform diversification.',
      icon: React.createElement(BarChart3, { className: 'w-5 h-5 text-white' }),
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      category: 'Problem Relevance',
      score: 91,
      explanation: 'Excellent problem relevance! Your idea addresses a significant and widely experienced problem that users actively seek solutions for.',
      icon: React.createElement(Target, { className: 'w-5 h-5 text-white' }),
      color: 'from-red-500 to-red-600'
    },
    {
      category: 'User Adoption Potential',
      score: 76,
      explanation: 'Strong user adoption potential with clear value proposition. Focus on reducing barriers to entry and improving user onboarding.',
      icon: React.createElement(Users, { className: 'w-5 h-5 text-white' }),
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const mockSuggestions: Suggestion[] = [
    {
      category: 'Uniqueness Enhancement',
      tip: 'Consider integrating AI-powered features or blockchain technology to differentiate from competitors. Explore partnerships with emerging tech companies.',
      priority: 'high'
    },
    {
      category: 'Market Positioning',
      tip: 'Research emerging consumer behaviors post-2024 and align your solution with sustainability trends and remote work patterns.',
      priority: 'medium'
    },
    {
      category: 'User Experience',
      tip: 'Implement a progressive onboarding system with gamification elements to improve user adoption rates and reduce churn.',
      priority: 'high'
    },
    {
      category: 'Scalability Strategy',
      tip: 'Design your architecture for multi-regional deployment and consider localization for different markets from the beginning.',
      priority: 'medium'
    },
    {
      category: 'Revenue Model',
      tip: 'Explore freemium models with premium features, and consider B2B2C opportunities to accelerate growth and reduce customer acquisition costs.',
      priority: 'low'
    }
  ];

  const mockCompetitors: Competitor[] = [
    {
      name: 'Notion',
      description: 'All-in-one workspace that combines note-taking, project management, and collaboration tools. Popular among teams and individuals for organizing information.',
      website: 'https://notion.so',
      category: 'Productivity & Collaboration',
      similarity: 78
    },
    {
      name: 'Airtable',
      description: 'Cloud collaboration service that combines the simplicity of a spreadsheet with the power of a database for organizing and collaborating on data.',
      website: 'https://airtable.com',
      category: 'Database & Organization',
      similarity: 65
    },
    {
      name: 'Monday.com',
      description: 'Work operating system that powers teams to run projects and workflows with confidence. Offers customizable workflows and project tracking.',
      website: 'https://monday.com',
      category: 'Project Management',
      similarity: 72
    },
    {
      name: 'Slack',
      description: 'Business communication platform featuring persistent chat rooms, private groups, and direct messaging with file sharing and search capabilities.',
      website: 'https://slack.com',
      category: 'Communication & Collaboration',
      similarity: 45
    },
    {
      name: 'Trello',
      description: 'Web-based kanban-style list-making application for project management. Uses boards, lists, and cards to organize and prioritize projects.',
      website: 'https://trello.com',
      category: 'Task Management',
      similarity: 82
    }
  ];

  return {
    scores: mockScores,
    suggestions: mockSuggestions,
    competitors: mockCompetitors
  };
};

// Mock history data
export const mockHistory = [
  {
    id: '1',
    title: 'AI-Powered Learning Platform',
    date: '2024-01-15',
    averageScore: 78,
    type: 'PDF'
  },
  {
    id: '2',
    title: 'Sustainable Food Delivery Service',
    date: '2024-01-10',
    averageScore: 85,
    type: 'DOCX'
  },
  {
    id: '3',
    title: 'Remote Team Collaboration Tool',
    date: '2024-01-08',
    averageScore: 72,
    type: 'TXT'
  }
];