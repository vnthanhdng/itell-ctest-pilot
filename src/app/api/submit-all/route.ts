import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.participantId || !Array.isArray(data.results) || data.results.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data submitted' },
        { status: 400 }
      );
    }
    
    // In a real application, you would save this to a database
    // For this pilot, we'll save to a JSON file
    const timestamp = new Date().toISOString();
    const result = {
      participantId: data.participantId,
      results: data.results,
      timestamp: timestamp
    };
    
    // Create a directory for results if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Create a JSON file for all submissions from this participant
    const filePath = path.join(dataDir, `participant-${data.participantId}-${timestamp.replace(/:/g, '-')}.json`);
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    
    // Also save individual test results for compatibility with the admin dashboard
    data.results.forEach((testResult: any, index: number) => {
      const individualResult = {
        id: `${testResult.testId}-${timestamp}-${index}`,
        participantId: data.participantId,
        testId: testResult.testId,
        style: testResult.style,
        isSimplified: testResult.isSimplified,
        correctWords: testResult.correctWords,
        totalWords: testResult.totalWords,
        score: testResult.score,
        timestamp: timestamp
      };
      
      const individualFilePath = path.join(dataDir, `${individualResult.id}.json`);
      fs.writeFileSync(individualFilePath, JSON.stringify(individualResult, null, 2));
    });
    
    return NextResponse.json({ success: true, participantId: data.participantId });
  } catch (error) {
    console.error('Error saving test results:', error);
    return NextResponse.json(
      { error: 'Failed to save test results' },
      { status: 500 }
    );
  }
}