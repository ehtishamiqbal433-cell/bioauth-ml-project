import React from 'react';
import { AppElement } from '../types';
import { ElementRenderer } from './ElementRenderer';
import { Trash2, ArrowUp, ArrowDown, Copy } from 'lucide-react';

interface CanvasProps {
  elements: AppElement[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onDuplicate: (id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedId,
  onSelect,
  onRemove,
  onMove,
  onDuplicate
}) => {
  return (
    <div 
      className="flex-1 h-full overflow-y-auto bg-builder-bg bg-grid-pattern p-8 flex justify-center"
      onClick={() => onSelect(null)} // Deselect when clicking outside
    >
      <div 
        className="w-full max-w-3xl bg-white min-h-[800px] shadow-xl rounded-xl border border-gray-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Prevent deselect when clicking the canvas container
      >
        {/* Canvas Header (Mock Browser/App Bar) */}
        <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="mx-auto bg-white border border-gray-200 rounded-md px-24 py-1 text-xs text-gray-400 flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm border border-gray-300 inline-block"></span>
            Preview Mode
          </div>
        </div>

        {/* Canvas Content Area */}
        <div className="p-8 min-h-[calc(100%-3rem)]">
          {elements.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-32">
              <div className="w-24 h-24 border-4 border-dashed border-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">+</span>
              </div>
              <p className="text-lg font-medium text-gray-500">Your canvas is empty</p>
              <p className="text-sm mt-2">Click components in the sidebar to add them here.</p>
            </div>
          ) : (
            <div className="space-y-2 pb-32">
              {elements.map((element, index) => {
                const isSelected = element.id === selectedId;
                const isFirst = index === 0;
                const isLast = index === elements.length - 1;

                return (
                  <div
                    key={element.id}
                    className={`relative group rounded-lg transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-builder-primary ring-offset-4 bg-blue-50/30' 
                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 hover:bg-gray-50/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(element.id);
                    }}
                  >
                    {/* Element Content */}
                    <div className={`p-4 ${isSelected ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'}`}>
                      <ElementRenderer element={element} />
                    </div>

                    {/* Floating Action Bar (Visible on Select or Hover) */}
                    {(isSelected || true) && (
                      <div className={`absolute -right-12 top-0 flex flex-col gap-1 bg-white shadow-md rounded-md border border-gray-200 p-1 transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <button
                          onClick={(e) => { e.stopPropagation(); onMove(element.id, 'up'); }}
                          disabled={isFirst}
                          className={`p-1.5 rounded hover:bg-gray-100 ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'}`}
                          title="Move Up"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onMove(element.id, 'down'); }}
                          disabled={isLast}
                          className={`p-1.5 rounded hover:bg-gray-100 ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'}`}
                          title="Move Down"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <div className="h-px bg-gray-200 my-1"></div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDuplicate(element.id); }}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
                          title="Duplicate"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onRemove(element.id); }}
                          className="p-1.5 rounded hover:bg-red-50 text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
