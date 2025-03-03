"use client";

import { useState, useEffect, useRef } from 'react';
import { CTest } from '../components/c-test';
import { SAMPLE_SUMMARIES, TextSummary } from '../lib/utils';
import { CTestStyle } from '../components/word-item';
import Link from 'next/link';

const assignTestStyles = (participantId: string): { testId: string, style: CTestStyle }[] => {
  // Get test IDs from sample summaries
  const testIds = SAMPLE_SUMMARIES.map(summary => summary.id);
  
  // Alternate between underline and span styles
  const assignments = testIds.map((testId, index) => ({
    testId,
    style: index % 2 === 0 ? 'underline' as CTestStyle : 'span' as CTestStyle
  }));
  
  return assignments;
};

export default function AllTestsPage() {
  const [testAssignments, setTestAssignments] = useState<{ testId: string, style: CTestStyle }[]>([]);
  const [participantId, setParticipantId] = useState('');
  const [testResults, setTestResults] = useState<Record<string, {
    testId: string;
    style: CTestStyle;
    isSimplified: boolean;
    correctWords: number;
    totalWords: number;
    score: number;
  }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // Check for existing participant ID in local storage
    const storedId = localStorage.getItem('c-test-participant-id');
    if (storedId) {
      setParticipantId(storedId);
    } else {
      const randomId = Math.random().toString(36).substring(2, 10);
      setParticipantId(randomId);
      localStorage.setItem('c-test-participant-id', randomId);
    }
  }, []);
  
  // Assign styles once we have a participant ID
  useEffect(() => {
    if (participantId) {
      setTestAssignments(assignTestStyles(participantId));
    }
  }, [participantId]);
  
  // Handle completion of individual tests
  const handleTestComplete = (result: {
    testId: string;
    style: CTestStyle;
    isSimplified: boolean;
    correctWords: number;
    totalWords: number;
    score: number;
  }) => {
    // Add this test result to our record
    setTestResults(prev => ({
      ...prev,
      [result.testId]: result
    }));
    
    // If all tests are complete, scroll to top to show submit button
    const completedTests = Object.keys({...testResults, [result.testId]: result}).length;
    if (completedTests === SAMPLE_SUMMARIES.length) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Make the submit section visible
      setTimeout(() => {
        const submitSection = document.getElementById('submit-section');
        if (submitSection) {
          submitSection.classList.remove('opacity-0');
          submitSection.classList.add('animate-pulse');
          
          // Stop pulsing after a few seconds
          setTimeout(() => {
            submitSection.classList.remove('animate-pulse');
          }, 3000);
        }
      }, 1000);
    }
  };
  
  // Submit all results
  const submitAllResults = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId,
          testStyles: testAssignments,
          results: Object.values(testResults),
          timestamp: new Date().toISOString()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit results');
      }
      
      console.log('All results submitted successfully');
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting results:', error);
      alert('There was a problem submitting your results. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Show completion page after successful submission
  if (isSubmitted) {
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
              You've completed all the c-tests. Your results have been successfully submitted.
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
  
  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (SAMPLE_SUMMARIES.length === 0) return 0;
    return (Object.keys(testResults).length / SAMPLE_SUMMARIES.length) * 100;
  };
  
  const overallProgress = calculateOverallProgress();
  const allTestsCompleted = Object.keys(testResults).length === SAMPLE_SUMMARIES.length;
  
  // Find test style by ID
  const getTestStyle = (testId: string): CTestStyle => {
    const assignment = testAssignments.find(a => a.testId === testId);
    return assignment ? assignment.style : 'underline'; // Default to underline if not found
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">C-Test Pilot Study</h1>
              <div className="text-sm text-gray-500">
                Participant ID: {participantId}
              </div>
            </div>
            
            <div className="w-32 flex flex-col">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div 
        id="submit-section"
        className={`transition-opacity duration-500 ${allTestsCompleted ? '' : 'opacity-0 pointer-events-none'} sticky top-20 z-10 bg-green-50 border-green-200 border rounded-lg max-w-3xl mx-auto mt-4 p-4 flex justify-between items-center shadow-md`}
      >
        <div>
          <h2 className="font-bold text-green-800">All tests completed!</h2>
          <p className="text-sm text-green-700">You can now submit your results</p>
        </div>
        <button
          onClick={submitAllResults}
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md ${
            isSubmitting 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit All Results'}
        </button>
      </div>
      
      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-blue-800">
          <h2 className="text-xl font-bold mb-4">C-Test Pilot Study Instructions</h2>
          <p className="mb-4">
            This study contains 12 different c-tests that you'll need to complete. Each test presents a text with some words that have missing letters.
          </p>
          <p className="mb-2">For each test, you'll see one of two styles:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li><span className="font-medium">Underline Style:</span> Each missing letter has its own blank with an underline</li>
            <li><span className="font-medium">Span Style:</span> Missing letters are shown as a single blank space with a single underline</li>
          </ul>
          <p>
            For each test, complete all the gaps and click "Check Answers" to see your score, then click "Continue" to record your result.
          </p>
          <p className="mt-4 text-sm italic">
            You can scroll through all the tests and complete them in any order. When you've finished all 12 tests, a submit button will appear at the top of the page.
          </p>
        </div>
        
        <div className="space-y-16">
          {SAMPLE_SUMMARIES.map((test, index) => {
            // Skip if we don't have style assignments yet
            if (testAssignments.length === 0) return null;
            
            // Get style for this test
            const style = getTestStyle(test.id);
            
            // Split the text into paragraphs
            const paragraphs = test.text.split(/\n\s*\n/).filter(Boolean);
            const isCompleted = !!testResults[test.id];
            
            return (
              <div 
                key={test.id} 
                id={`test-${test.id}`}
                className={`bg-white rounded-lg shadow-sm border transition-all duration-300 ${
                  isCompleted ? 'border-green-300' : 'border-gray-200'
                }`}
              >
                <div className="border-b border-gray-100 p-4">
                  <div className="flex flex-wrap gap-2">
                    <h2 className="text-lg font-medium text-gray-900">Test {index + 1}: {test.title}</h2>
                    <div className="ml-auto flex flex-wrap gap-2 text-sm">
                      <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-800">
                        Style: {style === 'underline' ? 'Underline' : 'Span'}
                      </div>
                      <div className="bg-green-50 px-3 py-1 rounded-full text-green-800">
                        Text: {test.simplified ? 'Simplified' : 'Standard'}
                      </div>
                      {isCompleted && (
                        <div className="bg-purple-50 px-3 py-1 rounded-full text-purple-800">
                          Score: {testResults[test.id].score.toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={isCompleted ? 'opacity-75' : ''}>
                  <CTest
                    key={test.id}
                    paragraphs={paragraphs}
                    testId={test.id}
                    isSimplified={test.simplified}
                    style={style}
                    showInstructions={false}
                    onComplete={handleTestComplete}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}