import type { CSSProperties } from 'vue';

const emptyStyle = {};

const baseHeaderStyles = {
  fontWeight: '500',
  paddingTop: 20,
};

export type MarkdownStylesType = {
  h1?: CSSProperties;
  h2?: CSSProperties;
  h3?: CSSProperties;
  h4?: CSSProperties;
  h5?: CSSProperties;
  h6?: CSSProperties;
  blockQuote?: CSSProperties;
  bold?: CSSProperties;
  italic?: CSSProperties;
  link?: CSSProperties;
  codeBlock?: CSSProperties;
  codeInline?: CSSProperties;
  p?: CSSProperties;
  li?: CSSProperties;
  ul?: CSSProperties;
  ol?: CSSProperties;
  image?: CSSProperties;
  br?: CSSProperties;
  hr?: CSSProperties;
  table?: CSSProperties;
  thead?: CSSProperties;
  tbody?: CSSProperties;
  tr?: CSSProperties;
  th?: CSSProperties;
  td?: CSSProperties;
  strikethrough?: CSSProperties;
};

const codeInline = {
  color: '#212529',
  fontSize: '87.5%',
  display: 'inline' as const,
  background: ' #f8f8f8',
  fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,monospace',
};

const codeBlock = {
  ...codeInline,
  display: 'block' as const,
  paddingTop: 10,
  paddingRight: 10,
  paddingLeft: 10,
  paddingBottom: 1,
  marginBottom: 20,
  background: ' #f8f8f8',
};

export const defaultMarkdownStyles: MarkdownStylesType = {
  h1: { ...baseHeaderStyles, fontSize: '2.5rem' },
  h2: { ...baseHeaderStyles, fontSize: '2rem' },
  h3: { ...baseHeaderStyles, fontSize: '1.75rem' },
  h4: { ...baseHeaderStyles, fontSize: '1.5rem' },
  h5: { ...baseHeaderStyles, fontSize: '1.25rem' },
  h6: { ...baseHeaderStyles, fontSize: '1rem' },
  blockQuote: {
    background: '#f9f9f9',
    borderLeft: '10px solid #ccc',
    margin: '1.5em 10px',
    padding: '1em 10px',
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
  },
  codeBlock: { ...codeBlock, wordWrap: 'break-word' },
  codeInline: { ...codeInline, wordWrap: 'break-word' },
  p: emptyStyle,
  li: emptyStyle,
  ul: emptyStyle,
  ol: emptyStyle,
  image: emptyStyle,
  br: emptyStyle,
  hr: emptyStyle,
  table: emptyStyle,
  thead: emptyStyle,
  tbody: emptyStyle,
  th: emptyStyle,
  td: emptyStyle,
  tr: emptyStyle,
  strikethrough: emptyStyle,
};
