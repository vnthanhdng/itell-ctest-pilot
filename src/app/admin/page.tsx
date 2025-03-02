"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TestResult {
  id: string;
  testId: string;
  style: string;
  isSimplified: boolean;
  correctWords: number;
  totalWords: number;
  score: number;
  timestamp: string;
}

export default function AdminPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/submit');
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError('An error occurred while fetching the test results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Group results by test style and simplified status
  const groupedResults: Record<string, Record<string, TestResult[]>> = {};
  
  results.forEach(result => {
    const styleKey = result.style;
    const textType = result.isSimplified ? 'simplified' : 'standard';
    
    if (!groupedResults[styleKey]) {
      groupedResults[styleKey] = {};
    }
    
    if (!groupedResults[styleKey][textType]) {
      groupedResults[styleKey][textType] = [];
    }
    
    groupedResults[styleKey][textType].push(result);
  });

  // Calculate averages
  const averages: Record<string, Record<string, number>> = {};
  
  Object.entries(groupedResults).forEach(([style, textTypes]) => {
    averages[style] = {};
    
    Object.entries(textTypes).forEach(([textType, results]) => {
      const totalScore = results.reduce((sum, result) => sum + result.score, 0);
      averages[style][textType] = totalScore / results.length;
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link 
            href="/"
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Back to Home
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-800">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <p className="mb-4">Total submissions: {results.length}</p>
              
              {Object.keys(averages).length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium mb-2">Average Scores by Test Type</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Style
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Simplified
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Standard
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(averages).map(([style, textTypes]) => (
                          <tr key={style}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {style}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {textTypes['simplified'] !== undefined ? 
                                `${textTypes['simplified'].toFixed(1)}%` : 
                                'No data'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {textTypes['standard'] !== undefined ? 
                                `${textTypes['standard'].toFixed(1)}%` : 
                                'No data'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p>No data to display yet.</p>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">All Submissions</h2>
              
              {results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Test ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Style
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Text Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result) => (
                        <tr key={result.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.testId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.style}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.isSimplified ? 'Simplified' : 'Standard'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.score.toFixed(1)}% ({result.correctWords}/{result.totalWords})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(result.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No submissions yet.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}