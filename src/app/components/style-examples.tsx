import React from 'react';
import { CTestStyle } from './word-item';

interface StyleExampleProps {
  style: CTestStyle;
}

export const StyleExample: React.FC<StyleExampleProps> = ({ style }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium mb-2">Example of {style === 'box' ? 'Box Style' : style === 'underline' ? 'Underline Style' : 'Span Style'}</h3>
      
      {style === 'box' && (
        <div className="flex items-center">
          <div className="size-7 bg-gray-100 flex items-center justify-center border">p</div>
          <div className="size-7 bg-gray-100 flex items-center justify-center border">s</div>
          <div className="size-7 bg-gray-100 flex items-center justify-center border">y</div>
          <div className="size-7 bg-gray-100 flex items-center justify-center border">c</div>
          <div className="size-7 bg-gray-100 flex items-center justify-center border">h</div>
          <div className="size-7 border flex items-center justify-center">o</div>
          <div className="size-7 border flex items-center justify-center">l</div>
          <div className="size-7 border flex items-center justify-center">o</div>
          <div className="size-7 border flex items-center justify-center">g</div>
          <div className="size-7 border flex items-center justify-center">y</div>
        </div>
      )}

      {style === 'underline' && (
        <div className="flex items-center">
          <span>psych</span>
          <span className="mx-0.5 relative">
            <span className="mx-0.5">o</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500"></div>
          </span>
          <span className="mx-0.5 relative">
            <span className="mx-0.5">l</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500"></div>
          </span>
          <span className="mx-0.5 relative">
            <span className="mx-0.5">o</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500"></div>
          </span>
          <span className="mx-0.5 relative">
            <span className="mx-0.5">g</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500"></div>
          </span>
          <span className="mx-0.5 relative">
            <span className="mx-0.5">y</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500"></div>
          </span>
        </div>
      )}

      {style === 'span' && (
        <div className="flex items-center">
          <span>psych</span>
          <span className="relative ml-0.5">
            <span className="mx-0.5">o</span>
            <span className="mx-0.5">l</span>
            <span className="mx-0.5">o</span>
            <span className="mx-0.5">g</span>
            <span className="mx-0.5">y</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500"></div>
          </span>
        </div>
      )}
      
      <p className="text-sm text-gray-600 mt-3">
        {style === 'box' && 'Individual boxes for each letter with first letters shown.'}
        {style === 'underline' && 'Individual underlines for each missing letter with first letters shown.'}
        {style === 'span' && 'A single continuous underline for all missing letters with first letters shown.'}
      </p>
    </div>
  );
};

export const StyleExamples: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StyleExample style="box" />
      <StyleExample style="underline" />
      <StyleExample style="span" />
    </div>
  );
};