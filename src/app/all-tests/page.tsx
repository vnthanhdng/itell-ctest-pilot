"use client";

import { useState, useEffect } from 'react';
import { CTest } from '../components/c-test';
import { SAMPLE_SUMMARIES } from '../lib/utils';
import { CTestStyle } from '../components/word-item';
import Link from 'next/link';

export default function AllTestsPage() {
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [style, setStyle] = useState<CTestStyle>('box');
  const [testResults, setTestResults] = useState<Array<{
    testId: string;
    style: CTestStyle;
    isSimplified: boolean;
    correctWords: number;
    totalWords: number;
    score: number;
  }>>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [participantId, setParticipantId] = useState('');

  // Generate a random participant ID on first load
  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 10);
    setParticipantId(randomId);
  }, []);

  // Select a style based on participant ID to ensure consistent testing
  useEffect(() => {
    if (participantId) {
      // Use the participant ID to deterministically select a style
      const styleIndex = participantId.charCodeAt(0) % 3;
      const styles: CTestStyle[] = ['box', 'underline', 'span'];
      setStyle(styles[styleIndex]);
    }
  }, [participantId]);

  const handleTestComplete = (result: {
    testId: string;
    style: CTestStyle;
    isSimplified: boolean;
    correctWords: number;
    totalWords: number;
    score: number;
  }) => {
    // Add this test result to our array
    setTestResults(prev => [...prev, result]);
    
    // Move to the next test or complete
    if (currentTestIndex < SAMPLE_SUMMARIES.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
    } else {
      // All tests completed
      setTestCompleted(true);
      
      // Submit all results
      submitAllResults();
    }
  };

  const submitAllResults = async () => {
    try {
      const response = await fetch('/api/submit-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId,
          results: testResults,
          timestamp: new Date().toISOString()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit results');
      }
      
      console.log('All results submitted successfully');
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">All Tests Completed</h1>
          </div>
        </header>
        
        <main className="flex-grow max-w-3xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
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
              You've completed all the c-tests. Thank you for your participation!
            </p>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Your participation helps us understand which c-test format is most effective.
              </p>
              
              <Link 
                href="/"
                className="inline-block px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentTest = SAMPLE_SUMMARIES[currentTestIndex];
  
  // Split the text into paragraphs
  const paragraphs = currentTest.text.split(/\n\s*\n/).filter(Boolean);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">C-Test Pilot Study</h1>
          <div className="text-sm text-gray-500">
            Test {currentTestIndex + 1} of {SAMPLE_SUMMARIES.length} • Participant ID: {participantId}
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <div className="flex space-x-2 text-sm">
            <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-800">
              Style: {style === 'box' ? 'Box Style' : style === 'underline' ? 'Underline Style' : 'Span Style'}
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full text-green-800">
              Text: {currentTest.simplified ? 'Simplified' : 'Standard'}
            </div>
          </div>
        </div>
        
        <CTest
          key={currentTest.id}
          paragraphs={paragraphs}
          testId={currentTest.id}
          isSimplified={currentTest.simplified}
          style={style}
          onComplete={handleTestComplete}
        />
      </main>
    </div>
  );
}