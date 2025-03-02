import { CTestStyle } from "../components/word-item";

export interface TestResult {
  id: string;
  testId: string;
  style: CTestStyle;
  isSimplified: boolean;
  correctWords: number;
  totalWords: number;
  score: number;
  timestamp: string;
}

export interface TestSubmission {
  testId: string;
  style: CTestStyle;
  isSimplified: boolean;
  correctWords: number;
  totalWords: number;
  score: number;
}