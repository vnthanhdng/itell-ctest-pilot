import Link from 'next/link';
import { SAMPLE_SUMMARIES } from './lib/utils';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">iTELL C-Test Pilot</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Welcome to the C-Test Pilot Study</h2>
          <p className="mb-4">
            This study examines different visual presentations of c-tests, a type of reading comprehension assessment.
            You will be presented with text where parts of certain words are missing, and you'll need to complete those words.
          </p>
          <p className="mb-4">
            We're testing three different styles:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li><strong>Box style</strong>: Individual boxes for each missing letter</li>
            <li><strong>Underline style</strong>: Individual underlines for each missing letter</li>
            <li><strong>Span style</strong>: A single underline for all missing letters in a word</li>
          </ul>
          <p className="mb-6">
            Each test takes approximately 5-10 minutes to complete. Your responses help us understand which format
            is most effective for reading comprehension.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/all-tests"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-center"
            >
              Start Complete Test Session
            </Link>
          </div>
          <p className="text-sm text-center mt-2 text-gray-500">
            Complete all tests in one session (recommended)
          </p>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <h3 className="text-lg font-medium mb-4">Individual Tests</h3>
          <p className="mb-4 text-sm text-gray-600">
            If you prefer to take individual tests instead of the complete session:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_SUMMARIES.map((summary) => (
              <div key={summary.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium text-lg mb-2">{summary.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {summary.simplified ? 'Simplified text' : 'Standard text'}
                </p>
                <div className="flex space-x-2">
                  <Link 
                    href={`/summaries/${summary.id}?style=box`} 
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex-1 text-center"
                  >
                    Box Style
                  </Link>
                  <Link 
                    href={`/summaries/${summary.id}?style=underline`} 
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex-1 text-center"
                  >
                    Underline
                  </Link>
                  <Link 
                    href={`/summaries/${summary.id}?style=span`} 
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex-1 text-center"
                  >
                    Span
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} iTELL Project | Educational Research
          </p>
        </div>
      </footer>
    </div>
  );
}