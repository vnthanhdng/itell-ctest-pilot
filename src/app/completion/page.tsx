"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
// client component that uses Suspense
function CompletionContent() {
    const searchParams = useSearchParams();
    const [score, setScore] = useState<number | null>(null);
    
    useEffect(() => {
      const scoreParam = searchParams.get('score');
      if (scoreParam) {
        setScore(parseFloat(scoreParam));
      }
    }, [searchParams]);
  
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full text-center">
        <div className="mb-6">
          <span className="inline-block p-4 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your test has been submitted successfully.
          {score !== null && (
            <span className="block mt-2">
              Your score: <span className="font-medium">{score.toFixed(1)}%</span>
            </span>
          )}
        </p>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Your participation helps us understand which c-test format is most effective.
          </p>
          
          <Link 
            href="/"
            className="inline-block px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Another Test
          </Link>
        </div>
      </div>
    );
  }
  
  // Fallback component to show while loading
  function LoadingFallback() {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full text-center">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-gray-600">Loading results...</p>
      </div>
    );
  }
  
  export default function CompletionPage() {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Test Completed</h1>
          </div>
        </header>
        
        <main className="flex-grow max-w-3xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <Suspense fallback={<LoadingFallback />}>
            <CompletionContent />
          </Suspense>
        </main>
        
        <footer className="bg-white border-t py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} iTELL Project | Educational Research
            </p>
          </div>
        </footer>
      </div>
    );
  }