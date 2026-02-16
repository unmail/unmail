// Components
export { Body } from './components/body';
export type { BodyProps } from './components/body';

export { Button } from './components/button';
export type { ButtonProps } from './components/button';

export { CodeBlock } from './components/code-block';
export type { CodeBlockProps } from './components/code-block';

export { CodeInline } from './components/code-inline';
export type { CodeInlineProps } from './components/code-inline';

// CodeBlock supporting exports
export type { PrismLanguage } from './components/languages-available';
export type { Theme as CodeBlockTheme } from './components/themes';
export * as codeBlockThemes from './components/themes';

export { Column } from './components/column';
export type { ColumnProps } from './components/column';

export { Container } from './components/container';
export type { ContainerProps } from './components/container';

export { Font } from './components/font';
export type { FontProps } from './components/font';

export { Head } from './components/head';
export type { HeadProps } from './components/head';

export { Heading } from './components/heading';
export type { HeadingAs, HeadingProps } from './components/heading';

export { Hr } from './components/hr';
export type { HrProps } from './components/hr';

export { Html } from './components/html';
export type { HtmlProps } from './components/html';

export { Img } from './components/img';
export type { ImgProps } from './components/img';

export { Link } from './components/link';
export type { LinkProps } from './components/link';

export { Markdown } from './components/markdown';
export type { MarkdownProps } from './components/markdown';

export { Preview } from './components/preview';
export type { PreviewProps } from './components/preview';

export { Row } from './components/row';
export type { RowProps } from './components/row';

export { Section } from './components/section';
export type { SectionProps } from './components/section';

export { Text } from './components/text';
export type { TextProps } from './components/text';

// Render
export { render } from './render';
export type { RenderOptions } from './render';

// Tailwind
export {
  Tailwind,
  pixelBasedPreset,
} from './tailwind';
export type {
  TailwindConfig,
  TailwindProps,
} from './tailwind';
