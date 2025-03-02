"use client";

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CTest } from '../../components/c-test';
import { SAMPLE_SUMMARIES, TextSummary } from '../../lib/utils';
import Link from 'next/link';
import { CTestStyle } from '../../components/word-item';

export default function SummaryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState<TextSummary | null>(null);
  const [style, setStyle] = useState<CTestStyle>('box');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const styleParam = searchParams.get('style') as CTestStyle || 'box';
    
    // Find the summary by ID
    const found = SAMPLE_SUMMARIES.find(s => s.id === id);
    if (found) {
      setSummary(found);
      setStyle(styleParam);
    }
    
    setLoading(false);
  }, [params.id, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary Not Found</h2>
        <p className="text-gray-600 mb-6">The requested summary could not be found.</p>
        <Link 
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Split the text into paragraphs
  const paragraphs = summary.text.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{summary.title}</h1>
          <Link 
            href="/"
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Back to Tests
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 mb-6 p-3 rounded-lg text-sm text-blue-800 inline-block">
          Test Style: <span className="font-medium">{style === 'box' ? 'Box Style' : style === 'underline' ? 'Underline Style' : 'Span Style'}</span>
        </div>
        
        <CTest
          paragraphs={paragraphs}
          testId={summary.id}
          isSimplified={summary.simplified}
          style={style}
        />
      </main>
    </div>
  );
}