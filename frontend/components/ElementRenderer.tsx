import React from 'react';
import { AppElement } from '../types';

interface ElementRendererProps {
  element: AppElement;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({ element }) => {
  const { type, props } = element;

  switch (type) {
    case 'heading': {
      const Tag = props.level as keyof JSX.IntrinsicElements;
      const sizeClasses = {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-semibold',
        h4: 'text-xl font-semibold',
        h5: 'text-lg font-medium',
        h6: 'text-base font-medium',
      };
      return (
        <Tag
          className={`${sizeClasses[props.level as keyof typeof sizeClasses] || sizeClasses.h2} mb-4`}
          style={{ textAlign: props.align, color: props.color }}
        >
          {props.text}
        </Tag>
      );
    }

    case 'paragraph': {
      const sizeClasses = {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      };
      return (
        <p
          className={`${sizeClasses[props.fontSize as keyof typeof sizeClasses] || sizeClasses.base} mb-4 leading-relaxed`}
          style={{ textAlign: props.align, color: props.color }}
        >
          {props.text}
        </p>
      );
    }

    case 'button': {
      const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md';
      
      const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      };

      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };

      const widthClass = props.fullWidth ? 'w-full' : '';

      return (
        <div className={`mb-4 ${props.fullWidth ? 'block' : 'inline-block'}`}>
          <button
            className={`${baseClasses} ${variantClasses[props.variant as keyof typeof variantClasses] || variantClasses.primary} ${sizeClasses[props.size as keyof typeof sizeClasses] || sizeClasses.md} ${widthClass}`}
            onClick={(e) => e.preventDefault()} // Prevent default action in builder
          >
            {props.text}
          </button>
        </div>
      );
    }

    case 'image': {
      const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      };

      return (
        <div className="mb-4 w-full flex justify-center">
          <img
            src={props.url}
            alt={props.alt}
            className={`max-w-full h-auto object-cover ${roundedClasses[props.rounded as keyof typeof roundedClasses] || roundedClasses.md}`}
            onError={(e) => {
              // Fallback for broken images in builder
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
            }}
          />
        </div>
      );
    }

    case 'divider': {
      const spacingClasses = {
        sm: 'my-4',
        md: 'my-8',
        lg: 'my-12',
      };
      
      const borderStyles = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
      };

      return (
        <hr
          className={`w-full border-t-2 ${spacingClasses[props.spacing as keyof typeof spacingClasses] || spacingClasses.md} ${borderStyles[props.style as keyof typeof borderStyles] || borderStyles.solid}`}
          style={{ borderColor: props.color }}
        />
      );
    }

    default:
      return <div className="p-4 border border-red-500 text-red-500 bg-red-50 rounded">Unknown element type: {type}</div>;
  }
};
