import React from 'react';
import { ElementType } from '../types';
import { ELEMENT_LABELS } from '../constants';
import { Type, Heading, Image as ImageIcon, Minus, MousePointerClick, Plus, LayoutTemplate } from 'lucide-react';

interface SidebarProps {
  onAddElement: (type: ElementType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddElement }) => {
  const components: { type: ElementType; icon: React.ReactNode; description: string }[] = [
    { type: 'heading', icon: <Heading size={20} />, description: 'Large title text' },
    { type: 'paragraph', icon: <Type size={20} />, description: 'Standard body text' },
    { type: 'button', icon: <MousePointerClick size={20} />, description: 'Clickable action' },
    { type: 'image', icon: <ImageIcon size={20} />, description: 'Display an image' },
    { type: 'divider', icon: <Minus size={20} />, description: 'Horizontal line' },
  ];

  return (
    <div className="w-64 bg-builder-sidebar border-r border-builder-border flex flex-col h-full z-10 shadow-sm">
      <div className="p-4 border-b border-builder-border flex items-center gap-2 text-builder-text font-bold text-lg bg-white">
        <LayoutTemplate className="text-builder-primary" />
        App Builder
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-builder-textMuted uppercase tracking-wider mb-3">Components</h3>
        <div className="space-y-2">
          {components.map(({ type, icon, description }) => (
            <button
              key={type}
              onClick={() => onAddElement(type)}
              className="w-full flex items-start gap-3 p-3 rounded-lg border border-transparent hover:border-builder-border hover:bg-gray-50 transition-all group text-left"
            >
              <div className="p-2 bg-gray-100 rounded text-gray-600 group-hover:text-builder-primary group-hover:bg-blue-50 transition-colors">
                {icon}
              </div>
              <div>
                <div className="font-medium text-sm text-builder-text group-hover:text-builder-primary transition-colors">
                  {ELEMENT_LABELS[type]}
                </div>
                <div className="text-xs text-builder-textMuted mt-0.5">
                  {description}
                </div>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity self-center text-builder-primary">
                <Plus size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-builder-border bg-gray-50 text-xs text-center text-builder-textMuted">
        Click a component to add it to the canvas.
      </div>
    </div>
  );
};
