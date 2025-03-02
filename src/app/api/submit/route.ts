import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.testId || !data.style || data.totalWords === undefined || data.correctWords === undefined) {
      return NextResponse.json(
        { error: 'Invalid data submitted' },
        { status: 400 }
      );
    }
    
    // In a real application, you would save this to a database
    // For this pilot, we'll save to a JSON file
    const timestamp = new Date().toISOString();
    const result = {
      id: `${data.testId}-${timestamp}`,
      testId: data.testId,
      style: data.style,
      isSimplified: data.isSimplified,
      correctWords: data.correctWords,
      totalWords: data.totalWords,
      score: data.score,
      timestamp: timestamp
    };
    
    // Create a directory for results if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Create a JSON file for each submission
    const filePath = path.join(dataDir, `${result.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    
    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Error saving test result:', error);
    return NextResponse.json(
      { error: 'Failed to save test result' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      return NextResponse.json({ results: [] });
    }
    
    const files = fs.readdirSync(dataDir);
    const results = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
      });
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error retrieving test results:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve test results' },
      { status: 500 }
    );
  }
}