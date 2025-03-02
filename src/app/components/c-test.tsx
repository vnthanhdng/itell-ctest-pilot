"use client";

import React, { useEffect, useRef, useState } from "react";
import { WordItem, CTestStyle } from "./word-item";
import { cn } from "../lib/utils";

interface Props {
  paragraphs: string[];
  testId: string;
  isSimplified: boolean;
  style: CTestStyle;
  showInstructions?: boolean;
  onComplete?: (result: {
    testId: string;
    style: CTestStyle;
    isSimplified: boolean;
    correctWords: number;
    totalWords: number;
    score: number;
  }) => void;
}

export const CTest = ({ 
  paragraphs, 
  testId, 
  isSimplified, 
  style,
  showInstructions = true,
  onComplete
}: Props) => {
  const getShowLetter = (word: string) => Math.ceil(word.length / 2);
  const formRef = useRef<HTMLFormElement>(null);
  const [uiState, setUiState] = useState<"initial" | "showingAnswers" | "showingContinue">("initial");
  const [results, setResults] = useState<{
    answers: Array<{ word: string; isCorrect: boolean }>;
    score?: number;
  } | null>(null);

  useEffect(() => {
    if (results && uiState === "initial") {
      applyVisualFeedback();
      setUiState("showingAnswers");
      
      // Add delay before showing continue button
      const timer = setTimeout(() => {
        setUiState("showingContinue");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [results, uiState]);

  const applyVisualFeedback = () => {
    if (!formRef.current || !results) return;

    const fields = Array.from(
      formRef.current.querySelectorAll("fieldset[data-target-word]")
    ) as HTMLFieldSetElement[];

    fields.forEach((field) => {
      const word = field.dataset.targetWord as string;
      const inputs = Array.from(
        field.querySelectorAll("input[data-is-target='true']")
      ) as HTMLInputElement[];

      const answer = results.answers.find((a) => a.word === word);

      if (!answer) return;

      inputs.forEach((input) => {
        const letterIndex = input.dataset.letterIndex ? parseInt(input.dataset.letterIndex) : 0;
        const correctLetter = word[letterIndex];

        input.readOnly = true;

        if (answer.isCorrect) {
          input.style.backgroundColor = "#d1fae5";
          input.style.borderColor = "#10b981";
          input.style.color = "#047857";
        } else {
          input.style.backgroundColor = "#fee2e2";
          input.style.borderColor = "#ef4444";
          input.style.color = "#b91c1c";
          
          if (input.value !== correctLetter) {
            input.value = correctLetter;
          }
        }
      });
    });
  };

  const processForm = (form: HTMLFormElement) => {
    const fields = Array.from(
      form.querySelectorAll("fieldset[data-target-word]")
    ) as HTMLFieldSetElement[];

    let correctWords = 0;
    const answers: Array<{ word: string; isCorrect: boolean }> = [];

    fields.forEach((field) => {
      const word = field.dataset.targetWord as string;
      const inputs = Array.from(
        field.querySelectorAll("input[data-is-target='true']")
      ) as HTMLInputElement[];

      // Check if all letters in the word are correct
      const allCorrect = inputs.every((input, index) => {
        const letterIndex = input.dataset.letterIndex ? parseInt(input.dataset.letterIndex) : 0;
        return input.value.toLowerCase() === word[letterIndex].toLowerCase();
      });
      
      if (allCorrect) {
        correctWords++;
      }
      answers.push({ word, isCorrect: allCorrect });
    });

    return {
      answers,
      correctWords,
      totalWords: fields.length,
      score: (correctWords / fields.length) * 100
    };
  };

  const handleShowAnswers = () => {
    const form = formRef.current;
    if (!form) return;
    
    const { answers, score } = processForm(form);
    setResults({ answers, score });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { answers, correctWords, totalWords, score } = processForm(form);
    
    const result = {
      testId,
      style,
      isSimplified,
      correctWords,
      totalWords,
      score
    };
    
    // If onComplete callback is provided, use it (for sequential tests)
    if (onComplete) {
      onComplete(result);
    } else {
      // Otherwise submit directly to backend (for standalone test)
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...result,
            timestamp: new Date().toISOString()
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit results');
        }
        
        // Redirect to the completion page
        window.location.href = `/completion?score=${score}`;
      } catch (error) {
        console.error('Error submitting results:', error);
        alert('There was a problem submitting your results. Please try again.');
      }
    }
  };

  // Use compromise library for more accurate sentence splitting if needed
  const splitFirstSentence = (text: string): { firstSentence: string; rest: string } => {
    const match = text.match(/^[^.!?]+[.!?]\s*/);
    if (!match) return { firstSentence: text, rest: "" };

    const firstSentence = match[0];
    const rest = text.slice(firstSentence.length);
    return { firstSentence, rest };
  };

  const { firstSentence, rest: firstParagraphRest } = splitFirstSentence(paragraphs[0]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-4">
      {showInstructions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
          <h2 className="font-semibold mb-2">Instructions</h2>
          <p>
            Fill in the missing letters for each word. The first half of each target word 
            (rounded up) is provided. Use context clues to determine the complete word.
          </p>
          <p className="mt-2">
            <span className="font-medium">Style:</span> {style === 'box' ? 'Letter boxes' : style === 'underline' ? 'Individual underlines' : 'Single span'}
            <br />
            <span className="font-medium">Text type:</span> {isSimplified ? 'Simplified' : 'Standard'}
          </p>
        </div>
      )}

      <form
        id="ctest-form"
        className="flex flex-col gap-4 rounded-lg"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="space-y-3 leading-relaxed text-lg bg-white p-6 rounded-lg shadow-sm">
          {paragraphs.map((paragraph, pIndex) => {
            if (pIndex === 0) {
              return (
                <p key={pIndex}>
                  {firstSentence} 
                  {firstParagraphRest &&
                    splitWords({ text: firstParagraphRest, shouldTarget: true }).map(
                      (wordObj, wIndex) => (
                        <WordItem
                          key={`${pIndex}-${wIndex}`}
                          word={wordObj.text}
                          showLetter={getShowLetter(wordObj.text)}
                          isTarget={wordObj.isTarget}
                          style={style}
                        />
                      )
                    )}
                </p>
              );
            }

            return (
              <p key={pIndex}>
                {splitWords({ text: paragraph, shouldTarget: true }).map(
                  (wordObj, wIndex) => (
                    <WordItem
                      key={`${pIndex}-${wIndex}`}
                      word={wordObj.text}
                      showLetter={getShowLetter(wordObj.text)}
                      isTarget={wordObj.isTarget}
                      style={style}
                    />
                  )
                )}
              </p>
            );
          })}
        </div>
        
        {results && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="font-medium text-green-800">
              Your score: {results.score?.toFixed(1)}%
            </p>
            <p className="text-green-700 text-sm">
              ({results.answers.filter(a => a.isCorrect).length} correct out of {results.answers.length} words)
            </p>
          </div>
        )}
        
        <div className="flex gap-4">
          {uiState === "initial" ? (
            <button
              type="button"
              onClick={handleShowAnswers}
              className="w-40 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <span>Check Answers</span>
            </button>
          ) : uiState === "showingContinue" && (
            <button 
              type="submit"
              className="w-40 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const splitWords = ({
  text,
  shouldTarget,
}: {
  text: string;
  shouldTarget: boolean;
}) => {
  const words: { text: string; isTarget: boolean }[] = [];
  let wordCounter = 0;

  const parts = text.split(/(\s+|[.!?,;:])/);

  parts.forEach((part) => {
    if (!part) return;
    if (/^\s+$/.test(part) || /^[.!?,;:]$/.test(part)) {
      words.push({ text: part, isTarget: false });
      return;
    }
    if (part.trim()) {
      words.push({
        text: part,
        isTarget: shouldTarget && isContentWord(part) && wordCounter % 2 === 1,
      });
      wordCounter++;
    }
  });

  return words;
};

const isContentWord = (word: string): boolean => {
  const contentWordRegex = /^[a-zA-Z]{4,}$/;
  return contentWordRegex.test(word);
};