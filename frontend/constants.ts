import { ElementType, BaseProps } from './types';

export const DEFAULT_PROPS: Record<ElementType, BaseProps> = {
  heading: {
    text: 'New Heading',
    level: 'h2',
    align: 'left',
    color: '#1f2937'
  },
  paragraph: {
    text: 'This is a new paragraph block. You can edit this text in the properties panel on the right.',
    align: 'left',
    color: '#4b5563',
    fontSize: 'base'
  },
  button: {
    text: 'Click Me',
    variant: 'primary',
    size: 'md',
    fullWidth: false
  },
  image: {
    url: 'https://picsum.photos/800/400',
    alt: 'Placeholder image',
    rounded: 'md'
  },
  divider: {
    style: 'solid',
    color: '#e5e7eb',
    spacing: 'md'
  }
};

export const ELEMENT_LABELS: Record<ElementType, string> = {
  heading: 'Heading',
  paragraph: 'Text',
  button: 'Button',
  image: 'Image',
  divider: 'Divider'
};
