import React from 'react';
import { AppElement } from '../types';
import { ELEMENT_LABELS } from '../constants';
import { Settings, Type, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Link, Palette, Layout } from 'lucide-react';

interface PropertiesPanelProps {
  selectedElement: AppElement | null;
  updateElement: (id: string, props: any) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedElement, updateElement }) => {
  if (!selectedElement) {
    return (
      <div className="w-80 bg-builder-sidebar border-l border-builder-border flex flex-col h-full">
        <div className="p-4 border-b border-builder-border flex items-center gap-2 text-builder-text font-semibold">
          <Settings size={18} />
          Properties
        </div>
        <div className="flex-1 flex items-center justify-center text-builder-textMuted p-6 text-center text-sm">
          Select an element on the canvas to edit its properties.
        </div>
      </div>
    );
  }

  const { id, type, props } = selectedElement;

  const handleChange = (key: string, value: any) => {
    updateElement(id, { ...props, [key]: value });
  };

  const renderField = (label: string, icon: React.ReactNode, children: React.ReactNode) => (
    <div className="mb-5">
      <label className="flex items-center gap-2 text-xs font-medium text-builder-textMuted uppercase tracking-wider mb-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );

  const renderProperties = () => {
    switch (type) {
      case 'heading':
        return (
          <>
            {renderField('Text Content', <Type size={14} />, 
              <input
                type="text"
                value={props.text}
                onChange={(e) => handleChange('text', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary focus:ring-1 focus:ring-builder-primary"
              />
            )}
            {renderField('Heading Level', <Layout size={14} />, 
              <select
                value={props.level}
                onChange={(e) => handleChange('level', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary"
              >
                <option value="h1">Heading 1 (Largest)</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6 (Smallest)</option>
              </select>
            )}
            {renderField('Alignment', <AlignLeft size={14} />, 
              <div className="flex bg-gray-100 p-1 rounded border border-builder-border">
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    onClick={() => handleChange('align', align)}
                    className={`flex-1 py-1.5 flex justify-center rounded text-sm capitalize ${props.align === align ? 'bg-white shadow-sm font-medium text-builder-primary' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {align === 'left' && <AlignLeft size={16} />}
                    {align === 'center' && <AlignCenter size={16} />}
                    {align === 'right' && <AlignRight size={16} />}
                  </button>
                ))}
              </div>
            )}
            {renderField('Color', <Palette size={14} />, 
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={props.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={props.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="flex-1 p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary uppercase"
                />
              </div>
            )}
          </>
        );

      case 'paragraph':
        return (
          <>
            {renderField('Text Content', <Type size={14} />, 
              <textarea
                value={props.text}
                onChange={(e) => handleChange('text', e.target.value)}
                rows={5}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary focus:ring-1 focus:ring-builder-primary resize-y"
              />
            )}
            {renderField('Font Size', <Layout size={14} />, 
              <select
                value={props.fontSize}
                onChange={(e) => handleChange('fontSize', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary"
              >
                <option value="sm">Small</option>
                <option value="base">Normal</option>
                <option value="lg">Large</option>
              </select>
            )}
            {renderField('Alignment', <AlignLeft size={14} />, 
              <div className="flex bg-gray-100 p-1 rounded border border-builder-border">
                {['left', 'center', 'right', 'justify'].map((align) => (
                  <button
                    key={align}
                    onClick={() => handleChange('align', align)}
                    className={`flex-1 py-1.5 flex justify-center rounded text-sm capitalize ${props.align === align ? 'bg-white shadow-sm font-medium text-builder-primary' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            )}
            {renderField('Color', <Palette size={14} />, 
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={props.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={props.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="flex-1 p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary uppercase"
                />
              </div>
            )}
          </>
        );

      case 'button':
        return (
          <>
            {renderField('Button Text', <Type size={14} />, 
              <input
                type="text"
                value={props.text}
                onChange={(e) => handleChange('text', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary focus:ring-1 focus:ring-builder-primary"
              />
            )}
            {renderField('Variant', <Palette size={14} />, 
              <select
                value={props.variant}
                onChange={(e) => handleChange('variant', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary"
              >
                <option value="primary">Primary (Blue)</option>
                <option value="secondary">Secondary (Gray)</option>
                <option value="outline">Outline</option>
                <option value="danger">Danger (Red)</option>
              </select>
            )}
            {renderField('Size', <Layout size={14} />, 
              <select
                value={props.size}
                onChange={(e) => handleChange('size', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            )}
            {renderField('Layout', <Layout size={14} />, 
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.fullWidth}
                  onChange={(e) => handleChange('fullWidth', e.target.checked)}
                  className="rounded border-gray-300 text-builder-primary focus:ring-builder-primary"
                />
                Full Width
              </label>
            )}
          </>
        );

      case 'image':
        return (
          <>
            {renderField('Image URL', <Link size={14} />, 
              <input
                type="text"
                value={props.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://..."
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary focus:ring-1 focus:ring-builder-primary"
              />
            )}
            {renderField('Alt Text', <Type size={14} />, 
              <input
                type="text"
                value={props.alt}
                onChange={(e) => handleChange('alt', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary focus:ring-1 focus:ring-builder-primary"
              />
            )}
            {renderField('Corner Radius', <Layout size={14} />, 
              <select
                value={props.rounded}
                onChange={(e) => handleChange('rounded', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary"
              >
                <option value="none">Square</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="full">Circle / Pill</option>
              </select>
            )}
          </>
        );

      case 'divider':
        return (
          <>
            {renderField('Style', <Layout size={14} />, 
              <select
                value={props.style}
                onChange={(e) => handleChange('style', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            )}
            {renderField('Spacing (Margin)', <Layout size={14} />, 
              <select
                value={props.spacing}
                onChange={(e) => handleChange('spacing', e.target.value)}
                className="w-full p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            )}
            {renderField('Color', <Palette size={14} />, 
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={props.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={props.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="flex-1 p-2 border border-builder-border rounded text-sm focus:outline-none focus:border-builder-primary uppercase"
                />
              </div>
            )}
          </>
        );

      default:
        return <div className="text-sm text-red-500">No properties available for this element.</div>;
    }
  };

  return (
    <div className="w-80 bg-builder-sidebar border-l border-builder-border flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-builder-border flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2 text-builder-text font-semibold">
          <Settings size={18} className="text-builder-primary" />
          {ELEMENT_LABELS[type]} Properties
        </div>
        <span className="text-xs text-gray-400 font-mono bg-gray-200 px-1.5 py-0.5 rounded">
          {id.substring(0, 6)}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        {renderProperties()}
      </div>
    </div>
  );
};
